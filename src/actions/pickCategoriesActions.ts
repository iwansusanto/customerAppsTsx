import { 
    SEARCH_PICK_CATEGORIES,
    SEARCH_PICK_CATEGORIES_SUCCESS,
    SEARCH_PICK_CATEGORIES_FAILED
} from './types'


export const searchPickCategories = (params) => ({
    type: SEARCH_PICK_CATEGORIES,
    payload : params
})

export const searchPickCategoriesSuccess = (data) => ({
    type: SEARCH_PICK_CATEGORIES_SUCCESS,
    payload : data
})

export const searchPickCategoriesFailed = (error) => ({
    type: SEARCH_PICK_CATEGORIES_FAILED,
    payload : error
})