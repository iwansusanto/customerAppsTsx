import { 
    LOGIN, 
    CHANGE_USER,
    CHANGE_LANGUAGE
} from './types'

export const login = (params, onSuccess, onFailed) => ({
    type: LOGIN,
    payload: params,
    onSuccess,
    onFailed
})

export const changeUser = (data) => ({
    type: CHANGE_USER,
    payload: data
})

export const changeLanguage = (params) => ({
    type: CHANGE_LANGUAGE,
    payload: params
})