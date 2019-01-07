import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import getCategories from "../utils/services"
import { 
    getCategoriesSuccess,
    getCategoriesFailed
} from "../actions/getCategoriesActions";

export function* fetchBannerHomepage(action){
    try { 
        const data = yield call(getCategories, action.params);
        yield put(getCategoriesSuccess(data.data.data));
      } catch (error) {
        yield put(getCategoriesFailed(error));
      }
}

export function* watchFetchBannerHomepage() {
    yield takeLatest(types.GET_CATEGORIES, fetchBannerHomepage);
  }