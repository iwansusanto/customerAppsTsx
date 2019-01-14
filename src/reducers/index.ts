import { combineReducers } from "redux"

import user from "./userReducers"
import register from './registerReducers'
import orders from './ordersReducers' // for tab order

const allReducers = combineReducers({
    user,
    register,
    orders
});

export default allReducers;