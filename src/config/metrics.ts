import { Dimensions, StyleSheet, Platform } from "react-native"

const { width, height } = Dimensions.get("window")

export default {
  PRIMARY_COLOR: "#660099",
  BORDER_COLOR: "#EFEFEF",
  SHADOW_COLOR: "rgba(184, 184, 184, 0.5)",
  DANGER_COLOR: "rgb(218,55,73)",
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  OS: Platform.OS,
  IS_IPHONE_X: Platform.OS === "ios" && (height === 812 || width === 812)
}
