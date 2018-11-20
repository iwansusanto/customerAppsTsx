import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle } from "react-native"
import metrics from "../config/metrics"

import Text from "./CustomText"
import api from "../api"

const ICON_CHECK = require("../../assets/ic_check.png")

interface Props {
  selected: boolean
  name: string
  person: string
  address: string
  phone: string
  setSelected: () => void
  deleteAddress: () => void
}

export default (props: Props) => (
  <View style={{ flex: 1 }}>
    <TouchableOpacity onPress={props.setSelected} style={styles.container}>
      {props.selected && <Image source={ICON_CHECK} style={styles.check as ImageStyle} />}
      <Text
        style={[styles.name, !props.selected ? { color: "grey" } : { color: "black" }]}
      >
        {props.name}
      </Text>
      {props.selected && <Text style={styles.person}>{props.person}</Text>}
      {props.selected && <Text style={styles.subtitle}>{props.address}</Text>}
      {props.selected && <Text style={styles.subtitle}>{props.phone}</Text>}
    </TouchableOpacity>
    {props.selected && (
      <TouchableOpacity onPress={props.deleteAddress} style={styles.delete}>
        <Text style={styles.deleteButton}>DELETE</Text>
      </TouchableOpacity>
    )}
  </View>
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
    fontWeight: "300",
    width: metrics.DEVICE_WIDTH * 0.7
  },

  deleteButton: {
    color: "#007AFF",
    fontSize: 12
  },

  delete: {
    position: "absolute",
    top: 12,
    right: 10
  }
})
