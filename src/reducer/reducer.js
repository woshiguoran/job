//合并所有的reducer
import { combineReducers } from 'redux'
import { user } from "./user.redux";
import { counter} from "../redux/index.redux";
import { chatUser} from "./chatuser.redux";
import { chat } from "./chat.redux"

const reduxReducers = combineReducers({
    user,
    counter,
    chatUser,
    chat
});
export default reduxReducers;