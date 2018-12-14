// The rounded color that extends from the header

import React from "react"
import { View, StyleSheet, Image } from "react-native"

// Configs
import metrics from "../config/metrics"

const HEADER_BACKGROUND = require("../../assets/home-bg.png")

export default class HeaderOverlayTab extends React.Component {
  render() {
    return <View style={styles.container} />
    // return (
    //   <Image
    //           style={styles.background}
    //           resizeMode='cover'
    //           source={HEADER_BACKGROUND} />

    // )
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
    top: metrics.IS_IPHONE_X
      ? metrics.DEVICE_WIDTH * 1.5 * -1
      : metrics.DEVICE_WIDTH * 1.1 * -1
  },
  background: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  }
})
