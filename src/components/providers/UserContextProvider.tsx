import React, { Component } from "react"
import { AsyncStorage } from "react-native"

import UserContext from "../../contexts/UserContext"
import api from "../../api"

export default class UserContextProvider extends Component<{}, LoginResponse> {
  state = {
    success: false,
    token: '',
    message: '',
    customer: {} as User
  }

  changeUser = async (data: LoginResponse) => {
    await AsyncStorage.setItem("user", JSON.stringify(data))
    api.changeToken(data.token)
    await this.setState(data)
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await api.client.post<LoginResponse>("/login", {
        email,
        password
      })

      if (data.success) {
        this.changeUser(data)
      }
      return data.success
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  otp = async ({
    email,
    password,
    otp
  }: {
    email: string
    password: string
    otp: string
  }) => {
    try {
      const { data } = await api.client.post<LoginResponse>("/login", {
        email,
        password,
        otp
      })

      if (data.success) {
        this.changeUser(data)
      }

      return data.success
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  register = async ({
    email,
    password,
    name,
    phone
  }: {
    email: string
    password: string
    name: string
    phone: string
  }) => {
    try {
      const { data } = await api.client.post<RegisterResponse>("/register", {
        email,
        password,
        name,
        phone
      })

      return data.success
    } catch (err) {
      console.log(err.response.data)
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
          otp: this.otp,
          register: this.register
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
