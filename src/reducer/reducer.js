//合并所有的reducer
import { combineReducers } from 'redux'
import { user } from "./user.redux";
import { counter} from "../redux/index.redux";
import { chatUser} from "../reducer/chatuser.redux";

const reduxReducers = combineReducers({
    user,
    counter,
    chatUser
});
export default reduxReducers;