import { 
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED
} from './types'


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