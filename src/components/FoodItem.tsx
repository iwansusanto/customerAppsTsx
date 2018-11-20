import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  ImageStyle
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const ICON_HEART = require("../../assets/ic_heart_outline.png")
const ICON_PLUS = require("../../assets/ic_plus.png")

interface Props extends TouchableOpacityProps {
  picture: string
  name: string
  price: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image style={styles.picture as ImageStyle} source={{ uri: props.picture }} />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{props.name}</Text>
      <Text style={styles.price}>{`QR. ${props.price}`}</Text>
    </View>
    <TouchableOpacity style={styles.favorite}>
      <Image source={ICON_HEART} />
    </TouchableOpacity>
    {/* <TouchableOpacity style={styles.add}>
      <Image source={ICON_PLUS} />
    </TouchableOpacity> */}
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
    shadowOpacity: 1,
    minHeight: 120
  },

  picture: {
    flex: 1
  },

  title: {
    fontWeight: "bold",
    fontSize: 18
  },

  price: {
    fontSize: 18
  },

  detailContainer: {
    marginLeft: 10,
    flex: 3
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
