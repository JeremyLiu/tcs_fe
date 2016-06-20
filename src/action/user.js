import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response} from './response.js'

export const SET_ALL_ROLE = 'SET_ALL_ROLE';
export const ADD_ROLE = 'ADD_ROLE';
export const REMOVE_ROLE = 'REMOVE_ROLE';
export const MODIFY_ROLE = 'MODIFY_ROLE';
export const SET_ALL_USER = 'SET_ALL_USER';
export const ADD_USER = 'ADD_USER';
export const MODIFY_USER = 'MODIFY_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const OPEN_ADD_USER_DIALOG = 'OPEN_ADD_USER_DIALOG';
export const CLOSE_ADD_USER_DIALOG = 'CLOSE_ADD_USER_DIALOG';
export const OPEN_MODIFY_USER_DIALOG = 'OPEN_MODIFY_USER_DIALOG';
export const CLOSE_MODIFY_USER_DIALOG = 'CLOSE_MODIFY_USER_DIALOG';
export const OPEN_MODIFY_PASSWORD_DAILOG = 'OPEN_MODIFY_PASSWORD_DAILOG';
export const CLOSE_MODIFY_PASSWORD_DIALOG = 'CLOSE_MODIFY_PASSWORD_DIALOG';

export const OPEN_ROLE_DIALOG = 'OPEN_ROLE_DIALOG';
export const CLOSE_ROLE_DIALOG = 'CLOSE_ROLE_DIALOG';

export function open_add_user_dialog(){
    return {
        type: OPEN_ADD_USER_DIALOG
    }
}

export function open_role_dialog(){
    return {
        type: OPEN_ROLE_DIALOG
    }
}

export function get_all_role(){
    return (dispatch) => fetch(API.GET_ALL_ROLE).
        then(response).then(data => {
        if(data.status == 0)
            dispatch({
                type: SET_ALL_ROLE,
                data: data.data
            })
        })
}

export function get_all_user(){
    return (dispatch) => fetch(API.GET_ALL_USER).
        then(response).then(data => {
            if(data.status == 0)
                dispatch({
                    type: SET_ALL_USER,
                    data: data.data
                })
        })
}

export function post_add_user(name, password, role){
    var form = new FormData();
    form.append('username', name);
    form.append('password', password);
    form.append('role', role);
    return (dispatch) => fetch(API.ADD_USER,{
        method: 'POST',
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
        }
    })
}