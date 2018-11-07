// Food suggestion component, which is used in food main menu screen

import React from "react"
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, Image } from "react-native"

// Custom component used in this component
import Text from "./CustomText"
import metrics from "../config/metrics"

// Assets
const PICTURE = require("../../assets/suggestion_food.png")

export default (props: TouchableOpacityProps) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={PICTURE} resizeMode={"stretch"} style={styles.image} />
    <Text style={styles.title}>Seafood</Text>
    <Text style={styles.venues}>33 Venues</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.5,
    height: metrics.DEVICE_WIDTH * 0.4,
    borderRadius: 15
  },

  image: {
    width: metrics.DEVICE_WIDTH * 0.5,
    height: metrics.DEVICE_WIDTH * 0.4,
    position: "absolute"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginLeft: 20
  },

  venues: {
    position: "absolute",
    right: 20,
    bottom: 10,
    fontSize: 16,
    color: "white"
  }
})
