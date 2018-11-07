import React from "react"
import { Image, TouchableOpacity, FlatList } from "react-native"

import { createTabNavigator } from "react-navigation"
import TopTab from "../../components/TopTab"

const LOGO = require("../../../assets/logo-higres.png")
const ICON_HEART = require("../../../assets/ic_heart.png")

import Resto from "./Resto"
import Dishes from "./Dishes"

export default createTabNavigator(
  {
    Resto: { screen: Resto },
    Dishes: { screen: Dishes }
  },
  {
    tabBarComponent: ({ navigation }) => <TopTab navigation={navigation} />,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    navigationOptions: {
      title: "Food",
      headerTitle: <Image source={LOGO} />,
      headerRight: (
        <TouchableOpacity style={{ marginRight: 20 }}>
          <Image source={ICON_HEART} />
        </TouchableOpacity>
      )
    }
  }
)
