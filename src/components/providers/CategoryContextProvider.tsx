import React, { Component } from "react"

import CategoryContext from "../../contexts/CategoryContext"
import api from "../../api"

interface State {
  categories: Category[]
}

export default class CategoryContextProvider extends Component<{}, State> {
  state = {
    categories: []
  }

  getCategories = async () => {
    try {
      const { data } = await api.client.post<Category[]>("/categories")
      console.log(data);
      this.setState({ categories: data })
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
