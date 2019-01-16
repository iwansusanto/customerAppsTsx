import { combineReducers } from "redux";

import user from "./userReducers"
import getCategories from './getCategoriesReducers'
import cart from './cartReducers'
import suggestion from './suggestionReducers'
import pickCategories from './pickCategoriesReducers'
import search from './searchReducers'
import orders from './ordersReducers' // for tab order

const allReducers = combineReducers({
    user,
    getCategories,
    cart,
    suggestion,
    pickCategories,
    search,
    orders
});

export default allReducers;