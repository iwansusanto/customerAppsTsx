import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import { 
    searchSuccess,
    searchFailed,
    searchBySuggestionSuccess,
    searchBySuggestionFailed,
    searchByNameSuccess,
    searchByNameFailed,
    searchRestoDetailSuccess,
    searchRestoDetailFailed
} from "../actions/searchActions";

export function* search(action){
    try { 
        const {data} = yield call(postRequest.search, action.payload);
        console.log('SEARCH DATA : ', data)
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
        console.log('SEARCH BY DATA : ', data)
        yield put(searchBySuggestionSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchBySuggestionFailed(error));
      }
}

export function* watchSearchBySuggestion() {
    yield takeLatest(types.SEARCH_BY_SUGGESTION, searchBySuggestion);
  }

  export function* searchByName(action){
    try { 
        const {data} = yield call(postRequest.searchByName, action.payload);
        console.log('SEARCH BY NAME : ', data)
        yield put(searchByNameSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchByNameFailed(error));
      }
}

export function* watchSearchByName() {
    yield takeLatest(types.SEARCH_BY_NAME, searchByName);
  }

  export function* searchRestoDetail(action){
    try { 
        const {data} = yield call(postRequest.searchRestoDetail, action.payload);
        console.log('SEARCH RESTO DETAIL : ', data)
        yield put(searchRestoDetailSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(searchRestoDetailFailed(error));
      }
}

export function* watchSearchRestoDetail() {
    yield takeLatest(types.SEARCH_RESTO_DETAIL, searchRestoDetail);
  }  