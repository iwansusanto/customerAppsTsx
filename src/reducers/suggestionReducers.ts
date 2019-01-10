import * as types from "../actions/types"
import appState from "../config/intialState"

const getSuggestions = (state = appState.suggestion, action) => {
  switch (action.type) {
    case types.GET_SUGGESTION:
    console.log('suggest action', action)
      return {
        ...state,
        loading: true,
        error: "",
        suggestionsBanner: []
      }
    case types.GET_SUGGESTION_SUCCESS:
      console.log("get suggest", action)
      return {
        ...state,
        loading: false,
        error: "",
        suggestionsBanner: action.payload.data
        // suggestionsBanner: []
      }
    case types.GET_SUGGESTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        suggestionsBanner: []
      }
    default:
      return state
  }
}

export default getSuggestions
