import * as types from "../actions/types"
import appState from "../config/intialState"
import { setData, getData } from "../utils/storage"

const cartReducer = (state = appState.cart, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        loading: true,
        error: "",
        addCart: []
      }
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        addCart: action.payload
      }
    case types.ADD_TO_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        addCart: []
      }
    case types.GET_CART:
    console.log('get cart reducer', action)
      return {
        ...state,
        loading: true,
        error: "",
        getAll: []
      }
    case types.GET_CART_SUCCESS:
    console.log('get cart success', action.payload)
      return {
        ...state,
        loading: false,
        error: "",
        getAll: action.payload
      }
    case types.GET_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        getAll: []
      }
    case types.UPDATE_CART:
      return {
        ...state,
        loading: true,
        error: "",
        updateCart: []
      }
    case types.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: true,
        error: "",
        updateCart: action.payload
      }
    case types.UPDATE_CART_FAILED:
      return {
        ...state,
        loading: true,
        error: "",
        updateCart: action.error
      }
    case types.DELETE_CART:
      return {
        ...state,
        loading: true,
        error: "",
        deleteCart: []
      }
    case types.DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: true,
        error: "",
        deleteCart: action.payload
      }
    case types.DELETE_CART_FAILED:
      return {
        ...state,
        loading: true,
        error: action.error,
        deleteCart: []
      }
    default:
      return state
  }
}

export default cartReducer
