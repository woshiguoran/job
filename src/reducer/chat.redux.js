import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');

// 建立redux方法  -->reduser.js进行合并-->chat.js使用redux
//定义action
//获取聊天记录
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RESV = 'MSG_RESV';
//标识已读
const MSG_READ = 'MSG_READ';

const inisState = {
    chatmsg: [],
    users: {},
    unread: 0
};
//reducer

// action.payload ? action.payload.filter(v => v.read).length :
export function chat(state = inisState, action) {
    switch (action.type){
        case MSG_LIST:
            return {...state, users: action.users, chatmsg: action.payload, unread: action.payload.filter(v => !v.read && v.to == action.userId).length};
        case MSG_RESV:
            const n = action.payload.to == action.userId ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n};
        // case MSG_READ:
        default:
            return state;
    }
}

function msgList(msgs, users,userId) {
    return {users, userId,type: MSG_LIST, payload: msgs}
}
function msgResv(msg, userId) {
    return {userId, type: MSG_RESV, payload: msg}
}

export function resvMsg() {
    return (dispatch, getState)=>{
        socket.on('resvMsg', function (data) {
            const userId = getState().user._id;
            dispatch(msgResv(data,userId))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch=>{
        socket.emit('sendmsg', {from, to, msg})
    };
}

export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status == 200 && res.data.code == 0){
                    const userId = getState().user._id;
                    dispatch(msgList(res.data.data, res.data.users,userId))
                }
            })
    }
}

