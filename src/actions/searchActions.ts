import { 
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILED,
    SEARCH_BY_SUGGESTION,
    SEARCH_BY_SUGGESTION_SUCCESS,
    SEARCH_BY_SUGGESTION_FAILED,
    SEARCH_BY_NAME,
    SEARCH_BY_NAME_SUCCESS,
    SEARCH_BY_NAME_FAILED,
    SEARCH_RESTO_DETAIL,
    SEARCH_RESTO_DETAIL_SUCCESS,
    SEARCH_RESTO_DETAIL_FAILED
} from './types'


export const search = (params) => ({
    type: SEARCH,
    payload : params
})

export const searchSuccess = (data) => ({
    type: SEARCH_SUCCESS,
    payload : data
})

export const searchFailed = (error) => ({
    type: SEARCH_FAILED,
    payload : error
})

export const searchBySuggestion = (params) => ({
    type: SEARCH_BY_SUGGESTION,
    payload : params
})

export const searchBySuggestionSuccess = (data) => ({
    type: SEARCH_BY_SUGGESTION_SUCCESS,
    payload : data
})

export const searchBySuggestionFailed = (error) => ({
    type: SEARCH_BY_SUGGESTION_FAILED,
    payload : error
})

export const searchByName = (params) => ({
    type: SEARCH_BY_NAME,
    payload : params
})

export const searchByNameSuccess = (data) => ({
    type: SEARCH_BY_NAME_SUCCESS,
    payload : data
})

export const searchByNameFailed = (error) => ({
    type: SEARCH_BY_NAME_FAILED,
    payload : error
})


export const searchRestoDetail = (params) => ({
    type: SEARCH_RESTO_DETAIL,
    payload : params
})

export const searchRestoDetailSuccess = (data) => ({
    type: SEARCH_RESTO_DETAIL_SUCCESS,
    payload : data
})

export const searchRestoDetailFailed = (error) => ({
    type: SEARCH_RESTO_DETAIL_FAILED,
    payload : error
})