import * as types from '../actions/types'
import appState from '../config/intialState'

const getCategories = (state = appState.forgotPassword, action) => {
    switch (action.type){
        case types.FORGOT_PASSWORD:
            return { 
                ...state, 
                ...{homeBannerId: action.data}
            }
        case types.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: true,
                error: '',
                payload: {}
            } 
        case types.FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: '',
                payload: action.data
            }
        default: 
            return state;
    }
}

export default getCategories;