import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response} from './response.js'


export const OPEN_CARD_DIALOG = 'OPEN_CARD_DIALOG';
export const CLOSE_CARD_DIALOG = 'CLOSE_CARD_DIALOG';

export const REFRESH_NET_STATE = 'REFRESH_NET_STATE';
export const REFRESH_CARD_STATE = 'REFRESH_CARD_STATE';
export const SET_CARD_STATE = 'SET_CARD_STATE';
export const REFRESH_DEVICE_STATE = 'REFRESH_DEVICE_STATE';

export function open_card_dialog(data){
    return {
        type: OPEN_CARD_DIALOG,
        card: data.card,
        netunit: data.netunit
    }
}

export function close_card_dialog() {
    return {
        type: CLOSE_CARD_DIALOG
    }
}

export function fetch_net_state(){
    return (dispatch) => fetch(API.GET_TOPO_STATE).
        then(response).then(data => {
        if(data.status == 0) {
            data = data.data;
            dispatch({
                type: REFRESH_NET_STATE,
                connect: data.connect,
                device: data.device,
                netunit: data.netunit
            })
        }
    })
}

export function fetch_card_state(netunit){
    const url = API.GET_TOPO_STATE + "?netunit="+netunit;
    return (dispatch) => fetch(url).then(response)
        .then(data => {
            if(data.status == 0){
                data = data.data;
                dispatch({
                    type: SET_CARD_STATE,
                    netunit: data.state,
                    card:data.cardStates
                })
            }
        })
}

export function fetch_device_state(){
    return (dispatch) => fetch(API.GET_DEVICE_STATE).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: REFRESH_DEVICE_STATE,
                    data: data.data
                })
            }
        })
}
