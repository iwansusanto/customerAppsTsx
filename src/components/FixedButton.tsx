import React from "react"
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from "react-native"
import Text from "./CustomText"
import metrics from "../config/metrics"

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
