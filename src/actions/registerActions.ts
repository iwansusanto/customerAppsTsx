import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from './types'

export const register = (params) => ({
    type: REGISTER,
    payload: params
})

export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
})

export const registerFailed = (error) => ({
    type: REGISTER_FAILED,
    payload: error
})

