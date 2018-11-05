// Button which is fixed to the bottom of the screen

import React from "react"
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from "react-native"

// Custom component used in this component
import Text from "./CustomText"

// Configs
import metrics from "../config/metrics"

// Props typing
interface FixedButtonProps extends TouchableOpacityProps {
  label: string
  backgroundColor?: string
}

export default (props: FixedButtonProps) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: props.backgroundColor }]}
    {...props}
  >
    <Text style={styles.label}>{props.label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },

  label: {
    fontSize: 16,
    fontWeight: "bold"
  }
})
