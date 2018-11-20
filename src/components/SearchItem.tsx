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

const ICON_HISTORY = require("../../assets/ic_history.png")

interface Props extends TouchableOpacityProps {
  label: string
}

export default (props: Props) => (
  <TouchableOpacity {...props} style={styles.container}>
    {/* <Image source={ICON_HISTORY} style={{ flex: 1 }} resizeMode={"contain"} /> */}
    <Text style={{ flex: 7, marginLeft: 30 }}>{props.label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 40,
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderColor: "#EEEEEE",
    alignItems: "center"
  }
})
