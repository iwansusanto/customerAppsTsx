import { Dimensions, StyleSheet, Platform } from "react-native"

const { width, height } = Dimensions.get("window")

export default {
  PRIMARY_COLOR: "#660099",
  SECONDARY_COLOR: "#FFCC00",
  FACEBOOK_COLOR: "#3B5998",
  BORDER_COLOR: "#EFEFEF",
  DANGER_COLOR: "#FF0033",
  SHADOW_COLOR: "rgba(184, 184, 184, 0.5)",
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  OS: Platform.OS,
  IS_IPHONE_X: Platform.OS === "ios" && (height === 812 || width === 812)
}