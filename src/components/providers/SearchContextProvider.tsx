import React, { Component } from "react"

import SearchContext from "../../contexts/SearchContext"
import api from "../../api"

interface SearchState extends SearchResponse {
  resto: SearchRestoResponse
  currentSearchId: number
  currentSearchType: string
  currentRestoId: number
}

export default class SearchContextProvider extends Component<{}, SearchState> {
  state = {
    success: false,
    product_found: 0,
    merchant_found: 0,
    product_data: [],
    merchant_data: [],
    resto: {} as SearchRestoResponse,
    currentSearchId: -1,
    currentSearchType: "type",
    currentRestoId: -1
  }

  clear = () => {
    this.setState({
      product_data: [],
      merchant_data: []
    })

    console.log("clear")
  }

  search = async (type: number) => {
    if (
      this.state.currentSearchId !== type ||
      this.state.currentSearchType !== "type"
    ) {
      this.clear()
      this.setState({ currentSearchId: type, currentSearchType: "type" })
    }

    try {
      const { data } = await api.client.post<SearchResponse>("/v2/searchtype", {
        type
      })
      console.log(data)
      this.setState(data)
      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  searchBySuggestion = async (categoryId: number) => {
    if (
      this.state.currentSearchId !== categoryId ||
      this.state.currentSearchType !== "food"
    ) {
      this.clear()
      this.setState({ currentSearchId: categoryId, currentSearchType: "food" })
    }

    try {
      const { data } = await api.client.post<SearchResponse>("/v2/searchfood", {
        category_id: categoryId
      })
      console.log(data)
      this.setState(data)
      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  searchRestoDetail = async (menuId: number) => {
    if (this.state.currentRestoId !== menuId) {
      this.setState({
        resto: {} as SearchRestoResponse
      })
      this.setState({ currentRestoId: menuId })
    }

    try {
      const { data } = await api.client.post<SearchRestoResponse>(
        "/v2/searchmerchant",
        {
          merchant_id: menuId
        }
      )
      console.log(data)
      this.setState({
        resto: data
      })
      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          search: this.search,
          searchBySuggestion: this.searchBySuggestion,
          searchRestoDetail: this.searchRestoDetail
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
