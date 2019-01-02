import React, { Component } from "react"

import CategoryContext from "../../contexts/CategoryContext"
import api from "../../utils/api"

interface State {
  categories: Category[]
}

export default class CategoryContextProvider extends Component<{}, State> {
  state = {
    categories: []
  }

  getCategories = async () => {
    try {
      const { data } = await api.client.post<CategoryResponse>("/categories")

      this.setState({ categories: data.data })
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <CategoryContext.Provider
        value={{
          ...this.state,
          getCategories: this.getCategories
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    )
  }
}
