import React from "react"

import { createTabNavigator } from "react-navigation"
import TopTab from "../../components/RestoTopTab"

import RestoFood from "./RestoFood"

export default createTabNavigator(
  {
    Rice: { screen: RestoFood },
    Dumplings: { screen: RestoFood }
  },
  {
    tabBarComponent: ({ navigation }) => <TopTab navigation={navigation} />,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true
  }
)
