import { 
    FETCH_ORDER, 
    FETCH_ORDER_SUCCESS, 
    FETCH_ORDER_FAILED 
} from './types'

export const fetchOrder = (params) => ({
    type: FETCH_ORDER,
    payload: params,
})

export const fetchOrderSuccess = (data) => ({
    type: FETCH_ORDER_SUCCESS,
    payload: data,
})

export const fetchOrderFailed = (error) => ({
    type: FETCH_ORDER_FAILED,
    payload: error,
})

