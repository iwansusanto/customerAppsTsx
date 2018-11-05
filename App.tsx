import React from "react"

import AppW from "./src/screens/App"
import { createStackNavigator } from "react-navigation"
import metrics from "./src/config/metrics"
import Login from "./src/screens/auth/Login"
import OTPVerification from "./src/screens/auth/OTPVerification"
import Welcome from "./src/screens/auth/Welcome"
import Register from "./src/screens/auth/Register"

export default class App extends React.Component<any, any> {
  render() {
    return <Navigator />
  }
}

const Navigator = createStackNavigator(
  {
    App: { screen: AppW },
    Login: { screen: Login },
    OTP: { screen: OTPVerification },
    Welcome: { screen: Welcome },
    Register: { screen: Register }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: metrics.PRIMARY_COLOR,
        borderBottomWidth: 0
      },
      headerTintColor: "white"
    }
  }
)
