import { combineReducers } from "redux";
import login from "./loginReducers";
import register from './registerReducers'

const allReducers = combineReducers({
    login,
    register
});

export default allReducers;