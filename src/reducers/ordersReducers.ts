import * as types from '../actions/types'
import appState from '../config/intialState'

const ordersReducer =  (state = appState.orders, action) => {
    switch (action.type){
        case types.FETCH_ORDER_HISTORY:
            return  { 
                ...state,
                loading: true,
                error: {},
                dataHistory: []
            }
        case types.FETCH_ORDER_HISTORY_SUCCESS:
            return  { 
                ...state, 
                loading: false,
                error: {},
                dataHistory: action.payload 
            } 
        case types.FETCH_ORDER_HISTORY_FAILED:
            return  { 
                ...state, 
                loading: false,
                error: action.payload,
                dataHistory: []
            }         
        case types.FETCH_ORDER_ONGOING: 
            return  { 
                ...state, 
                loading: true,
                error: {},
                dataOnGoing: []
            }
        case types.FETCH_ORDER_ONGOING_SUCCESS: 
            return  { 
                ...state, 
                loading: false,
                error: {},
                dataOnGoing: action.payload 
            }    
        case types.FETCH_ORDER_ONGOING_FAILED: 
            return  { 
                ...state, 
                loading: false,
                error: action.payload,
                dataOnGoing: [] 
            }        
        default:
            return state;
    }
}

export default ordersReducer;