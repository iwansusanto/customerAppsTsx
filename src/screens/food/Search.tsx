import React from "react"

import { createTabNavigator } from "react-navigation"
import TopTab from "../../components/TopTab"

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
    animationEnabled: true
  }
)
