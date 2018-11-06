// Search bar components, which used by many screen in the app

import React from "react"
import { StyleSheet, TextInputProps } from "react-native"

// Custom component used in this component
import CustomTextInput from "./CustomTextInput"

// Configs
import metrics from "../config/metrics"

// Assets
const ICON_SEARCH = require("../../assets/ic_search.png")

export default (props: TextInputProps) => {
  const { style, ...otherProps } = props
  return (
    <CustomTextInput
      icon={ICON_SEARCH}
      placeholder={"Search"}
      {...otherProps}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 45,
    borderColor: metrics.BORDER_COLOR,
    borderWidth: 1
  }
})
