import { combineReducers } from 'redux'
import * as Action from '../action/network.js'

const initNetState ={
    connect: [],
    device: [],
    netunit: []
};

const initUIState = {
    isOpenCardDialog: false
};

const initBusiness = {
    detail: [],
    brief: [],
    visible: false,
    curDetail: 0
};

const initRecord = {
    current: [],
    history: [],
    totalPage: 1
};

function cardConfig(state = {}, action){
    return state;
}

// function uiState(state = initUIState, action){
//     switch(action.type){
//
//         case Action.OPEN_CARD_DIALOG:
//             return Object.assign({},state,{isOpenCardDialog:true});
//         case Action.CLOSE_CARD_DIALOG:
//             return Object.assign({},state,{isOpenCardDialog:false});
//         default:
//             return state;
//     }
// }


let networkReducer = combineReducers({
    cardConfig
});

export function topoState(state = initNetState, action){
    switch(action.type){
        case Action.REFRESH_NET_STATE:
            return {
                netunit: action.netunit,
                connect:action.connect,
                device: action.device
            }
    }
    return state;
}

export function deviceState(state = [], action){
    switch(action.type){
        case Action.REFRESH_DEVICE_STATE:
            return action.data;
        default:
            return state;
    }
}

export function business(state = initBusiness, action){
    switch(action.type){
        case Action.REFRESH_BUSINESS_DATA:
            return Object.assign({},state,{
                visible: true,
                detail: action.data,
                curDetail: action.detail
            });
        case Action.SET_BUSINESS:
            return Object.assign({},state,{
                visible: false,
                brief: action.data
            });
        default:
            return state;
    }
}
export function record(state = initRecord, action){
    switch(action.type){
        case Action.SET_RECORD_HISTORY_DATA:
            return Object.assign({}, state, {
                history: action.data
            });
        case Action.REFRESH_RECORDING_DATA:
            return Object.assign({}, state,{
                current: action.data
            });
        case Action.SET_RECORDING_DATA:
            return Object.assign({}, state,{
                current: action.current,
                history: action.history
            });
        default:
            return state;
    }
}

export function timer(state = 0, action){
    switch(action.type){
        case Action.SET_TIMER:
            clearInterval(state);
            return action.timer;
        case Action.CLEAR_TIMER:
            clearInterval(state);
    }
    return state;
}


export default networkReducer;

