import React from "react"

import { createTabNavigator, NavigationScreenProp } from "react-navigation"
import TopTab from "../../components/RestoTopTab"

import RestoFood from "./RestoFood"
import { View, StyleSheet } from "react-native"

import metrics from "../../config/metrics"

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
