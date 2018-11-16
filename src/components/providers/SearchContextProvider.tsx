import React, { Component } from "react"

import SearchContext from "../../contexts/SearchContext"
import api from "../../api"

interface SearchState extends SearchResponse {
  resto: SearchRestoResponse
}

export default class SearchContextProvider extends Component<{}, SearchState> {
  state = {
    success: false,
    product_found: 0,
    merchant_found: 0,
    product_data: [],
    merchant_data: [],
    resto: {} as SearchRestoResponse
  }

  search = async (query: string, categoryId: number) => {
    try {
      const { data } = await api.client.post<SearchResponse>("/search", {
        name: query,
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
    try {
      const { data } = await api.client.post<SearchRestoResponse>("/search", {
        menu_id: menuId
      })
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
          searchRestoDetail: this.searchRestoDetail
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
