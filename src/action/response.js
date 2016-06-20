
export function response(res){

    if(res.status >=400){
        return {
            status: -1,
            msg: res.error()
        }
    }else
        return res.json();
}

export function paramsToStr(params, split='&'){
    let str = '';
    for(var key in params){
        str += key+'=' + params[key] + split
    }
    return str.substr(0,str.length-1)
}