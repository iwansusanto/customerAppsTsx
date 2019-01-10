import { 
    GET_SUGGESTION,
    GET_SUGGESTION_SUCCESS,
    GET_SUGGESTION_FAILED
} from './types'


export const getSuggestions = (params) => ({
    type: GET_SUGGESTION,
    payload : params
})

export const getSuggestionsSuccess = (data) => ({
    type: GET_SUGGESTION_SUCCESS,
    payload : data
})

export const getSuggestionsFailed = (error) => ({
    type: GET_SUGGESTION_FAILED,
    payload : error
})