import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import { 
    searchSuccess,
    searchFailed,
    searchBySuggestionSuccess,
    searchBySuggestionFailed
} from "../actions/searchActions";

export function* search(action){
    try { 
        const {data} = yield call(postRequest.search, action.payload);
        console.log('SUGGESTION DATA : ', data)
        yield put(searchSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchFailed(error));
      }
}

export function* watchSearch() {
    yield takeLatest(types.SEARCH, search);
  }

  export function* searchBySuggestion(action){
    try { 
        const {data} = yield call(postRequest.searchBySuggestion, action.payload);
        console.log('SUGGESTION DATA : ', data)
        yield put(searchBySuggestionSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchBySuggestionFailed(error));
      }
}

export function* watchSearchBySuggestion() {
    yield takeLatest(types.SEARCH, searchBySuggestion);
  }