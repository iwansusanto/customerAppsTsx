import React from "react"
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageStyle
} from "react-native"
import metrics from "../config/metrics"

import Text from "./CustomText"

const ICON_CANCEL = require("../../assets/ic_cancel.png")

interface Props {
  id: number
  name: string
  price: string
  quantity: number
  additional: CartAdditional[]
  deleteCartItem: () => void
  updateCartItem: (id: number, quantity: number) => () => void
}

export default class CartItem extends React.Component<Props> {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.deleteCartItem}>
            <Image
              source={ICON_CANCEL}
              style={styles.cancelIcon as ImageStyle}
            />
          </TouchableOpacity>
          <View style={styles.detailContainer}>
            <View style={styles.mainDetail}>
              <Text style={styles.mainFood}>{this.props.name}</Text>
              <Text style={styles.mainPrice}>{this.props.price}</Text>
            </View>
            {this.props.additional.map(item => (
              <View style={styles.detail}>
                <Text style={styles.additionalFood}>{item.name}</Text>
                <Text style={styles.additionalFood}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={this.props.updateCartItem(Math.max(this.props.quantity - 1, 1), this.props.id)}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter}>{this.props.quantity.toString()}</Text>
          <TouchableOpacity onPress={this.props.updateCartItem(this.props.quantity + 1, this.props.id)}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
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
