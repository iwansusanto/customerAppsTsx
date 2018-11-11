import React from "react"
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native"

// Custom component used in this component
import Text from "./CustomText"
import metrics from "../config/metrics"

// Assets
const ICON = require("../../assets/ic_burger.png")

interface Props extends TouchableOpacityProps {
  title: string
  picture: string
}

const CategoryItem = (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image
      source={{ uri: props.picture }}
      style={styles.image}
      resizeMode="stretch"
    />
    <Image source={ICON} style={styles.icon} />
    <Text style={styles.subtitle}>{props.title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.6,
    height: metrics.DEVICE_WIDTH * 0.35,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 10,
    backgroundColor: "black"
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 15
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

export default CategoryItem
