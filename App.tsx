import React from "react"
import { TouchableOpacity } from "react-native"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"

// Temporary name for entry point
import AppW from "./src/screens/App"

// Auth screens
import Welcome from "./src/screens/auth/Welcome"
import Register from "./src/screens/auth/Register"
import Login from "./src/screens/auth/Login"
import OTPVerification from "./src/screens/auth/OTPVerification"
import ChangePassword from "./src/screens/auth/ChangePassword"
import Email from "./src/screens/auth/Email"

// Main tab screens
import Home from "./src/screens/main/Home"
import Orders from "./src/screens/main/Orders"
import Inbox from "./src/screens/main/Inbox"
import Account from "./src/screens/main/Account"

// Food screens
import Food from "./src/screens/food/Food"
import FoodSearch from "./src/screens/food/Search"
import RestoDetail from "./src/screens/food/RestoDetail"

// Account screens
import EditProfile from "./src/screens/account/EditProfile"

// Contains constant values used for the app
import metrics from "./src/config/metrics"
import { Image } from "react-native"

// Assets
const LOGO = require("./assets/logo-higres.png")
const ICON_HEART = require("./assets/ic_heart.png")

export default class App extends React.Component<any, any> {
  render() {
    return <Navigator />
  }
}

const Main = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Orders: { screen: Orders },
    Inbox: { screen: Inbox },
    Account: { screen: Account }
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
        header: null
        // headerTitle: <Image source={LOGO} />
      }
    },
    Login: { screen: Login },
    OTP: { screen: OTPVerification },
    Welcome: { screen: Welcome },
    Register: { screen: Register },
    ChangePassword: { screen: ChangePassword },
    Email: { screen: Email },
    Food: { screen: Food },
    FoodSearch: {
      screen: FoodSearch,
      navigationOptions: {
        title: "Food",
        headerTitle: <Image source={LOGO} />,
        headerRight: (
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image source={ICON_HEART} />
          </TouchableOpacity>
        )
      }
    },
    RestoDetail: {
      screen: RestoDetail,
      navigationOptions: {
        title: "McDonalds",
        headerRight: (
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image source={ICON_HEART} />
          </TouchableOpacity>
        )
      }
    },
    EditProfile: { screen: EditProfile }
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
