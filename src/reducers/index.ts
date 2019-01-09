import { combineReducers } from "redux";
import user from "./userReducers";
// import register from './registerReducers'
import getCategories from './getCategoriesReducers'

const allReducers = combineReducers({
    user,
    // register,
    getCategories
});

export default allReducers;