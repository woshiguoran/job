export function getRedirectPath({type, avatar}) {
    //根据用户信息 返回跳转地址
    /*const path = window.location.pathname;
    let url;
    if(path=='/login'){
        url = (type==='boss')?'/boss':'/genius';
        if(!avatar){
            url+='info'
        }
    }else{
        url = '/login';
    }
    return url*/

    let url = (type==='boss')?'/boss':'/genius';
    if(!avatar){
        url+='info'
    }
    return url
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_');
}