import { Dimensions, Platform, StyleSheet } from "react-native"

// Get the screen dimensions
const { width, height } = Dimensions.get("window")

// Styles
const styles = StyleSheet.create({
  tabBarIcon: {
    height: 20,
    width: 20
  }
})

// Declare all constants used in the app
export default {
  PRIMARY_COLOR: "#660099",
  SECONDARY_COLOR: "#FFCC00",
  FACEBOOK_COLOR: "#3B5998",
  BORDER_COLOR: "#9B9B9B",
  DANGER_COLOR: "#FF0033",
  SHADOW_COLOR: "rgba(184, 184, 184, 0.5)",
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  OS: Platform.OS,
  IS_IPHONE_X: Platform.OS === "ios" && (height === 812 || width === 812),
  TAB_BAR_ICON_STYLE: styles.tabBarIcon
}
