import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, CHANGE_USER } from './types'

export const login = (params) => ({
    type: LOGIN,
    payload: params
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    payload: error
})

export const changeUser = (data) => ({
    type: CHANGE_USER,
    payload: data
})
