import { LOGIN, CHANGE_USER } from './types'

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
