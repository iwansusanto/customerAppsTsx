import * as types from "../actions/types"
import appState from "../config/intialState"

const search = (state = appState.search, action) => {
  switch (action.type) {
    case types.SEARCH:
    console.log('search action', action)
      return {
        ...state,
        loading: true,
        error: "",
        search: []
      }
    case types.SEARCH_SUCCESS:
      console.log("get search", action)
      return {
        ...state,
        loading: false,
        error: "",
        search: action.payload
      }
    case types.SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        search: []
      }
      case types.SEARCH_BY_SUGGESTION:
    console.log('suggest search action', action)
      return {
        ...state,
        loading: true,
        error: "",
        searchBySuggestion: []
      }
    case types.SEARCH_BY_SUGGESTION_SUCCESS:
      console.log("get suggest search", action)
      return {
        ...state,
        loading: false,
        error: "",
        searchBySuggestion: action.payload
      }
    case types.SEARCH_BY_SUGGESTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        searchBySuggestion: []
      }
      case types.SEARCH_BY_NAME:
    console.log('search by name', action)
      return {
        ...state,
        loading: true,
        error: "",
        result: []
      }
    case types.SEARCH_BY_NAME_SUCCESS:
      console.log("get search by name", action)
      return {
        ...state,
        loading: false,
        error: "",
        result: action.payload
      }
    case types.SEARCH_BY_NAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        result: []
      }
      case types.SEARCH_RESTO_DETAIL:
    console.log('search by resto detail', action)
      return {
        ...state,
        loading: true,
        error: "",
        resto: []
      }
    case types.SEARCH_RESTO_DETAIL_SUCCESS:
      console.log("get search by resto detail", action)
      return {
        ...state,
        loading: false,
        error: "",
        resto: action.payload
      }
    case types.SEARCH_RESTO_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        resto: []
      }
    default:
      return state
  }
}

export default search
