// Button which is fixed to the bottom of the screen

import React from "react"
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  TextStyle
} from "react-native"

// Custom component used in this component
import Text from "./CustomText"

// Configs
import metrics from "../config/metrics"

// Props typing
interface FixedButtonProps extends TouchableOpacityProps {
  label: string
  backgroundColor?: string
  isLoading?: boolean
  labelStyle?: TextStyle
}

export default (props: FixedButtonProps) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: props.backgroundColor }]}
    {...props}
  >
    {props.isLoading && <ActivityIndicator style={styles.loading} />}
    <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X ? 65 : 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row"
  },

  loading: {
    marginRight: 10
  },

  label: {
    fontSize: 16,
    fontWeight: "bold"
  }
})
