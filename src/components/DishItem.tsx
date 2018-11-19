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

const DUMMY_FOOD = require("../../assets/dummy_food.png")

interface Props extends TouchableOpacityProps {
  image: string
  name: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image style={styles.image} source={{ uri: props.image }} />
    <View style={styles.detailContainer}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.price}>Rp. 20.000</Text>
      <Text style={styles.restoName}>Mc Donalds</Text>
      <Text style={styles.restoAddress}>Skycrawler tower</Text>
    </View>
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
    marginLeft: 20
  },

  image: {
    height: 70,
    width: 70
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  price: {
    fontSize: 18
  },

  restoName: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 15
  },

  restoAddress: {
    fontSize: 14,
    fontWeight: "300"
  }
})
