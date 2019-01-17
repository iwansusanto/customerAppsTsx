import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import { 
    getCategoriesSuccess,
    getCategoriesFailed
} from "../actions/getCategoriesActions";

export function* getCategory(action){
    try { 
        const {data} = yield call(postRequest.getCategories);
        console.log('ABC', data)
        yield put(getCategoriesSuccess(data));
      } catch (error) {
        console.log('data error get cat', error)
        yield put(getCategoriesFailed(error));
      }
}

export function* watchGetCategory() {
    yield takeLatest(types.GET_CATEGORIES, getCategory);
  }