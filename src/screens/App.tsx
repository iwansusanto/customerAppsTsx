/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react"
import { Component } from "react"
import { StyleSheet, Text, View, Image, StatusBar } from "react-native"
import { NavigationStackScreenOptions } from "react-navigation"
import HeaderOverlay from "../components/HeaderOverlay"
import metrics from "../config/metrics"

const LOGO = require("../../assets/logo-higres.png")
const ICON_POINT = require("../../assets/point.png")

type Props = {}
export default class App extends Component<Props> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Mshwarapp",
    headerTitle: <Image source={LOGO} />
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
