import React, { Component } from "react"
import { AsyncStorage } from "react-native"

import UserContext from "../../contexts/UserContext"
import api from "../../api"

interface State {
  user?: User
}

export default class UserContextProvider extends Component<{}, State> {
  state = {
    user: {} as User
  }

  changeUser = async (user: User) => {
    await AsyncStorage.setItem("user", JSON.stringify(user))
    await this.setState({ user })
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await api.post<LoginResponse>("/login", {
        email,
        password
      })

      return data.success
    } catch (err) {
      console.error(err.response.data)
      return false
    }
  }

  otp = async ({ email, password, otp }: { email: string; password: string, otp: string }) => {
    try {
      const { data } = await api.post<LoginResponse>("/login", {
        email,
        password,
        otp
      })

      if (data.success) {
        this.changeUser(data.customer)
      }

      return data.success
    } catch (err) {
      console.error(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          changeUser: this.changeUser,
          login: this.login,
          otp: this.otp
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
