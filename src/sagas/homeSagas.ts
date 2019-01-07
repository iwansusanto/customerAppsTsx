import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import {fetchBanner} from "../utils/services"
import { 
    fetchBannerHomepageSuccess,
    fetchBannerHomepageFailed
} from "../actions/homeActions";

export function* fetchBannerHomepage(action){
    try { 
        const data = yield call(fetchBanner, action.params);
        yield put(fetchBannerHomepageSuccess(data.data.data));
      } catch (error) {
        yield put(fetchBannerHomepageFailed(error));
      }
}

export function* watchFetchBannerHomepage() {
    yield takeLatest(types.FETCH_BANNER_HOMEPAGE, fetchBannerHomepage);
  }