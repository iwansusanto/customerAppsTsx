import React, { Component } from "react"

import SuggestionContext from "../../contexts/SuggestionContext"
import api from "../../api"

interface State {
  suggestions: Suggestion[]
  currentId: number
}

export default class SuggestionContextProvider extends Component<{}, State> {
  state = {
    suggestions: [],
    currentId: -1
  }

  getSuggestions = async (parentId: number) => {
    if (this.state.currentId !== parentId) {
      await this.setState({ suggestions: [] })
    }

    try {
      const { data } = await api.client.post<Category[]>("/categories", {
        parent_id: parentId
      })
      console.log(data)
      this.setState({ suggestions: data, currentId: parentId })
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <SuggestionContext.Provider
        value={{
          ...this.state,
          getSuggestions: this.getSuggestions
        }}
      >
        {this.props.children}
      </SuggestionContext.Provider>
    )
  }
}
