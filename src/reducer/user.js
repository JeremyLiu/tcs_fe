import * as Action from '../action/user.js'
import { combineReducers } from 'redux'

export function roles(state=[],action){
    switch(action.type){
        case Action.SET_ALL_ROLE:
            return action.data;
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
        default:
            return state;
    }
}

export default combineReducers({
    roles,
    users
})