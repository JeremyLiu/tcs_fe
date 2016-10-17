import * as Action from '../action/log.js'

const initLog = {
    page: 1,
    pageSize: 20,
    totalPage: 1,
    totalCount: 0,
    select: [],
    data: []
};

export function log(state = initLog, action){
    switch(action.type){
        case Action.GET_LOG:
            return Object.assign({select:[]}, state, action.data);
        case Action.SELECT_LOG:
            var select;
            if(action.select)
                select = [...state.select, action.id];
            else
                select = state.select.filter(e => e != action.id);
            return Object.assign({}, state,{
                select: select
            });
        default:
            return state;
    }
}