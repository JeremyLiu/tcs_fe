import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response, set_error_text} from './response.js'
import {CLOSE_CONFIRM_DIALOG} from './config.js'

export const SET_ALL_ROLE = 'SET_ALL_ROLE';
export const ADD_ROLE = 'ADD_ROLE';
export const REMOVE_ROLE_SUCCESS = 'REMOVE_ROLE_SUCCESS';
export const SET_ALL_USER = 'SET_ALL_USER';
export const ADD_USER = 'ADD_USER';
export const MODIFY_USER = 'MODIFY_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const MODIFY_ROLE_SUCCESS = 'MODIFY_ROLE_SUCCESS';
export const MODIFY_ROLE_NAME = 'MODIFY_ROLE_NAME';

export const OPEN_ADD_USER_DIALOG = 'OPEN_ADD_USER_DIALOG';
export const CLOSE_ADD_USER_DIALOG = 'CLOSE_ADD_USER_DIALOG';
export const OPEN_MODIFY_USER_DIALOG = 'OPEN_MODIFY_USER_DIALOG';
export const CLOSE_MODIFY_USER_DIALOG = 'CLOSE_MODIFY_USER_DIALOG';
export const OPEN_MODIFY_PASSWORD_DAILOG = 'OPEN_MODIFY_PASSWORD_DAILOG';
export const CLOSE_MODIFY_PASSWORD_DIALOG = 'CLOSE_MODIFY_PASSWORD_DIALOG';

export const OPEN_ROLE_DIALOG = 'OPEN_ROLE_DIALOG';
export const CLOSE_ROLE_DIALOG = 'CLOSE_ROLE_DIALOG';
export const OPEN_RENAME_DIALOG = 'OPEN_RENAME_DIALOG';
export const CLOSE_RENAME_DIALOG = 'CLOSE_RENAME_DIALOG';

export function open_add_user_dialog(data){
    if(data)
        return {
            type: OPEN_ADD_USER_DIALOG,
            action: 'modify',
            data: data
        };
    else
        return {
            type: OPEN_ADD_USER_DIALOG,
            action: 'create'
        };
}

export function open_role_dialog(){
    return {
        type: OPEN_ROLE_DIALOG
    }
}

export function open_rename_dialog(id,name){
    return {
        type: OPEN_RENAME_DIALOG,
        name: name,
        id: id
    }
}


export function get_all_role(){
    return (dispatch) => fetch(API.GET_ALL_ROLE,{
        credentials: "same-origin"
    }).then(response).then(data => {
            if(data.status == 0) {
                data = data.data;
                data.forEach(e => {
                    let array = [];
                    e.privilege.forEach( p => array.push(p.value));
                    e.privilege = array;
                });
                dispatch({
                    type: SET_ALL_ROLE,
                    data: data
                })
            }
        })
}

export function get_all_user(){
    return (dispatch) => fetch(API.GET_ALL_USER,{
        credentials: "same-origin"
    }).then(response).then(data => {
            if(data.status == 0) {
                dispatch({
                    type: SET_ALL_USER,
                    data: data.data
                })
            }
        })
}

export function post_add_user(name, password, role){
    var form = new FormData();
    form.append('username', name);
    form.append('password', password);
    form.append('role', role);
    return (dispatch) => fetch(API.ADD_USER,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: ADD_USER,
                data: data.data
            });
            dispatch({
                type: CLOSE_ADD_USER_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function post_modify_user(id,name,role,password){
    var form = new FormData();
    form.append('userId', id);
    form.append('name', name);
    form.append('role', role);
    if(password != '')
        form.append('password', password);
    return (dispatch) => fetch(API.MODIFY_USER,{
        method: 'POST',
        credentials: "same-origin",
        body: form
    }).then(response).then(data => {
        if(data.status == 0){
            dispatch({
                type: MODIFY_USER,
                id: id,
                name: name,
                role: role
            });
            dispatch({
                type: CLOSE_ADD_USER_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function post_modify_password(newPassword,oldPassword, callback){
    var form = new FormData();
    form.append('newPassword', newPassword);
    form.append('oldPassword', oldPassword);
    fetch(API.MODIFY_PASSWORD,{
        method: 'POST',
        body: form,
        credentials: "same-origin"
    }).then(response).then(data => callback(data));
}

export function post_remove_user(id){
    const url = API.REMOVE_USER + "?id=" + id;
    return (dispatch) => fetch(url,{
        method: 'DELETE',
        credentials: "same-origin"
    }).then(response).then( data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: REMOVE_USER,
                id: id
            });
            dispatch({
               type: CLOSE_CONFIRM_DIALOG
            })
        }
    })
}

export function post_add_role(name, privilege){
    var form = new FormData();
    form.append('name',name);
    form.append('privilege', privilege);
    return (dispatch) => fetch(API.ADD_ROLE,{
        method: 'POST',
        body: form,
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0){
            data = data.data;
            let array = [];
            data.privilege.forEach( p => array.push(p.value));
            data.privilege = array;
            dispatch({
                type: ADD_ROLE,
                data: data
            });
            dispatch({
                type: CLOSE_ROLE_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function modify_role_privilege(id, value){
    const url = API.MODIFY_ROLE + "?id=" + id;
    return (dispatch) => fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(value)
    }).then(response).then(data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: MODIFY_ROLE_SUCCESS,
                id: id,
                value: value
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function modify_role_name(id, name){
    const url = encodeURI(API.MODIFY_ROLE + "?id=" + id + "&name=" + name);
    return (dispatch) => fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            credentials: "same-origin"
        },
    }).then(response).then(data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: MODIFY_ROLE_NAME,
                id: id,
                name: name
            });
            dispatch({
                type: CLOSE_RENAME_DIALOG
            });
        }else
            dispatch(set_error_text(data.message));
    })
}

export function remove_role(id){
    const url = API.REMOVE_ROLE + "?id=" + id;
    return (dispatch) => fetch(url, {
        method: 'DELETE',
        credentials: "same-origin"
    }).then(response).then(data => {
        if(data.status == 0 && data.data){
            dispatch({
                type: REMOVE_ROLE_SUCCESS,
                id: id
            })
            dispatch({
                type: CLOSE_CONFIRM_DIALOG
            })
        }
    })
}