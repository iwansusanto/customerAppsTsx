import {
  ADD_CART,
  ADD_CART_SUCCESS,
  ADD_CART_FAILED,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILED,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILED,
  DELETE_CART,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAILED
} from "./types"

export const addCart = (params) => ({
  type: ADD_CART,
  payload: params,
})

export const addCartSuccess = data => ({
  type: ADD_CART_SUCCESS,
  payload: data
})

export const addCartFailed = error => ({
  type: ADD_CART_FAILED,
  payload: error
})

export const getCart = () => ({
    type: GET_CART,
    
  })
  
  export const getCartSuccess = data => ({
    type: GET_CART_SUCCESS,
    payload: data
  })
  
  export const getCartFailed = error => ({
    type: GET_CART_FAILED,
    payload: error
  })

  export const deleteCart = (params) => ({
    type: DELETE_CART,
    payload: params,
  })
  
  export const deleteCartSuccess = data => ({
    type: DELETE_CART_SUCCESS,
    payload: data
  })
  
  export const deleteCartFailed = error => ({
    type: DELETE_CART_FAILED,
    payload: error
  })

  export const updateCart = (params) => ({
    type: UPDATE_CART,
    payload: params,
  })
  
  export const updateCartSuccess = data => ({
    type: UPDATE_CART_SUCCESS,
    payload: data
  })
  
  export const updateCartFailed = error => ({
    type: UPDATE_CART_FAILED,
    payload: error
  })
