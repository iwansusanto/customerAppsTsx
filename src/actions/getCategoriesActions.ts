import { 
    CLICK_HOME_BANNER_CATEGORY,
    CLICK_HOME_BANNER_CATEGORY_SUCCESS,
    CLICK_HOME_BANNER_CATEGORY_FAILED,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED
} from './types'

export const clickBannerAction = (params, onSuccess, onError) => ({
    type: CLICK_HOME_BANNER_CATEGORY,
    payload : params,
    onSuccess,
    onError
})

export const clickBannerSuccess = (data) => ({
    type: CLICK_HOME_BANNER_CATEGORY_SUCCESS,
    payload : data
})

export const clickBannerFailed = (error) => ({
    type: CLICK_HOME_BANNER_CATEGORY_FAILED,
    payload : error
})

export const getCategories = (params, onSuccess, onError) => ({
    type: GET_CATEGORIES,
    payload : params,
    onSuccess,
    onError
})

export const getCategoriesSuccess = (data) => ({
    type: GET_CATEGORIES_SUCCESS,
    payload : data
})

export const getCategoriesFailed = (error) => ({
    type: GET_CATEGORIES_FAILED,
    payload : error
})