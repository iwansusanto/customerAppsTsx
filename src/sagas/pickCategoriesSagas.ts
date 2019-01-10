import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import { 
    searchPickCategoriesSuccess,
    searchPickCategoriesFailed
} from "../actions/pickCategoriesActions";

export function* pickCategories(action){
    try { 
        const {data} = yield call(postRequest.searchPickCategories, action.payload);
        console.log('SUGGESTION DATA : ', data)
        yield put(searchPickCategoriesSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchPickCategoriesFailed(error));
      }
}

export function* watchPickCategories() {
    yield takeLatest(types.SEARCH_PICK_CATEGORIES, pickCategories);
  }