import { 
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILED,
    SEARCH_BY_SUGGESTION,
    SEARCH_BY_SUGGESTION_SUCCESS,
    SEARCH_BY_SUGGESTION_FAILED
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