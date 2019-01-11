import * as types from "../actions/types"
import appState from "../config/intialState"

const search = (state = appState.search, action) => {
  switch (action.type) {
    case types.SEARCH:
    console.log('suggest action', action)
      return {
        ...state,
        loading: true,
        error: "",
        // suggestionsBanner: []
      }
    case types.SEARCH_SUCCESS:
      console.log("get suggest", action)
      return {
        ...state,
        loading: false,
        error: "",
        // suggestionsBanner: action.payload.data
      }
    case types.SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        // suggestionsBanner: []
      }
      case types.SEARCH_BY_SUGGESTION:
    console.log('suggest action', action)
      return {
        ...state,
        loading: true,
        error: "",
        // suggestionsBanner: []
      }
    case types.SEARCH_BY_SUGGESTION_SUCCESS:
      console.log("get suggest", action)
      return {
        ...state,
        loading: false,
        error: "",
        // suggestionsBanner: action.payload.data
      }
    case types.SEARCH_BY_SUGGESTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        // suggestionsBanner: []
      }
    default:
      return state
  }
}

export default search
