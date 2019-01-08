import React from "react"

import { createTabNavigator } from "react-navigation"
import OrdersTopTab from "../../components/OrdersTopTab"

import OrdersHistory from "./OrdersHistory"
import OrdersOngoing from "./OrdersOngoing"

export default createTabNavigator(
  {
    Ongoing: { screen: OrdersOngoing },
    History: { screen: OrdersHistory }
  },
  {
    tabBarComponent: ({ navigation }) => <OrdersTopTab navigation={navigation} />,
    tabBarPosition: "top",
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true
  }
)
