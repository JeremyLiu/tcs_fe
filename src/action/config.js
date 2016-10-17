import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response, set_error_text} from './response.js'
import notify from '../common/component/notification.js'

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

export const SET_LOADING = 'SET_LOADING';
export const SET_OUTLINE_CONFIG = 'SET_OUTLINE_CONFIG';
export const SET_NUMBER_ENTRY = 'SET_NUMBER_ENTRY';
export const REMOVE_OUTLINE_CONFIG = 'REMOVE_OUTLINE_CONFIG';
export const SET_CONFIG_DIALOG_VISIBLE = 'SET_CONFIG_DIALOG_VISIBLE';

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

export function close_confimr_dialog(){
    return {
        type: CLOSE_CONFIRM_DIALOG
    }
}

export function fetch_card_slot(netunit, type=-1, callback){
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

export function set_loading(visible, text=''){
    return {
        type: SET_LOADING,
        visible: visible,
        text: text
    }
}

export function set_config_dialog_visible(type, visible=false){
    return {
        type: SET_CONFIG_DIALOG_VISIBLE,
        configType: type,
        visible: visible
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

export function fetch_device(netunit=0){
    const url = API.GET_DEVICE + "?netunit=" + netunit;
    return (dispatch) => fetch(url, {
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0)
                dispatch({
                    type: SET_DEVICE,
                    netunit: netunit,
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

export function get_outline_config(type, page=1, pageSize=20, callback){
    const url = API.GET_OUTLINE_CONFIG + type +
        "?page="+page+"&pagesize="+pageSize;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0){
            data = data.data;
            dispatch({
                type: SET_OUTLINE_CONFIG,
                configType: type,
                data: data.result
            });
            if(type == 'userdata')
                dispatch(get_number_entry());
            if(callback)
                callback(data.totalCount);
        }
    })
}

export function get_device_config(type, device){
    const url = API.GET_DEVICE_CONFIG + type + "?number="+device;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: SET_OUTLINE_CONFIG,
                configType: type,
                data: data.data
            });
        }
    })
}

export function get_number_entry(){
    return (dispatch) => fetch(API.FETCH_NUMBER_ENTRY,{
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: SET_NUMBER_ENTRY,
                data: data.data
            });
        }
    })
}

export function post_add_device(netunit, name, code,netUnitName){
    var form = new FormData();
    form.append('netunit', netunit);
    form.append('name', name);
    form.append('code',code);
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
                    name: name,
                    code: code
                });
                dispatch({
                    type: CLOSE_DEVICE_DIALOG
                })
            }else
                dispatch(set_error_text(data.message));
        })
}

export function post_modify_device(id,netunit,name, code,netUnitName){
    var form = new FormData();
    form.append('id',id);
    form.append('netunit', netunit);
    form.append('name', name);
    form.append('code',code);
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
                    code: code,
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

export function post_add_device_port(number,deviceId,name, enable){
    var form = new FormData();
    form.append('number', number);
    form.append('deviceId', deviceId);
    form.append('function', name);
    form.append('enable', enable);
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
                    number: number,
                    function: name,
                    enable: enable
                }
            });
            dispatch({
                type: CLOSE_DEVICE_PORT_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function post_modify_device_port(id,deviceId,number,name,enable){
    var form = new FormData();
    form.append('id', id);
    form.append('enable', enable);
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
                enable: enable,
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

export function save_outline_config(type, data){
    const url = API.SAVE_OUTLINE_CONFIG + type;
    return (dispatch) => fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }).then(response).then(
        data => {
            if(data.status == 0){
                dispatch(get_outline_config(type));
                dispatch(set_config_dialog_visible(type, false));
                dispatch(set_error_text(''));
            }else
                dispatch(set_error_text(data.message));
        }
    )
}

export function download_config(type, netunit = 0, callback){
    let url = API.DOWNLOAD_CONFIG + type;
    if(netunit>0)
        url = url + '?netunit=' + netunit;
    return (dispatch) => fetch(url, {
        method: 'POST',
        credentials: "same-origin",
    }).then(response).then(callback);
}

export function download_device_config(type, netunit=0, device=0, callback){
    let url = API.DOWNLOAD_DEVICE_CONFIG + type;
    url = url + '?netunit=' + netunit + "&device=" + device;
    return (dispatch) => fetch(url, {
        method: 'POST',
        credentials: "same-origin"
    }).then(response).then(callback);
}

export function download_time(netunit, time, callback){
    let url = API.DOWNLOAD_CONFIG + "time?time=" + time;
    if(netunit>0)
        url = url + '&netunit=' + netunit;
    return (dispatch) => fetch(url, {
        method: 'POST',
        credentials: "same-origin",
    }).then(response).then(callback);
}

function remove_config(type, netunit=0, id=0){
    const url = API.REMOVE_OUTLINE_CONFIG + type +
        "?netunit=" + netunit + "&id=" + id;
    return (dispatch) => fetch(url, {
        method: 'DELETE',
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: REMOVE_OUTLINE_CONFIG,
                configType: type,
                id: id,
                netunit: netunit
            })
        }else
            notify("配置删除失败");
    })
}

export function get_clock_config(){
    return get_outline_config('clock');
}

export function get_meeting_config(){
    return get_outline_config('meeting');
}

export function get_tongling_config() {
    return get_outline_config('tongling');
}

export function get_digittrunk_config(){
    return get_outline_config('digittrunk');
}

export function get_user_data_config(){
    return get_outline_config('userdata');
}

export function get_broadcast(){
    return get_outline_config('broadcast');
}

export function get_phonestation() {
    return get_outline_config('phonestation');
}

export function get_terminal_business(number){
    return get_device_config('terminalbusiness', number);
}

export function get_terminal_keyconfig(number){
    return get_device_config('terminalkey', number);
}

export function save_clock(data){
    return save_outline_config('clock', data);
}

export function save_meeting(data){
    return save_outline_config('meeting', data);
}

export function save_user_data(data){
    return save_outline_config('userdata', data);
}

export function save_tongling(data){
    return save_outline_config('tongling', data);
}

export function save_digittrunk(data){
    return save_outline_config('digittrunk', data);
}

export function save_broadcast(data){
    return save_outline_config('broadcast', data);
}

export function save_phonestation(data){
    return save_outline_config('phonestation', data);
}

export function save_terminal_business(data){
    return save_outline_config('terminalbusiness', data);
}

export function save_terminal_keyconfig(data) {
    return save_outline_config('terminalkey', data);
}

export function download_card(netunit = 0){
    return download_config('card', netunit);
}

export function remove_clock_config(netunit = 0){
    return remove_config("clock", netunit);
}

export function remove_meeting_config(id = 0){
    return remove_config("meeting", 0, id);
}

export function remove_tongling_config(id = 0){
    return remove_config("tongling", 0, id);
}

export function remove_digittrunk_config(id = 0){
    return remove_config('digittrunk', 0, id);
}

export function remove_user_data(id = 0){
    return remove_config('userdata', 0, id);
}

export function remove_broadcast(id = 0){
    return remove_config('broadcast', 0, id);
}

export function remove_phonestation(id = 0) {
    return remove_config('phonestation', 0, id);
}

export function remove_terminal_business(id = 0){
    return remove_config('terminalbusiness', 0, id);
}

export function remove_terminal_keyconfig(id = 0){
    return remove_config('terminalkey', 0, id);
}