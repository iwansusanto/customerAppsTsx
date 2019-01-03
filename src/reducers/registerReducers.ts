import * as types from '../actions/types'
import appState from '../config/intialState'
import { setData, getData } from '../utils/storage'
import { keys } from '../config/keys'

const registerReducer =  (state = appState.register, action) => {
    switch (action.type){
        case types.CHANGE_USER:
            let users = action.payload
            console.log('reducer register', action)
            return  { 
                ...state, 
                users }
        default:
            return state;
    }
}

export default registerReducer;