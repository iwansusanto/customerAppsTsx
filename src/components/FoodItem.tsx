import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const PICTURE = require("../../assets/dummy_food.png")
const ICON_HEART = require("../../assets/ic_heart_outline.png")
const ICON_PLUS = require("../../assets/ic_plus.png")

export default (props: TouchableOpacityProps) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={PICTURE} />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>Fried Rice</Text>
      <Text style={styles.price}>Rp. 18.000</Text>
    </View>
    <TouchableOpacity style={styles.favorite}>
      <Image source={ICON_HEART} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.add}>
      <Image source={ICON_PLUS} />
    </TouchableOpacity>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },

  title: {
    fontWeight: "bold",
    fontSize: 18
  },

  price: {
    fontSize: 18
  },

  detailContainer: {
    marginLeft: 10
  },

  favorite: {
    position: "absolute",
    top: 10,
    right: 10
  },

  add: {
    position: "absolute",
    right: 15,
    bottom: 10
  }
})
