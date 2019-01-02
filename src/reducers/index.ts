import { combineReducers } from "redux";
import login from "./loginReducers";

const allReducers = combineReducers({
    login
});

export default allReducers;