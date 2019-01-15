import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageStyle
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const DUMMY_FOOD = require("../../assets/dummy_food.png")

interface Props extends TouchableOpacityProps {
  image: string
  name: string
  price: string
  merchant: string
  address: string
}

export default (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image style={styles.image as ImageStyle} source={{ uri: props.image }} />
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.price}>{`QR. `+props.price}</Text>
        <Text style={styles.restoName}>{props.merchant}</Text>
        <Text style={styles.restoAddress}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: metrics.DEVICE_WIDTH * 0.9,
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 0.3,
    borderColor: "#EEEEEE"
  },

  detailContainer: {
    marginLeft: 20,
    flex: 8,
  },

  image: {
    height: 70,
    width: 70,
    flex: 2,
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
    fontWeight: "300",
    marginRight: 30
  }
})
