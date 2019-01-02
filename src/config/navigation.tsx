import React from "react"
import { TouchableOpacity, Image } from "react-native"
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationNavigatorProps,
  NavigationScreenProp
} from "react-navigation"
import { MenuProvider } from "react-native-popup-menu"
import strings from "../components/language"

import SplashScreen from "../screens/SplashScreen"

// Auth screens
import Welcome from "../screens/auth/Welcome"
import Register from "../screens/auth/Register"
import Login from "../screens/auth/Login"
import OTPVerification from "../screens/auth/OTPVerification"
import ChangePassword from "../screens/auth/ChangePassword"
import Email from "../screens/auth/Email"
import CountrySelect from "../screens/auth/CountrySelect"

// Main tab screens
import Home from "../screens/main/Home"
import Orders from "../screens/main/Orders"
import Inbox from "../screens/main/Inbox"
import Account from "../screens/main/Account"
import Help from "../screens/main/Help"
import MainSearch from "../screens/main/MainSearch"

// Food screens
import Food from "../screens/food/Food"
import FoodSearch from "../screens/food/Search"
import RestoDetail from "../screens/food/RestoDetail"
import FoodDetail from "../screens/food/FoodDetail"

// Order screens
import OrderReview from "../screens/order/OrderReview"
import OrderTrack from "../screens/order/OrderTrack"
import SearchDriver from "../screens/order/SearchDriver"
import NewAddress from "../screens/order/NewAddress"

// Account screens
import EditProfile from "../screens/account/EditProfile"

// Misc screens
import PrivacyPolicy from "../screens/misc/PrivacyPolicy"
import Terms from "../screens/misc/Terms"
import Language from "../screens/misc/Language"

// Contains constant values used for the app
import metrics from "./metrics"

// Assets
const LOGO = require("../../assets/logo-higres.png")
const ICON_HEART = require("../../assets/ic_heart.png")
const ICON_ACCOUNT_ACTIVE = require("../../assets/ic_account_active.png")
const ICON_ACCOUNT_INACTIVE = require("../../assets/ic_account_inactive.png")
const ICON_MAIL_ACTIVE = require("../../assets/ic_mail_active.png")
const ICON_MAIL_INACTIVE = require("../../assets/ic_mail_inactive.png")
const ICON_HELP_ACTIVE = require("../../assets/ic_help_active.png")
const ICON_HELP_INACTIVE = require("../../assets/ic_help_inactive.png")
const ICON_ORDER_ACTIVE = require("../../assets/ic_order_active.png")
const ICON_ORDER_INACTIVE = require("../../assets/ic_order_inactive.png")
const ICON_HOME_ACTIVE = require("../../assets/ic_home_active.png")
const ICON_HOME_INACTIVE = require("../../assets/ic_home_inactive.png")

const Main = createBottomTabNavigator(
  {
    Home: { screen: Home,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
      }) => {
        const { state } = navigation
        return {
          tabBarLabel: state.params.home,
          tabBarIcon: ({ focused }) => {
            switch (focused) {
              case true:
                return (
                  <Image
                    source={ICON_HOME_ACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
              case false:
                return (
                  <Image
                    source={ICON_HOME_INACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
            }
          }
        }
      }
    },
    Orders: { screen: Orders,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
      }) => {
        const { state } = navigation
        return {
          tabBarLabel: state.params.order,
          tabBarIcon: ({ focused }) => {
            switch (focused) {
              case true:
                return (
                  <Image
                    source={ICON_ORDER_ACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
              case false:
                return (
                  <Image
                    source={ICON_ORDER_INACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
            }
          }
        }
      }
    
    },
    Help: {
      screen: Help,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
      }) => {
        const { state } = navigation
        return {
          tabBarLabel: state.params.help,
          tabBarIcon: ({ focused }) => {
            switch (focused) {
              case true:
                return (
                  <Image
                    source={ICON_HELP_ACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
              case false:
                return (
                  <Image
                    source={ICON_HELP_INACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
            }
          }
        }
      }
    },
    Inbox: {
      screen: Inbox,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
      }) => {
        const { state } = navigation
        return {
          tabBarLabel: state.params.inbox,
          tabBarIcon: ({ focused }) => {
            switch (focused) {
              case true:
                return (
                  <Image
                    source={ICON_MAIL_ACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
              case false:
                return (
                  <Image
                    source={ICON_MAIL_INACTIVE}
                    resizeMode={"contain"}
                    style={metrics.TAB_BAR_ICON_STYLE}
                  />
                )
            }
          }
        }
      }
    },
    Account: {
      screen: Account,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
      }) => {
        const { state } = navigation
        return {
          tabBarLabel: state.params.account,
          tabBarIcon: ({ focused }) => {
            switch (focused) {
              case true:
                return (
                  <Image
                    source={ICON_ACCOUNT_ACTIVE}
                    style={metrics.TAB_BAR_ICON_STYLE}
                    resizeMode={"contain"}
                  />
                )
              case false:
                return (
                  <Image
                    source={ICON_ACCOUNT_INACTIVE}
                    style={metrics.TAB_BAR_ICON_STYLE}
                    resizeMode={"contain"}
                  />
                )
            }
          }
        }
      }
    }
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
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: Main,
      navigationOptions: {
        header: null,
        gesturesEnabled: false

        // headerTitle: <Image source={LOGO} />
      }
    },
    Login: { screen: Login, navigationOptions: { gesturesEnabled: false } },
    OTP: {
      screen: OTPVerification,
      navigationOptions: { gesturesEnabled: false }
    },
    Welcome: { screen: Welcome, navigationOptions: { gesturesEnabled: false } },
    Register: {
      screen: Register,
      navigationOptions: { gesturesEnabled: false }
    },
    CountrySelect: {
      screen: CountrySelect,
      navigationOptions: { gesturesEnabled: false }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: { gesturesEnabled: false }
    },
    Email: { screen: Email, navigationOptions: { gesturesEnabled: false } },
    Food: { screen: Food, navigationOptions: { gesturesEnabled: false } },
    FoodSearch: {
      screen: FoodSearch,
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
        gesturesEnabled: false
      }) => {
        const { state } = navigation
        return {
          title: `${state.params.header || ""}`,
          headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Image source={ICON_HEART} />
            </TouchableOpacity>
          )
        }
      }
    },
    RestoDetail: {
      screen: ({ navigation }: NavigationNavigatorProps) => (
        <RestoDetail navigation={navigation} />
      ),
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
        gesturesEnabled: false
      }) => {
        const { state } = navigation
        return {
          title: `${state.params.title || ""}`,
          headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Image source={ICON_HEART} />
            </TouchableOpacity>
          )
        }
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: { gesturesEnabled: false }
    },
    FoodDetail: {
      screen: FoodDetail,
      navigationOptions: { gesturesEnabled: false }
    },
    OrderReview: {
      screen: OrderReview,
      navigationOptions: { gesturesEnabled: false }
    },
    OrderTrack: {
      screen: OrderTrack,
      navigationOptions: { gesturesEnabled: false }
    },
    SearchDriver: {
      screen: SearchDriver,
      navigationOptions: { gesturesEnabled: false }
    },
    NewAddress: {
      screen: NewAddress,
      navigationOptions: { gesturesEnabled: false }
    },
    MainSearch: {
      screen: MainSearch,
      navigationOptions: { gesturesEnabled: false }
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: { gesturesEnabled: false }
    },
    Terms: { screen: Terms, navigationOptions: { gesturesEnabled: false } },
    Language: {
      screen: Language,
      navigationOptions: { gesturesEnabled: false }
    }
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


export default Navigator