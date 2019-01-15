import { 
    FETCH_ORDER_HISTORY,
    FETCH_ORDER_HISTORY_SUCCESS,
    FETCH_ORDER_HISTORY_FAILED, 
    FETCH_ORDER_ONGOING,
    FETCH_ORDER_ONGOING_SUCCESS,
    FETCH_ORDER_ONGOING_FAILED
} from './types'

export const fetchOrderHistory = () => ({
    type: FETCH_ORDER_HISTORY
})

export const fetchOrderHistorySuccess = (data) => ({
    type: FETCH_ORDER_HISTORY_SUCCESS,
    payload: data
})

export const fetchOrderHistoryFailed = (error) => ({
    type: FETCH_ORDER_HISTORY_FAILED,
    payload: error
})

export const fetchOrderOngoing = () => ({
    type: FETCH_ORDER_ONGOING
})

export const fetchOrderOngoingSuccess = (data) => ({
    type: FETCH_ORDER_ONGOING_SUCCESS,
    payload: data
})

export const fetchOrderOngoingFailed = (error) => ({
    type: FETCH_ORDER_ONGOING_FAILED,
    payload: error
})