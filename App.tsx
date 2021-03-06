import React from "react"
import { TouchableOpacity } from "react-native"
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationNavigatorProps,
  NavigationScreenProp
} from "react-navigation"
import { MenuProvider } from "react-native-popup-menu"

// Temporary name for entry point
import AppW from "./src/screens/App"

import SplashScreen from "./src/screens/SplashScreen"

// Auth screens
import Welcome from "./src/screens/auth/Welcome"
import Register from "./src/screens/auth/Register"
import Login from "./src/screens/auth/Login"
import OTPVerification from "./src/screens/auth/OTPVerification"
import ChangePassword from "./src/screens/auth/ChangePassword"
import Email from "./src/screens/auth/Email"
import CountrySelect from "./src/screens/auth/CountrySelect"

// Main tab screens
import Home from "./src/screens/main/Home"
import Orders from "./src/screens/main/Orders"
import Inbox from "./src/screens/main/Inbox"
import Account from "./src/screens/main/Account"
import Help from "./src/screens/main/Help"
import MainSearch from "./src/screens/main/MainSearch"

// Food screens
import Food from "./src/screens/food/Food"
import FoodSearch from "./src/screens/food/Search"
import RestoDetail from "./src/screens/food/RestoDetail"
import FoodDetail from "./src/screens/food/FoodDetail"

// Order screens
import OrderReview from "./src/screens/order/OrderReview"
import OrderTrack from "./src/screens/order/OrderTrack"
import SearchDriver from "./src/screens/order/SearchDriver"
import NewAddress from "./src/screens/order/NewAddress"

// Account screens
import EditProfile from "./src/screens/account/EditProfile"

// Misc screens
import PrivacyPolicy from "./src/screens/misc/PrivacyPolicy"
import Terms from "./src/screens/misc/Terms"

// Contains constant values used for the app
import metrics from "./src/config/metrics"
import { Image } from "react-native"

// Assets
const LOGO = require("./assets/logo-higres.png")
const ICON_HEART = require("./assets/ic_heart.png")
const ICON_ACCOUNT_ACTIVE = require("./assets/ic_account_active.png")
const ICON_ACCOUNT_INACTIVE = require("./assets/ic_account_inactive.png")

// Provider
import UserContextProvider from "./src/components/providers/UserContextProvider"
import InboxContextProvider from "./src/components/providers/InboxContextProvider"
import CategoryContextProvider from "./src/components/providers/CategoryContextProvider"
import SuggestionContextProvider from "./src/components/providers/SuggestionContextProvider"
import SearchContextProvider from "./src/components/providers/SearchContextProvider"
import CartContextProvider from "./src/components/providers/CartContextProvider"
import OrderContextProvider from "./src/components/providers/OrderContextProvider"

export default class App extends React.Component<any, any> {
  render() {
    return (
      <MenuProvider>
        <OrderContextProvider>
          <CartContextProvider>
            <SearchContextProvider>
              <SuggestionContextProvider>
                <CategoryContextProvider>
                  <InboxContextProvider>
                    <UserContextProvider>
                      <Navigator />
                    </UserContextProvider>
                  </InboxContextProvider>
                </CategoryContextProvider>
              </SuggestionContextProvider>
            </SearchContextProvider>
          </CartContextProvider>
        </OrderContextProvider>
      </MenuProvider>
    )
  }
}

const Main = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Orders: { screen: Orders },
    Help: { screen: Help },
    Inbox: { screen: Inbox },
    Account: {
      screen: Account,
      navigationOptions: {
        title: "Account",
        tabBarIcon: ({ focused }: { focused: boolean }) => {
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
        header: null
        // headerTitle: <Image source={LOGO} />
      }
    },
    Login: { screen: Login },
    OTP: { screen: OTPVerification },
    Welcome: { screen: Welcome },
    Register: { screen: Register },
    CountrySelect: { screen: CountrySelect },
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
      screen: ({ navigation }: NavigationNavigatorProps) => (
        <RestoDetail navigation={navigation} />
      ),
      navigationOptions: ({
        navigation
      }: {
        navigation: NavigationScreenProp<any, any>
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
    EditProfile: { screen: EditProfile },
    FoodDetail: { screen: FoodDetail },
    OrderReview: { screen: OrderReview },
    OrderTrack: { screen: OrderTrack },
    SearchDriver: { screen: SearchDriver },
    NewAddress: { screen: NewAddress },
    MainSearch: { screen: MainSearch },
    PrivacyPolicy: { screen: PrivacyPolicy },
    Terms: { screen: Terms }
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
