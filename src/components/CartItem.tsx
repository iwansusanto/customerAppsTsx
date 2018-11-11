import React from "react"
import { View, TouchableOpacity, Image, StyleSheet, ImageStyle } from "react-native"
import metrics from "../config/metrics"

import Text from "./CustomText"

const ICON_CANCEL = require("../../assets/ic_cancel.png")

export default class CartItem extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image source={ICON_CANCEL} style={styles.cancelIcon as ImageStyle} />
          <View style={styles.detailContainer}>
            <View style={styles.mainDetail}>
              <Text style={styles.mainFood}>Fried Rice</Text>
              <Text style={styles.mainPrice}>Rp. 20.000</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.additionalFood}>Fried Rice</Text>
              <Text style={styles.additionalFood}>Rp. 20.000</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.additionalFood}>Fried Rice</Text>
              <Text style={styles.additionalFood}>Rp. 20.000</Text>
            </View>
          </View>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.counterButton}>-</Text>
          <Text style={styles.counter}>3</Text>
          <Text style={styles.counterButton}>+</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: "grey",
    flexDirection: "row",
    padding: 20,
    paddingTop: 10
  },

  cancelIcon: {
    alignSelf: "center"
  },

  detailContainer: {
    flex: 1,
    paddingHorizontal: 30
  },

  mainDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },

  mainFood: {
    fontSize: 14,
    fontWeight: "bold"
  },

  mainPrice: {
    fontSize: 13
  },

  additionalFood: {
    fontSize: 12,
    color: "grey"
  },

  counterContainer: {
    width: metrics.DEVICE_WIDTH,
    height: 35,
    borderBottomWidth: 0.3,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  counterButton: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20
  },

  counter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2"
  }
})
