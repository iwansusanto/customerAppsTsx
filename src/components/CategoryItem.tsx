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
const PICTURE = require("../../assets/category_food.png")
const ICON = require("../../assets/ic_burger.png")

export default class CategoryItem extends React.Component<TouchableOpacityProps, any> {
  render() {
    // Get props to add into component
    const props = this.props
    return (
      <TouchableOpacity style={styles.container} {...props}>
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
    marginLeft: 30,
    marginRight: 10
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
