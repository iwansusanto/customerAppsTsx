import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as postRequest from "../utils/services/postRequest"
import { 
    getSuggestionsSuccess,
    getSuggestionsFailed
} from "../actions/suggestionActions";

export function* suggestion(action){
    try { 
        const {data} = yield call(postRequest.suggestion, action.payload);
        console.log('SUGGESTION DATA : ', data)
        yield put(getSuggestionsSuccess(data));
      } catch (error) {
        console.log('data error', error)
        yield put(getSuggestionsFailed(error));
      }
}

export function* watchSuggestion() {
    yield takeLatest(types.GET_SUGGESTION, suggestion);
  }