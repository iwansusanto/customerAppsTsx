import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import * as getRequest from "../utils/services/getRequest"
import * as deleteRequest from "../utils/services/deleteRequest"
import * as patchRequest from "../utils/services/patchRequest"
import { getCartSuccess, getCartFailed, deleteCartSuccess, deleteCartFailed, updateCartSuccess, updateCartFailed } from "../actions/cartActions";

export function* getCart(action){
    try { 
        const {data} = yield call(getRequest.getCart, action.payload);
        console.log('data cart', data)
        yield put(getCartSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(getCartFailed(error));
      }
}

export function* watchGetCart() {
    yield takeLatest(types.GET_CART, getCart);
  }

  export function* deleteCart(action){
    try { 
        const {data} = yield call(deleteRequest.deleteCart, action.payload);
        console.log('data cart', data)
        yield put(deleteCartSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(deleteCartFailed(error));
      }
}

export function* watchDeleteCart() {
    yield takeLatest(types.DELETE_CART, deleteCart);
  }

  export function* updateCart(action){
    try { 
        const {data} = yield call(patchRequest.updateCart, action.payload);
        console.log('data cart', data)
        yield put(updateCartSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(updateCartFailed(error));
      }
}

export function* watchUpdateeCart() {
    yield takeLatest(types.UPDATE_CART, updateCart);
  }