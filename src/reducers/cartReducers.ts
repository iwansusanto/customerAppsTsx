import * as types from "../actions/types"
import appState from "../config/intialState"
import { setData, getData } from "../utils/storage"

const cartReducer = (state = appState.cart, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return {
        ...state,
        loading: true,
        error: "",
        cart: []
      }
    case types.ADD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        cart: action.payload
      }
    case types.ADD_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        cart: []
      }
    case types.GET_CART:
      return {
        ...state
      }
    case types.GET_CART_SUCCESS:
      return {
        ...state
      }
    case types.GET_CART_FAILED:
      return {
        ...state
      }
    case types.UPDATE_CART:
      return {
        ...state
      }
    case types.UPDATE_CART_SUCCESS:
      return {
        ...state
      }
    case types.UPDATE_CART_FAILED:
      return {
        ...state
      }
    case types.DELETE_CART:
      return {
        ...state
      }
    case types.DELETE_CART_SUCCESS:
      return {
        ...state
      }
    case types.DELETE_CART_FAILED:
      return {
        ...state
      }
    default:
      return state
  }
}

export default cartReducer
