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

  getSuggestions = async (suggestId: number) => {
    if (this.state.currentId !== suggestId) {
      await this.setState({ suggestions: [] })
    }

    try {
      const { data } = await api.client.post<CategoryResponse>("/categories", {
        parent_id: suggestId
      })
      console.log(suggestId, data)
      this.setState({ suggestions: data.data, currentId: suggestId })
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
