// Food category component, which is used in food main menu screen

import React from "react"
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, Image } from "react-native"

// Custom component used in this component
import Text from "./CustomText"

// Configs
import metrics from "../config/metrics"

// Assets
const ICON_RATING = require("../../assets/ic_rating.png")

export default (props: TouchableOpacityProps) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={ICON_RATING} style={styles.icon} />
    <Text style={styles.caption}>Most Favorited</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: metrics.BORDER_COLOR,
    width: 70,
    height: 70,
    borderRadius: 10
  },

  caption: {
    fontWeight: "bold",
    fontSize: 12,
    position: "absolute",
    bottom: 5,
    alignSelf: "center"
  },

  icon: {
    marginLeft: 5,
    marginTop: 5
  }
})
