import axios from 'axios'
import { getRedirectPath } from "../util";

const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOG_OUT = 'LOG_OUT';

//reducers
const initState = {
    redirectTO: '',
    msg: '',
    user: '',
    pwd: '',
    type: 'genius',
};

export function user(state = initState, action) {
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTO:getRedirectPath(action.payload), ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOG_OUT:
            return {...initState, redirectTO: '/login'};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}


function authSuccess(obj) {
    const {pwd,...data} = obj;
    return {type: AUTH_SUCCESS, payload: data}
}
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo}
}
export function logout() {
    return {type: LOG_OUT}
}

export function update(data) { //注意看是对象还是数据 {data} data
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status == 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function login({user, pwd}) {
    if(!user || !pwd ){
        return errorMsg('请输入用户名密码！')
    }
    return dispatch=>{
        axios.post('/user/login',{user, pwd})
            .then(res=>{
                if(res.status == 200 && res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user, pwd, pwdRe, type}) {
    if(!user || !pwd || !type){
        return errorMsg('请输入用户名密码！')
    }
    if(pwd != pwdRe){
        return errorMsg('两次密码输入不一致！')
    }

    return dispatch=>{
        axios.post('/user/register',{user, pwd, type})
            .then(res=>{
                if(res.status == 200 && res.data.code === 0){
                    dispatch(authSuccess(user, pwd, type))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}


