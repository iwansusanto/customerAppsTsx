import * as types from "../actions/types"
import appState from "../config/intialState"

const searchPickCategories = (state = appState.pickCategories, action) => {
  switch (action.type) {
    case types.SEARCH_PICK_CATEGORIES:
    console.log('pick action', action)
      return {
        ...state,
        loading: true,
        error: "",
        pickCategoriesBanner: []
      }
    case types.SEARCH_PICK_CATEGORIES_SUCCESS:
      console.log("get pick", action)
      return {
        ...state,
        loading: false,
        error: "",
        pickCategoriesBanner: action.payload.type
      }
    case types.SEARCH_PICK_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        pickCategoriesBanner: []
      }
    default:
      return state
  }
}

export default searchPickCategories
