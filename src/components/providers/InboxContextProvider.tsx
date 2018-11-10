import React, { Component } from "react"

import InboxContext from "../../contexts/InboxContext"
import api from "../../api"

interface State {
  inboxs: Inbox[]
}

export default class InboxContextProvider extends Component<{}, State> {
  state = {
    inboxs: []
  }

  getInbox = async () => {
    try {
      const { data } = await api.client.get<InboxResponse>("/inbox")
      this.setState({ inboxs: data.inbox })

      return data.success
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <InboxContext.Provider
        value={{
          ...this.state,
          getInbox: this.getInbox
        }}
      >
        {this.props.children}
      </InboxContext.Provider>
    )
  }
}
