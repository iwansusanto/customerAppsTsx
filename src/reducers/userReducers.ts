import * as types from '../actions/types'
import appState from '../config/intialState'

const userReducer =  (state = appState.user, action) => {
    switch (action.type){
        case types.CHANGE_USER:
            return  { 
                ...state, 
                users: action.payload 
            }
        case types.LOGIN: 
            return  { 
                ...state, 
                users: {}
            }
        case types.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }    
        default:
            return state;
    }
}

export default userReducer;