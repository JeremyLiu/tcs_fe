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

export default networkReducer;

