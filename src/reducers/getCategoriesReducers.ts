import * as types from '../actions/types'
import appState from '../config/intialState'

const getCategories = (state = appState.home, action) => {
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
                data: {}
            } 
        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                data: action.data
            }
        case types.GET_CATEGORIES_FAILED:
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

export default getCategories;