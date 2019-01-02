import React, { Component } from "react"

import PickCategoriesContext from "../../contexts/PickCategoriesContext"
import api from "../../utils/api"

interface State {
  pickcategories: PickCategories[]
}

export default class PickCategoriesContextProvider extends Component<{}, State> {
  state = {
    pickcategories: []
  }

  searchPickCategories = async (parentId: number) => {
    
    try {
      const { data } = await api.client.post<PickCategoriesResponse>("/categories", {
        parent_id: parentId
      })
      console.log(' --searchPickCategories-- : ', data.type)
      this.setState({ pickcategories: data.type})
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <PickCategoriesContext.Provider
        value={{
          ...this.state,
          searchPickCategories: this.searchPickCategories
        }}
      >
        {this.props.children}
      </PickCategoriesContext.Provider>
    )
  }
}
