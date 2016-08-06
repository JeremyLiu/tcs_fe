import * as Action from '../action/log.js'

const initLog = {
    page: 1,
    pageSize: 20,
    totalPage: 1,
    totalCount: 0,
    data: []
};

export function log(state = initLog, action){
    switch(action.type){
        case Action.GET_LOG:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}