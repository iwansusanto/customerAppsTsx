import { combineReducers } from "redux";
import user from "./userReducers";
// import register from './registerReducers'
import getCategories from './getCategoriesReducers'
import cart from './cartReducers'
import suggestion from './suggestionReducers'

const allReducers = combineReducers({
    user,
    // register,
    getCategories,
    cart,
    suggestion
});

export default allReducers;