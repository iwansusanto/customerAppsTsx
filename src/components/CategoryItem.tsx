import React from "react"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const PICTURE = require("../../assets/category_food.png")
const ICON = require("../../assets/ic_burger.png")

export default class CategoryItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Image source={PICTURE} style={styles.image} resizeMode={"contain"} />
        <Image source={ICON} style={styles.icon} />
        <Text style={styles.subtitle}>Food</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.6,
    height: metrics.DEVICE_HEIGHT * 0.2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 30
  },

  image: {
    flex: 1
  },

  icon: {
    position: "absolute",
    top: 10,
    left: 5
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 5
  }
})
