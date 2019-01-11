import { combineReducers } from "redux";
import user from "./userReducers";
// import register from './registerReducers'
import getCategories from './getCategoriesReducers'
import cart from './cartReducers'
import suggestion from './suggestionReducers'
import pickCategories from './pickCategoriesReducers'
import search from './searchReducers'

const allReducers = combineReducers({
    user,
    // register,
    getCategories,
    cart,
    suggestion,
    pickCategories,
    search
});

export default allReducers;