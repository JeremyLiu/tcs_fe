import * as Config from '../action/config.js'
import * as Network from '../action/network.js'

const init = {
    cardTypes: [],
    numberEntry: []
};

export default function constant(state=init,action){
    switch(action.type){
        case Config.SET_CARD_TYPE:
            return Object.assign({},state,{
                cardTypes:action.data
            });
        case Config.SET_NUMBER_ENTRY:
            return Object.assign({},state,{
                numberEntry:action.data
            });
        default:
            return state;
    }
}

