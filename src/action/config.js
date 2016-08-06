import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response, set_error_text} from './response.js'

//拓扑相关
export const ADD_ELEMENT = 'RECIEVE_ADD_ELEMENT';
export const MODIFY_ELEMENT = 'MODIFY_ELEMENT';
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT';
export const FETCH_ELEMENT = 'FETCH_ELEMENT';
export const SET_CONFIG = 'SET_CONFIG';
export const SET_ELEMENT_DEVICES = 'SET_ELEMENT_DEVICES';
export const ADD_CONNECT = 'ADD_CONNECT';
export const REMOVE_CONNECT = 'REMOVE_CONNECT';
export const FETCH_CARD_SLOT = 'FETCH_CARD_SLOT';

export const SET_ALL_DEVICE = 'SET_ALL_DEVICE';
export const SET_CARD_DEVICE = 'SET_CARD_DEVICE';
export const SET_CARD_CONFIG = 'SET_CARD_CONFIG';

export const OPEN_ADD_DIALOG = 'OPEN_ADD_DIALOG';
export const CLOSE_ADD_DIALOG = 'CLOSE_ADD_DIALOG';

export const OPEN_CONNECT_DIALOG = 'OPEN_CONNECT_DIALOG';
export const CLOSE_CONNECT_DIALOG = 'CLOSE_CONNECT_DIALOG';
export const SELECT_CONNECT_SRC = 'SELECT_CONNECT_SRC';
export const SELECT_CONNECT_DEST = 'SELECT_CONNECT_DEST';
export const SELECT_CONNECT_SLOT = 'SELECT_CONNECT_SLOT';
export const SELECT_CONNECT_PORT = 'SELECT_CONNECT_PORT';
export const POST_ADD_CONNECT = 'POST_ADD_CONNECT';

export const OPEN_CARD_CONFIG_DIALOG = 'OPEN_CARD_CONFIG_DIALOG';
export const CLOSE_CARD_CONFIG_DIALOG = 'CLOSE_CARD_CONFIG_DIALOG';
export const SELECT_CARD_CONFIG = 'SELECT_CARD_CONFIG';
export const FETCH_CARD_CONFIG = 'FETCH_CARD_CONFIG';
export const MODIFY_CARD_TYPE = 'MODIFY_CARD_TYPE';

export const FETCH_CARD_TYPE = 'FETCH_CARD_TYPE';
export const SET_CARD_TYPE = 'SET_CARD_TYPE';
export const POST_CONNECT = 'POST_CONNECT';

export const OPEN_CONFIRM_DIALOG = 'OPEN_CONFIRM_DIALOG';
export const CLOSE_CONFIRM_DIALOG = 'CLOSE_CONFIRM_DIALOG';

export const FETCH_DEVICE = 'FETCH_DEVICE';
export const SET_DEVICE = 'SET_DEVICE';
export const FETCH_DEVICE_PORT = 'FETCH_DEVICE_PORT';
export const SET_DEVICE_PORT = 'SET_DEVICE_PORT';
export const POST_ADD_DEVICE = 'POST_DEVICE';
export const POST_MODIFY_DEVICE = 'POST_MODIFY_DEVICE';
export const ADD_DEVICE_SUCCESS = 'ADD_DEVICE_SUCCESS';
export const MODIFY_DEVICE_SUCCESS = 'MODIFY_DEVICE_SUCCESS';
export const REMOVE_DEVICE = 'REMOVE_DEVICE';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';

export const ADD_DEVICE_PORT_SUCCESS = 'ADD_DEVICE_PORT_SUCCESS';
export const MODIFY_DEVICE_PORT_SUCCESS = 'MODIFY_DEVICE_PORT_SUCCESS';
export const REMOVE_DEVICE_PORT_SUCCESS = 'REMOVE_DEVICE_PORT_SUCCESS';
export const CLEAR_PORT_LIST = 'CLEAR_PORT_LIST';

export const OPEN_DEVICE_DIALOG = 'OPEN_DEVICE_DIALOG';
export const CLOSE_DEVICE_DIALOG = 'CLOSE_DEVICE_DIALOG';

export const OPEN_DEVICE_PORT_DIALOG = 'OPEN_DEVICE_PORT_DIALOG';
export const CLOSE_DEVICE_PORT_DIALOG = 'CLOSE_DEVICE_PORT_DIALOG';

export function open_add_dialog(action='create', data={id:0, name:'',ip:'', cardCount: 14}){
    return {
        type: OPEN_ADD_DIALOG,
        action: action,
        ip: data.ip,
        id: data.id,
        name: data.name,
        cardCount: data.cardCount
    }
}

export function open_connect_dialog(action='create',data={}){
    return {
        type: OPEN_CONNECT_DIALOG,
        action: action,
        data: data
    }
}

export function cancel_add_element(){
    return {
        type: CLOSE_ADD_DIALOG
    }
}

export function open_card_config_dialog(data){
    return {
        type: OPEN_CARD_CONFIG_DIALOG,
        netunit: data.netunit,
        card: data.card
    }
}

export function close_card_config(){
    return {
        type: CLOSE_CARD_CONFIG_DIALOG
    }
}

export function select_card_config(select) {
    return {
        type: SELECT_CARD_CONFIG,
        select: select
    }
}

export function set_card_type(id,type,name){
    return {
        type:MODIFY_CARD_TYPE,
        id: id,
        code: type,
        name: name
    }
}

export function open_confirm_dialog(title, text, confirm){
    return {
        type: OPEN_CONFIRM_DIALOG,
        title: title,
        content: text,
        callback: confirm
    }
}

export function fetch_card_slot(netunit, type, callback){
    const url = API.GET_NETUNIT_CARD_SLOT+ "?netunit="+netunit+"&type="+type;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response).then(
        data => {
            if(data.status == 0 && callback)
                callback(data.data);
        }
    )
}

export function after_select_src(netunit){
    return {
        type: SELECT_CONNECT_SRC,
        srcId: netunit
    }
}

export function after_select_dest(netunit, card){
    return {
        type: SELECT_CONNECT_DEST,
        destId: netunit,
        card: card
    }
}

export function open_device_dialog(action='create',data={}){
    return {
        type: OPEN_DEVICE_DIALOG,
        action: action,
        data: data
    };
}

export function close_device_dialog(){
    return {
        type:CLOSE_DEVICE_DIALOG
    }
}

export function open_device_port_dialog(deviceId, action='create', data={}){
    return {
        type: OPEN_DEVICE_PORT_DIALOG,
        action: action,
        deviceId: deviceId,
        data: data
    };
}

export function close_device_port_dialog(){
    return {
        type: CLOSE_DEVICE_PORT_DIALOG
    }
}

export function refresh_config(){
    return (dispatch) => fetch(API.GET_NET_CONFIG,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0)
                dispatch({
                    type:SET_CONFIG,
                    data: data.data
                })
        })
}

export function get_card_list(netunit, success){
    const url = API.GET_CARD_CONFIG + '?netUnit=' + netunit.id;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0) {
                let res = {
                    netunit: netunit,
                    card: data.data
                };
                dispatch({
                    type: SET_CARD_CONFIG,
                    data: res});
                if(success)
                    success(res);
            }
        })
}

export function get_device(card = 0){
    let actionType = card > 0? SET_CARD_DEVICE: SET_ALL_DEVICE
    const url = API.GET_DEVICE + '?card=' + card;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: actionType,
                    data: data.data
                })
            }
        })
}

export function get_all_card_type(){
    return (dispatch) => fetch(API.GET_CARD_TYPE,{
        credentials: "same-origin"
    }).then(response).
    then(data => {
        if(data.status == 0){
            let cardTypes = [];
            for(var key in data.data)
                cardTypes.push(data.data[key]);

            dispatch({
                type: SET_CARD_TYPE,
                data: cardTypes
            })
        }
    })
}

export function fetch_element(id, callback){
    const url = API.GET_NETUNIT+ "?netunit="+id;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0 && callback)
                callback(data.data);
        })
}

export function fetch_device(){
    return (dispatch) => fetch(API.GET_DEVICE,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0)
                dispatch({
                    type: SET_DEVICE,
                    data: data.data
                })
        });
}

export function fetch_device_port(deviceId){
    const url = API.GET_DEVICE_PORT + "?id=" + deviceId;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0)
                dispatch({
                    type: SET_DEVICE_PORT,
                    device: deviceId,
                    data: data.data
                })
        });
}

export function post_add_device(netunit, name, netUnitName){
    var form = new FormData();
    form.append('netunit', netunit);
    form.append('name', name);
    return (dispatch) => fetch(API.CREATE_DEVICE,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: ADD_DEVICE_SUCCESS,
                    id: data.data,
                    netunit: netunit,
                    netUnitName: netUnitName,
                    name: name
                });
                dispatch({
                    type: CLOSE_DEVICE_DIALOG
                })
            }else
                dispatch(set_error_text(data.message));
        })
}

export function post_modify_device(id,netunit,name, netUnitName){
    var form = new FormData();
    form.append('id',id);
    form.append('netunit', netunit);
    form.append('name', name);
    return (dispatch) => fetch(API.MODIFY_DEVICE,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response)
        .then(data => {
            if(data.status == 0){
                dispatch({
                    type: MODIFY_DEVICE_SUCCESS,
                    id: id,
                    netunit: netunit,
                    name: name,
                    netUnitName:netUnitName
                });
                dispatch({
                    type: CLOSE_DEVICE_DIALOG
                })
            }else
                dispatch(set_error_text(data.message));
        })
}

export function post_remove_device(id, select){
    const url = API.REMOVE_DEVICE + '?id=' + id;
    return (dispatch) => fetch(url, {
        credentials: "same-origin",
        method: 'DELETE'
    }).then(response).then(data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: REMOVE_DEVICE,
                id: id
            });
            if(id == select)
                dispatch({
                    type: CLEAR_PORT_LIST
                });
            dispatch({
                type: CLOSE_CONFIRM_DIALOG
            })
        }
    })
}

export function post_add_device_port(id,deviceId,name){
    var form = new FormData();
    form.append('id', id);
    form.append('deviceId', deviceId);
    form.append('function', name);
    return (dispatch) => fetch(API.CREATE_DEVICE_PORT,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: ADD_DEVICE_PORT_SUCCESS,
                deviceId: deviceId,
                data: {
                    id: id,
                    function: name
                }
            });
            dispatch({
                type: CLOSE_DEVICE_PORT_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function post_modify_device_port(id,deviceId,number,name){
    var form = new FormData();
    form.append('id', id);
    form.append('number', number);
    form.append('function', name);
    return (dispatch) => fetch(API.MODIFY_DEVICE_PORT, {
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: MODIFY_DEVICE_PORT_SUCCESS,
                id: id,
                number: number,
                deviceId: deviceId,
                name: name
            });
            dispatch({
                type: CLOSE_DEVICE_PORT_DIALOG
            })
        }else
            dispatch(set_error_text(data.message));
    })
}

export function post_remove_device_port(id){
    const url = API.REMOVE_DEVICE_PORT + "?id=" + id;
    return (dispatch) => fetch(url, {
        credentials: "same-origin",
        method: 'DELETE'
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: REMOVE_DEVICE_PORT_SUCCESS,
                id: id
            });
            dispatch({type: CLOSE_CONFIRM_DIALOG});
        }
    })
}

export function add_element(e, callback){
    let form = new FormData();
    form.append('name', e.name);
    form.append('ip', e.ip);
    return (dispatch) => fetch(API.ADD_ELEMENT,{
        method: 'POST',
        // headers : {
        //     'Content-Type': 'multipart/form-data'
        // },
        credentials: "same-origin",
        body: form
    })
        .then(response)
        .then(data => {
            if(data.status == 0 && callback)
                callback(data);
        })

}

export function modify_element(e){
    let form = new FormData();
    form.append('name', e.name);
    form.append('ip', e.ip);
    form.append('id', e.id);
    form.append('slot', e.cardCount);
    return (dispatch) => fetch(API.MODIFY_ELEMENT,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(data => {
        if(data.status == 0) {
            dispatch(refresh_config());
            dispatch({
                type: CLOSE_ADD_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function remove_element(id){
    const url = API.REMOVE_ELEMENT+ "?id="+id;
    return (dispatch) => fetch(url,{
        credentials: "same-origin",
        method: 'DELETE'
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch(refresh_config());
            dispatch({
                type: CLOSE_ADD_DIALOG
            });
        }
    });
}

export function post_add_connect(src,dest,slot,port){
    if(slot < 0 || port < 0 || src < 0 || dest<0)
        return;
    var form =new FormData();
    form.append('srcId', src);
    form.append('destId', dest);
    form.append('slot', slot);
    form.append('port', port);
    return (dispatch) => fetch(API.ADD_NETUNIT_CONNECT,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(
        data => {
            if(data.status == 0){
                dispatch(refresh_config());
                dispatch({
                    type: CLOSE_CONNECT_DIALOG
                });
            }else
                dispatch(set_error_text(data.message));
        }
    )
}

export function post_connect(e, callback){
    let form = new FormData();
    form.append('srcId', e.srcId);
    form.append('destId', e.destId);
    form.append('slot', e.slot);
    form.append('port', e.port);
    return (dispatch) => fetch(API.ADD_NETUNIT_CONNECT,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(
        data => callback(data)
    )
}

export function post_modify_card_type(id, type, name){
    var form = new FormData();
    form.append('id', id);
    form.append('type', type);
    return (dispatch) => fetch(API.MODIFY_CARD_CONFIG,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(
        data => {
            if(data.status == 0){
                dispatch(set_card_type(id,type,name))
            }
        }
    )
}