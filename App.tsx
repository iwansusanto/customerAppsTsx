import React from "react"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Temporary name for entry point
import AppW from "./src/screens/App"

// Auth screens
import Welcome from "./src/screens/auth/Welcome"
import Register from "./src/screens/auth/Register"
import Login from "./src/screens/auth/Login"
import OTPVerification from "./src/screens/auth/OTPVerification"
import ChangePassword from "./src/screens/auth/ChangePassword"

// Main tab screens
import Home from "./src/screens/main/Home"

// Food screens
import Food from "./src/screens/food/Food"

// Contains constant values used for the app
import metrics from "./src/config/metrics"
import { Image } from "react-native"

// Assets
const LOGO = require("./assets/logo-higres.png")

export default class App extends React.Component<any, any> {
  render() {
    return <Navigator />
  }
}

const Main = createBottomTabNavigator(
  {
    Home: { screen: Home }
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#999999",
      showIcon: true,
      style: {
        backgroundColor: metrics.PRIMARY_COLOR
      }
    }
  }
)

// Create stack navigator with all the screens
const Navigator = createStackNavigator(
  {
    Home: {
      screen: Main,
      navigationOptions: {
        headerTitle: <Image source={LOGO} />
      }
    },
    Login: { screen: Login },
    OTP: { screen: OTPVerification },
    Welcome: { screen: Welcome },
    Register: { screen: Register },
    ChangePassword: { screen: ChangePassword },
    Food: { screen: Food }
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
