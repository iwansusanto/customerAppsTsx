import React from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Image
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const PICTURE = require("../../assets/dummy_inbox.png")

export default (props: TouchableOpacityProps) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={PICTURE} />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>New Macbook Pro</Text>
      <Text style={styles.subtitle}>Apple Product</Text>
      <Text style={styles.caption}>
        If you ask for Pasta Alfredo in a restaurant in Italy all you get from your waiter
        is a stare.
      </Text>
    </View>
    <Text style={styles.date}>26 Aug 2018</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    width: metrics.DEVICE_WIDTH * 0.9,
    flexDirection: "row",
    padding: 20
  },

  detailContainer: {
    marginLeft: 10,
    flex: 1
  },

  title: {
    fontWeight: "bold",
    fontSize: 18
  },

  subtitle: {
    fontWeight: "300",
    fontSize: 14,
    marginVertical: 5
  },

  caption: {
    fontSize: 13
  },

  date: {
    position: "absolute",
    bottom: 5,
    right: 10,
    fontSize: 10
  }
})
