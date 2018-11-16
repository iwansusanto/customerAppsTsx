// The rounded color that extends from the header

import React from "react"
import { View, StyleSheet } from "react-native"

// Configs
import metrics from "../config/metrics"

export default class HeaderOverlay extends React.Component {
  render() {
    return <View style={styles.container} />
  }
}

const radius = metrics.DEVICE_HEIGHT

const styles = StyleSheet.create({
  container: {
    backgroundColor: metrics.PRIMARY_COLOR,
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    position: "absolute",
    right: metrics.DEVICE_WIDTH / 2 - radius / 2,
    top: metrics.DEVICE_WIDTH * 1.1 * -1
  }
})
