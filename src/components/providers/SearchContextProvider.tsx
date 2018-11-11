import React, { Component } from "react"

import SearchContext from "../../contexts/SearchContext"
import api from "../../api"

export default class SearchContextProvider extends Component<
  {},
  SearchResponse
> {
  state = {
    success: false,
    product_found: 0,
    merchant_found: 0,
    product_data: [],
    merchant_data: []
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

  public render() {
    return (
      <SearchContext.Provider
        value={{
          ...this.state,
          search: this.search
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
