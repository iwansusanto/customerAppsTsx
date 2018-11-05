// Search bar components, which used by many screen in the app

import React from "react"
import { StyleSheet, TextInputProps } from "react-native"

import CustomTextInput from "./CustomTextInput"
import metrics from "../config/metrics"

const ICON_SEARCH = require("../../assets/ic_search.png")

export default (props: TextInputProps) => (
  <CustomTextInput
    icon={ICON_SEARCH}
    placeholder={"Search"}
    {...props}
    style={styles.container}
  />
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 45,
    borderColor: metrics.BORDER_COLOR,
    borderWidth: 1
  }
})
