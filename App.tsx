import React from "react"
import { TouchableOpacity, AsyncStorage, Text } from "react-native"
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationNavigatorProps,
  NavigationScreenProp
} from "react-navigation"
import { MenuProvider } from "react-native-popup-menu"
import strings from "./src/components/language"

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
import Language from "./src/screens/misc/Language"

// Contains constant values used for the app
import metrics from "./src/config/metrics"
import { Image } from "react-native"

// Assets
const LOGO = require("./assets/logo-higres.png")
const ICON_HEART = require("./assets/ic_heart.png")
const ICON_ACCOUNT_ACTIVE = require("./assets/ic_account_active.png")
const ICON_ACCOUNT_INACTIVE = require("./assets/ic_account_inactive.png")
const ICON_MAIL_ACTIVE = require("./assets/ic_mail_active.png")
const ICON_MAIL_INACTIVE = require("./assets/ic_mail_inactive.png")
const ICON_HELP_ACTIVE = require("./assets/ic_help_active.png")
const ICON_HELP_INACTIVE = require("./assets/ic_help_inactive.png")
const ICON_ORDER_ACTIVE = require("./assets/ic_order_active.png")
const ICON_ORDER_INACTIVE = require("./assets/ic_order_inactive.png")
const ICON_HOME_ACTIVE = require("./assets/ic_home_active.png")
const ICON_HOME_INACTIVE = require("./assets/ic_home_inactive.png")

// Provider
import UserContextProvider from "./src/components/providers/UserContextProvider"
import InboxContextProvider from "./src/components/providers/InboxContextProvider"
import CategoryContextProvider from "./src/components/providers/CategoryContextProvider"
import SuggestionContextProvider from "./src/components/providers/SuggestionContextProvider"
import PickCategoriesContextProvider from "./src/components/providers/PickCategoriesContextProvider"
import SearchContextProvider from "./src/components/providers/SearchContextProvider"
import CartContextProvider from "./src/components/providers/CartContextProvider"
import OrderContextProvider from "./src/components/providers/OrderContextProvider"

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  _onSetLanguage = async () => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    return language
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }
  render() {
    return (
      <MenuProvider>
        <OrderContextProvider>
          <CartContextProvider>
            <SearchContextProvider>
              <PickCategoriesContextProvider>
                <SuggestionContextProvider>
                  <CategoryContextProvider>
                    <InboxContextProvider>
                      <UserContextProvider>
                        <Navigator />
                      </UserContextProvider>
                    </InboxContextProvider>
                  </CategoryContextProvider>
                </SuggestionContextProvider>
              </PickCategoriesContextProvider>
            </SearchContextProvider>
          </CartContextProvider>
        </OrderContextProvider>
      </MenuProvider>
    )
  }
}

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
          tabBarLabel: state.params.home === null? strings.homeTab : state.params.home,
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
          tabBarLabel: state.params.order === null ? strings.ordersTab : state.params.order,
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
          tabBarLabel: state.params.help === null ? strings.helpTab : state.params.help,
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
          tabBarLabel: state.params.inbox === null ? strings.inboxTab : state.params.inbox,
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
          tabBarLabel: state.params.account === null ? strings.accountTab : state.params.account,
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
