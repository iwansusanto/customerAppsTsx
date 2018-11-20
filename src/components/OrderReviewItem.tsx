import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const DUMMY_FOOD = require("../../assets/dummy_food.png")
const ICON_DELETE = require("../../assets/ic_delete.png")

interface Props {
  name: string
  price: string
  quantity: number
  additional: CartAdditional[]
  id: number
  updateCartItem: (id: number, quantity: number) => () => void
  deleteCartItem: () => void
}

export default (props: Props) => (
  <View style={styles.container}>
    <View style={{ flexDirection: "row" }}>
      <Image source={DUMMY_FOOD} />
      <View style={{ marginLeft: 20, justifyContent: "center" }}>
        <Text style={styles.foodTitle}>{props.name}</Text>
        {props.additional.map(item => (
          <Text style={{ marginTop: 5 }}>{item.name}</Text>
        ))}
      </View>
    </View>
    <View style={styles.priceContainer}>
      <Text style={{ color: "#4A90E2", fontWeight: "bold", fontSize: 13 }}>
        {props.price}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={props.updateCartItem(Math.max(props.quantity - 1, 1), props.id)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25, marginRight: 10 }}>-</Text>
        </TouchableOpacity>
        <Text style={{ color: "#4A90E2", fontWeight: "bold", fontSize: 18 }}>
          {props.quantity.toString()}
        </Text>
        <TouchableOpacity
          onPress={props.updateCartItem(Math.max(props.quantity + 1, 1), props.id)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 10 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View>
      <TouchableOpacity onPress={props.deleteCartItem}>
        <Image source={ICON_DELETE} />
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    width: metrics.DEVICE_WIDTH * 0.7,
    padding: 20,
    marginHorizontal: 10
  },

  foodTitle: {
    fontWeight: "bold",
    fontSize: 18
  },

  priceContainer: {
    borderTopWidth: 0.3,
    borderColor: "#EEEEEE",
    padding: 5,
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.3
  }
})
