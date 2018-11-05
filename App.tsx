import React from "react"
import { createStackNavigator } from "react-navigation"

// Temporary name for entry point
import AppW from "./src/screens/App"

// Auth screens
import Welcome from "./src/screens/auth/Welcome"
import Register from "./src/screens/auth/Register"
import Login from "./src/screens/auth/Login"
import OTPVerification from "./src/screens/auth/OTPVerification"

// Contains constant values used for the app
import metrics from "./src/config/metrics"

export default class App extends React.Component<any, any> {
  render() {
    return <Navigator />
  }
}

// Create stack navigator with all the screens
const Navigator = createStackNavigator(
  {
    App: { screen: AppW },
    Login: { screen: Login },
    OTP: { screen: OTPVerification },
    Welcome: { screen: Welcome },
    Register: { screen: Register }
  },
  {
    // Configuration for header to use Primary Color defined in metrics
    navigationOptions: {
      headerStyle: {
        backgroundColor: metrics.PRIMARY_COLOR,
        borderBottomWidth: 0
      },
      headerTintColor: "white"
    }
  }
)
