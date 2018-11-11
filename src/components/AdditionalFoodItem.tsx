import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const RADIO_UNCHECKED = require("../../assets/ic_radio_uncheck.png")

export default () => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Image source={RADIO_UNCHECKED} resizeMode={"contain"} />
    </TouchableOpacity>
    <Text style={styles.name}>Iced Tea</Text>
    <Text style={styles.price}>Rp. 20.000</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.8,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: metrics.BORDER_COLOR
  },

  name: {
    flex: 2,
    marginLeft: 20
  },

  price: {
    flex: 1,
    textAlign: "right"
  }
})
