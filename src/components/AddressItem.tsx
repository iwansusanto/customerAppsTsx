import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle } from "react-native"
import metrics from "../config/metrics"

import Text from "./CustomText"
import api from "../api"

const ICON_CHECK = require("../../assets/ic_check.png")
const ICON_EDIT = require("../../assets/ic_edit.png")

interface Props {
  selected: boolean
  name: string
  person: string
  address: string
  phone: string
  setSelected: () => void
  deleteAddress: () => void
  handleEditPressed: () => void
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
      <View style={styles.modifyContainer}>
        <TouchableOpacity onPress={props.deleteAddress}>
          <Text style={styles.deleteButton}>DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={props.handleEditPressed}>
          <Image source={ICON_EDIT} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
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

  modifyContainer: {
    position: "absolute",
    top: 12,
    right: 10,
    flexDirection: "row"
  }
})
