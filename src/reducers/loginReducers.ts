import * as types from '../actions/types'
import appState from '../config/intialState'
import { setData, getData } from '../utils/storage'
import { keys } from '../config/keys'

const loginReducer =  (state = appState.login, action) => {
    switch (action.type){
        case types.CHANGE_USER:
            let users = action.payload
            return  { 
                ...state, 
                users }
        default:
            return state;
    }
}

export default loginReducer;