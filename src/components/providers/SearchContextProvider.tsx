import React, { Component } from "react"

import SearchContext from "../../contexts/SearchContext"
import api from "../../api"

interface SearchState extends SearchResponse {
  resto: SearchRestoResponse
  currentSearchId: number
  currentSearchType: string
  currentRestoId: number
  result: SearchResponse
}

export default class SearchContextProvider extends Component<{}, SearchState> {
  state = {
    success: false,
    product_found: 0,
    merchant_found: 0,
    product_data: [],
    merchant_data: [],
    resto: {} as SearchRestoResponse,
    result: {} as SearchResponse,
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

  search = async (categoryId: number, type: string) => {
    if (
      this.state.currentSearchId !== categoryId ||
      this.state.currentSearchType !== "type"
    ) {
      this.clear()
      this.setState({ currentSearchId: categoryId, currentSearchType: type })
    }

    try {
      const { data } = await api.client.post<SearchResponse>("/search", {
        category_id: categoryId, type
      })
      console.log('Data from pick by categories : ', ' category : '+categoryId+' type : '+type)
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
      console.log('reset resto data')
      this.setState({
        resto: {} as SearchRestoResponse,
        currentRestoId: menuId
      })
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

  searchByName = async (name: string) => {
    try {
      const { data } = await api.client.post<SearchResponse>("/search", {
        name
      })
      console.log(data)

      if (data.success) {
        this.setState({ result: data })
      } else {
        this.setState({
          result: {
            product_found: 0,
            merchant_found: 0,
            product_data: [],
            merchant_data: [],
            success: false
          }
        })
      }
      return true
    } catch (err) {
      this.setState({
        result: {
          product_found: 0,
          merchant_found: 0,
          product_data: [],
          merchant_data: [],
          success: false
        }
      })
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
          searchRestoDetail: this.searchRestoDetail,
          searchByName: this.searchByName
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
