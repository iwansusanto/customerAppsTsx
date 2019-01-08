import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import getCategories from "../utils/services/getCategories"
import { 
    getCategoriesSuccess,
    getCategoriesFailed
} from "../actions/getCategoriesActions";

export function* getCategory(action){
    try { 
        const data = yield call(getCategories, action.payload);
        // yield put(getCategoriesSuccess(data.data));
        console.log('coba coba aja', data)
      } catch (error) {
        console.log('data error', error)
        yield put(getCategoriesFailed(error));
      }
}

export function* watchGetCategory() {
    yield takeLatest(types.GET_CATEGORIES, getCategory);
  }