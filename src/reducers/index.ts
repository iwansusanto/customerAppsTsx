import { combineReducers } from "redux";
import user from "./userReducers";
import register from './registerReducers'

const allReducers = combineReducers({
    user,
    register
});

export default allReducers;