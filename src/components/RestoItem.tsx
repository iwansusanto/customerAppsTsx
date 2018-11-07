import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const PICTURE = require("../../assets/dummy_resto.png")

export default (props: TouchableOpacityProps) => (
  <TouchableOpacity style={styles.container}>
    <Image source={PICTURE} resizeMode={"contain"} style={styles.image} />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>Nasi Padang Rasis</Text>
      <Text style={styles.address}>Tebet east v number 12, South Jakarta</Text>
      <Text style={styles.distance}>2 miles away</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 15,
    height: metrics.DEVICE_WIDTH * 0.5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 90
  },

  detailContainer: {
    backgroundColor: "white",
    width: metrics.DEVICE_WIDTH * 0.9,
    padding: 20,
    paddingBottom: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.9
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  },

  address: {
    fontSize: 14
  },

  distance: {
    fontSize: 13,
    fontWeight: "300",
    alignSelf: "flex-end",
    marginTop: 10
  }
})
