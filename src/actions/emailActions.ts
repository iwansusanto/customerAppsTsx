import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from './types'

export const forgotPassword = (params) => ({
    type: FORGOT_PASSWORD,
    payload: params
})

export const forgotPasswordSuccess = (data) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data
})

export const forgotPasswordFailed = (error) => ({
    type: FORGOT_PASSWORD_FAILED,
    payload: error
})

