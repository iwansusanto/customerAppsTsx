// Custom header component to be used as custom header in the app

import React from "react"
import { View, StyleSheet, Image } from "react-native"

// Configs
import metrics from "../config/metrics"

// Assets
const LOGO = require("../../assets/logo-higres.png")

export default class CustomHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={LOGO} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: metrics.PRIMARY_COLOR,
    width: metrics.DEVICE_HEIGHT,
    height: metrics.DEVICE_HEIGHT,
    borderRadius: metrics.DEVICE_HEIGHT / 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: (metrics.DEVICE_WIDTH / 2) * -1
  }
})
