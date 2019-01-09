import { combineReducers } from "redux";
import user from "./userReducers";
// import register from './registerReducers'
import getCategories from './getCategoriesReducers'
import cart from './cartReducers'

const allReducers = combineReducers({
    user,
    // register,
    getCategories,
    cart
});

export default allReducers;