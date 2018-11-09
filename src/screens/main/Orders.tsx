import React from "react"
import { View, StyleSheet, Image, FlatList } from "react-native"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import OrderItem from "../../components/OrderItem"
import HeaderOverlay from "../../components/HeaderOverlay"

const ICON_ACTIVE = require("../../../assets/ic_order_active.png")
const ICON_INACTIVE = require("../../../assets/ic_order_inactive.png")

export default class Orders extends React.Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: "Orders",
    tabBarIcon: ({ focused }) => {
      switch (focused) {
        case true:
          return (
            <Image
              source={ICON_ACTIVE}
              resizeMode={"contain"}
              style={metrics.TAB_BAR_ICON_STYLE}
            />
          )
        case false:
          return (
            <Image
              source={ICON_INACTIVE}
              resizeMode={"contain"}
              style={metrics.TAB_BAR_ICON_STYLE}
            />
          )
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <FlatList
          data={["1", "2", "3"]}
          renderItem={() => <OrderItem />}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  list: {
    paddingTop: 20
  }
})
