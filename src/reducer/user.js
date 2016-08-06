import * as Action from '../action/user.js'
import { combineReducers } from 'redux'

export function roles(state=[],action){
    switch(action.type){
        case Action.SET_ALL_ROLE:
            return action.data;
        case Action.MODIFY_ROLE_SUCCESS:
            return state.map(e => {
                if(e.id == action.id)
                   return Object.assign({},e,{
                       privilege: action.value
                   });
                else
                   return e;
            });
        case Action.MODIFY_ROLE_NAME:
            return state.map(e => {
                if(e.id == action.id)
                   return Object.assign({}, e, {
                       name: action.name
                   });
                else
                   return e;
            });
        case Action.REMOVE_ROLE_SUCCESS:
            return state.filter(e => e.id != action.id)
        case Action.ADD_ROLE:
            return [
                ...state,
                action.data
            ];
        default:
            return state;
    }
}

export function users(state=[],action){
    switch(action.type){
        case Action.SET_ALL_USER:
            return action.data;
        case Action.ADD_USER:
            return [
                ...state,
                action.data
            ];
        case Action.REMOVE_USER:
            return state.filter(e => e.id != action.id);
        case Action.MODIFY_USER:
            return state.map(e => {
                if(e.id == action.id)
                    return Object.assign({}, e, {
                        name: action.name,
                        roleId: action.role
                    });
                else
                    return e;
            });
        default:
            return state;
    }
}

export default combineReducers({
    roles,
    users
})