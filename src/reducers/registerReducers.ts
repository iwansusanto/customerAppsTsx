import * as types from '../actions/types'
import appState from '../config/intialState'
import { setData, getData } from '../utils/storage'
import { keys } from '../config/keys'

const registerReducer =  (state = appState.register, action) => {
    console.log('reducer register', action)
    switch (action.type){
        case types.REGISTER_SUCCESS:
            let users = action.payload
            return  { 
                ...state, 
                users }
        default:
            return state;
    }
}

export default registerReducer;