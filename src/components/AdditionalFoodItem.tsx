import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const RADIO_UNCHECKED = require("../../assets/ic_radio_uncheck.png")
const RADIO_CHECKED = require("../../assets/ic_radio_active.png")

interface Props extends TouchableOpacityProps {
  name: string
  price: string
  active: boolean
}

export default (props: Props) => (
  <TouchableOpacity {...props}>
    <View style={styles.container}>
      <Image
        source={props.active ? RADIO_CHECKED : RADIO_UNCHECKED}
        resizeMode={"contain"}
      />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.price}>{props.price}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.8,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: metrics.BORDER_COLOR
  },

  name: {
    flex: 2,
    marginLeft: 20
  },

  price: {
    flex: 1,
    textAlign: "right"
  }
})
