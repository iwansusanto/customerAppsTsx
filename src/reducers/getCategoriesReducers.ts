import * as types from '../actions/types'
import appState from '../config/intialState'

const getCategories = (state = appState.home, action) => {
    console.log('get cat', action)
    switch (action.type){
        case types.CLICK_HOME_BANNER_CATEGORY:
            return { 
                ...state, 
                ...{homeBannerId: action.data}
            }
        case types.GET_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: '',
                payload: {}
            } 
        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                payload: action.data
            }
        case types.GET_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                payload: {}
            }    
        default: 
            return state;
    }
}

export default getCategories;