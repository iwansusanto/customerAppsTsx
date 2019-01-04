import * as types from '../actions/types'
import appState from '../config/intialState'

const homeReducers = (state = appState.home, action) => {
    switch (action.type){
        case types.CLICK_HOME_BANNER_CATEGORY:
            return { 
                ...state, 
                ...{homeBannerId: action.data}
            }
        case types.FETCH_BANNER_HOMEPAGE:
            return {
                ...state,
                loading: true,
                error: '',
                data: {}
            } 
        case types.FETCH_BANNER_HOMEPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                data: action.data
            }
        case types.FETCH_BANNER_HOMEPAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: {}
            }    
        default: 
            return state;
    }
}

export default homeReducers;