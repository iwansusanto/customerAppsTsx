import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle } from "react-native"
import metrics from "../config/metrics"

import Text from "./CustomText"

const ICON_CHECK = require("../../assets/ic_check.png")

export default () => (
  <TouchableOpacity style={styles.container}>
    <Image source={ICON_CHECK} style={styles.check as ImageStyle} />
    <TouchableOpacity style={styles.delete}>
      <Text style={styles.deleteButton}>DELETE</Text>
    </TouchableOpacity>
    <Text style={styles.name}>Apartement</Text>
    <Text style={styles.person}>Hamid</Text>
    <Text style={styles.subtitle}>Bassura City, East Jakarta</Text>
    <Text style={styles.subtitle}>085472647245</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 30
  },

  check: {
    position: "absolute",
    top: 12,
    left: 10
  },

  name: {
    fontWeight: "bold",
    marginBottom: 10
  },

  person: {
    marginBottom: 5
  },

  subtitle: {
    fontWeight: "300"
  },

  deleteButton: {
    color: "#007AFF",
    fontSize: 12
  },

  delete: {
    position: "absolute",
    top: 12,
    right: 60
  }
})
