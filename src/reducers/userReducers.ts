import * as types from '../actions/types'
import appState from '../config/intialState'
import { setData, getData } from '../utils/storage'
import { keys } from '../config/keys'

const userReducer =  (state = appState.login, action) => {
    switch (action.type){
        case types.CHANGE_USER:
            let users = action.payload
            console.log('reducer login', action)
            return  { 
                ...state, 
                users }
        default:
            return state;
    }
}

export default userReducer;