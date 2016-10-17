
export const SET_ERROR_TEXT = 'SET_ERROR_TEXT';

export function response(res){

    let ret = {
        status: -1,
        message: "系统错误"
    };

    if(res.status < 400)
        ret = res.json();
    return ret;
}

export function paramsToStr(params, split='&'){
    let str = '';
    for(var key in params){
        str += key+'=' + params[key] + split
    }
    return str.substr(0,str.length-1)
}

export function set_error_text(text){
    return {
        type: SET_ERROR_TEXT,
        text: text
    }
}