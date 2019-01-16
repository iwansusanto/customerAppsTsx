import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import * as getRequest from "../utils/services/getRequest"
import { getCartSuccess, getCartFailed } from "../actions/cartActions";

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