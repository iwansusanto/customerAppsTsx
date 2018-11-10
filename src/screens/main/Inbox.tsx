import React from "react"
import { View, StyleSheet, Image, FlatList } from "react-native"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import HeaderOverlay from "../../components/HeaderOverlay"
import InboxItem from "../../components/InboxItem"

const ICON_ACTIVE = require("../../../assets/ic_mail_active.png")
const ICON_INACTIVE = require("../../../assets/ic_mail_inactive.png")

export default class Inbox extends React.Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: "Inbox",
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
        <Text style={styles.title}>Inbox</Text>
        <Text style={styles.subtitle}>Keep notified and get best deals</Text>
        <FlatList
          data={["1", "2", "3"]}
          renderItem={() => <InboxItem />}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
    marginTop: 20
  },

  list: {
    paddingTop: 20
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    marginLeft: 20,
    alignSelf: "flex-start"
  }
})
