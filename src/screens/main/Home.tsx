import React from "react"
import { Component } from "react"
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native"
import { NavigationScreenProp, NavigationTabScreenOptions } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"

const ICON_POINT = require("../../../assets/point.png")
const ICON_ACTIVE = require("../../../assets/ic_home_active.png")
const ICON_INACTIVE = require("../../../assets/ic_home_inactive.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class Home extends Component<Props, any> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: "Home",
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
        <StatusBar barStyle={"light-content"} />
        <View style={styles.customerDetail}>
          <Text style={styles.greeting}>Hi Adi!</Text>
          <View>
            <Text style={styles.current_point}>your current points</Text>
            <View style={styles.pointContainer}>
              <Image source={ICON_POINT} style={styles.point_icon} />
              <Text style={styles.point}>2.000</Text>
            </View>
          </View>
        </View>
        <Button
          title={"Login"}
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  customerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: metrics.DEVICE_WIDTH * 0.9
  },

  greeting: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20
  },

  current_point: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "100",
    fontSize: 14
  },

  pointContainer: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  point: {
    fontFamily: "Helvetica",
    fontSize: 24,
    marginLeft: 5,
    color: "white"
  },

  point_icon: {
    marginTop: 5
  }
})
