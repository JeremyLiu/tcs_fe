import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response} from './response.js'
import {REFRESH_INTERVAL} from '../constant/model.js'


export const OPEN_CARD_DIALOG = 'OPEN_CARD_DIALOG';
export const CLOSE_CARD_DIALOG = 'CLOSE_CARD_DIALOG';

export const REFRESH_NET_STATE = 'REFRESH_NET_STATE';
export const REFRESH_CARD_STATE = 'REFRESH_CARD_STATE';
export const SET_CARD_STATE = 'SET_CARD_STATE';
export const REFRESH_DEVICE_STATE = 'REFRESH_DEVICE_STATE';

export const SET_BUSINESS = 'SET_BUSINESS';
export const REFRESH_BUSINESS_DATA = 'REFRESH_BUSINESS_DATA';
export const SHOW_BUSINESS_DETAIL = 'SHOW_BUSINESS_DETAIL';

export const SET_RECORD_HISTORY_DATA = 'SET_RECORD_HISTORY_DATA';
export const SET_RECORDING_DATA = 'SET_RECORDING_DATA';
export const REFRESH_RECORDING_DATA = 'REFRESH_RECORDING_DATA';
export const REMOVE_RECORD_SUCCESS = 'REMOVE_RECORD_SUCCESS';

export const SET_TIMER = 'SET_TIMER';
export const CLEAR_TIMER = 'CLEAR_TIMER';

export const PLAY_RECORD = 'PLAY_RECORD';

export function set_timer(timer){
    return {
        type: SET_TIMER,
        timer: timer
    }
}

export function clear_timer(timer){
    return {
        type: CLEAR_TIMER,
        timer: timer
    }
}

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

export function show_business_detail(visible){
    return {
        type: SHOW_BUSINESS_DETAIL,
        visible: visible
    }
}

export function play_record(id,recording = false){
    return {
        type: PLAY_RECORD,
        id: id,
        recording: recording
    }
}

export function fetch_net_state(){
    return (dispatch) => fetch(API.GET_TOPO_STATE,{
        credentials: "same-origin"
    }).then(response).then(data => {
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
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
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
    return (dispatch) => fetch(API.GET_DEVICE_STATE,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: REFRESH_DEVICE_STATE,
                    data: data.data
                })
            }
        })
}

export function fetch_business(){
    return (dispatch) => fetch(API.GET_BUSINESS,{
        credentials: "same-origin"
    }).then(response).
        then(data => {
        if(data.status == 0) {
            dispatch({
                type: SET_BUSINESS,
                data: data.data
            });
        }
    })
}

export function fetch_business_data(type){
    const url = API.GET_BUSISNESS_DATA + "?type="+type;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response).
    then(data => {
        if(data.status == 0) {
            dispatch({
                type: REFRESH_BUSINESS_DATA,
                data: data.data,
                detail: type
            });
        }
    })
}

export function search_record_data(startDate='',endDate='',search='', page=1){
    const url = API.GET_RECORD_HISTORY +
        "?startDate=" + startDate +
        "&endDate=" + endDate +
        "&search=" + search +
        "&page=" + page;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: SET_RECORD_HISTORY_DATA,
                    data: data.data
                })
            }
        })
}

export function fetch_record(){
    return (dispatch) => fetch(API.GET_RECORD_ALL,{
        credentials: "same-origin"
    }).then(response).then(data => {
            if(data.status == 0){
                dispatch({
                    type: SET_RECORDING_DATA,
                    history: data.data.history,
                    current: data.data.current
                })
            }
        })
}

export function refresh_recording_data(){
    return (dispatch) => fetch(API.GET_RECORDING,{
        credentials: "same-origin"
    }).
        then(response).then(data => {
            if(data.status == 0){
                dispatch({
                    type: REFRESH_RECORDING_DATA,
                    data: data.data
                })
            }
        })
}

export function remove_record(id){
    const url = API.REMOVE_RECORD + "?id=" + id;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0 && data.data){
                dispatch({
                    type: REMOVE_RECORD_SUCCESS,
                    id: id
                })
            }
        })
}