import axios from "axios";

const ADD_GUN = "加机关枪";
const SUB_GUN = "减机关枪";
const USERDATA = "USERDATA";
const initGun = 100;

export function counter(state = initGun, action) {
    switch (action.type){
        case ADD_GUN:
            return state + 1;
        case SUB_GUN:
            return state - 1;
        case USERDATA:
            return action.payload.code;
        default:
            return state
    }
}

export function ADD_gun() {
    return {type: ADD_GUN}
}
export function SUB_gun() {
    return {type: SUB_GUN}
}

export function getUserData() {
    return dispatch=>{
        axios.get('/user/info')
            .then(res=>{
            if (res.status==200) {
                dispatch(userData(res.data));
            }
        });
    }
}
export function userData(data) {
    return {type: USERDATA, payload: data}
}
export function ADD_gun_timeout(){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(ADD_gun())
        },2000);
    }
}