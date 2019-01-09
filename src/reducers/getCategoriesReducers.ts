import * as types from '../actions/types'
import appState from '../config/intialState'

const getCategories = (state = appState.getCategories, action) => {
    switch (action.type){
        case types.GET_CATEGORIES:
        return {
            ...state,
            loading: true,
            error: '',
            banner: []
        } 
        case types.GET_CATEGORIES_SUCCESS:
        console.log('get cat', action)
            return {
                ...state,
                loading: false,
                error: '',
                banner: action.payload.data
            }
        case types.GET_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                banner: []
            }    
        default: 
            return state;
    }
}

export default getCategories;