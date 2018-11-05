import React from "react"
import { View, StyleSheet } from "react-native"
import metrics from "../config/metrics"

export default class HeaderOverlay extends React.Component {
  render() {
    return <View style={styles.container} />
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
    position: "absolute",
    top: metrics.DEVICE_WIDTH * 1.35 * -1
  }
})
