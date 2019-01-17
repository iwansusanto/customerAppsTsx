import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILED,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILED,
  DELETE_CART,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAILED,
  ADD_TO_CART,
  ADD_TO_CART_FAILED,
  ADD_TO_CART_SUCCESS
} from "./types"

export const addToCart = params => ({
  type: ADD_TO_CART,
  payload: params
})

export const addToCartSuccess = data => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data
})

export const addToCartFailed = error => ({
  type: ADD_TO_CART_FAILED,
  payload: error
})

export const getCart = params => ({
  type: GET_CART,
  payload: params
})

export const getCartSuccess = data => ({
  type: GET_CART_SUCCESS,
  payload: data
})

export const getCartFailed = error => ({
  type: GET_CART_FAILED,
  payload: error
})

export const deleteCart = params => ({
  type: DELETE_CART,
  payload: params
})

export const deleteCartSuccess = data => ({
  type: DELETE_CART_SUCCESS,
  payload: data
})

export const deleteCartFailed = error => ({
  type: DELETE_CART_FAILED,
  payload: error
})

export const updateCart = params => ({
  type: UPDATE_CART,
  payload: params
})

export const updateCartSuccess = data => ({
  type: UPDATE_CART_SUCCESS,
  payload: data
})

export const updateCartFailed = error => ({
  type: UPDATE_CART_FAILED,
  payload: error
})
