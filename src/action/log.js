import fetch from 'isomorphic-fetch'
import * as API from '../constant/api.js'
import {response} from './response.js'

export const GET_LOG = 'GET_LOG';

export function get_log(page, pageSize, startDate='', endDate='', searchKey=''){
    const url = API.GET_LOG + "?page=" + page +
        "&pageSize=" + pageSize +
        "&startDate=" + startDate +
        "&endDate=" + endDate +
        "&searchKey=" + searchKey;
    return (dispatch) => fetch(url,{
        credentials: "same-origin"
    }).then(response)
        .then(data => {
            if(data.status == 0) {
                data = data.data;
                data.pageSize = pageSize;
                dispatch({
                    type: GET_LOG,
                    data: data
                });
            }
        })
}

export function remove_log(ids, callback){
    const url = API.REMOVE_LOG;
    return (dispatch) => fetch(url,{
        method: 'DELETE',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(ids)
    }).then(response).then(data => callback(data))
}