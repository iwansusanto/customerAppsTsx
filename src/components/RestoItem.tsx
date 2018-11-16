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

interface Props extends TouchableOpacityProps {
  title: string
  address: string
  distance: string
  picture: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image
      source={{ uri: props.picture }}
      resizeMode="stretch"
      style={styles.image}
    />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.address}>{props.address}</Text>
      <Text style={styles.distance}>{props.distance}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 15,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 10,
    overflow: "hidden"
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
    height: metrics.DEVICE_WIDTH * 0.5,
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
