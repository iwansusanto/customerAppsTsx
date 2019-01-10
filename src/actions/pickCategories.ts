import { 
    PICK_CATEGORIES,
    PICK_CATEGORIES_SUCCESS,
    PICK_CATEGORIES_FAILED
} from './types'


export const pickCategories = (params) => ({
    type: PICK_CATEGORIES,
    payload : params
})

export const pickCategoriesSuccess = (data) => ({
    type: PICK_CATEGORIES_SUCCESS,
    payload : data
})

export const pickCategoriesFailed = (error) => ({
    type: PICK_CATEGORIES_FAILED,
    payload : error
})