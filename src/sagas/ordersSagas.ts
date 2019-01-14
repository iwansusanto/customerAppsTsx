import { put, call, fork, takeLatest, takeEvery } from "redux-saga/effects"
import * as types from "../actions/types"
import { 
    fetchOrderHistorySuccess,
    fetchOrderHistoryFailed,
    fetchOrderOngoingSuccess,
    fetchOrderOngoingFailed
} from "../actions/ordersActions"
import * as getRequest from "../utils/services/getRequest"

export function* fetchOrderOnGoing(action) {
    try {
        const data = yield call(getRequest.orderOnGoing, action.params)
        yield put(fetchOrderOngoingSuccess(data.data))
    } catch (error) {
        console.log('Error fetchOrderOnGoing : ', error)
        yield put(fetchOrderOngoingFailed(error))
    }
}

export function* fetchOrderHistory(action) {
    try {
        const data = yield call(getRequest.orderHistory, action.params)
        yield put(fetchOrderHistorySuccess(data.data))
    } catch (error) {
        console.log('Error fetchOrderHistory : ', error)
        yield put(fetchOrderHistoryFailed(error))
    }
}

export function* watchFetchOrderOngoing() {
    yield takeLatest(types.FETCH_ORDER_ONGOING, fetchOrderOnGoing)
}

export function* watchFetchOrderHistory() {
    yield takeLatest(types.FETCH_ORDER_HISTORY, fetchOrderHistory)
}