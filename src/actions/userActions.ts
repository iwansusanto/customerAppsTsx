import { 
    LOGIN, 
    CHANGE_USER,
    CHANGE_LANGUAGE,
    REGISTER,
    OTP
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

export const register = (params, onSuccess, onFailed) => ({
    type: REGISTER,
    payload: params,
    onSuccess,
    onFailed
})

export const otp = (params, onSuccess, onFailed) => ({
    type: OTP,
    payload: params,
    onSuccess,
    onFailed
})