import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageStyle
} from "react-native"
import metrics from "../config/metrics"

import Text from "../components/CustomText"

const PICTURE = require("../../assets/dummy_order.png")
const ICON_PHONE = require("../../assets/ic_phone_fill.png")
const ICON_MESSAGE = require("../../assets/ic_message.png")

interface Props extends TouchableOpacityProps {
  name: string
  statusText: string
  date: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={PICTURE} style={styles.image as ImageStyle} />
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{props.name}</Text>
      <Text style={styles.status}>{props.statusText}</Text>
      <Text style={styles.date}>{props.date}</Text>
    </View>
    <View style={styles.iconContainer}>
      <TouchableOpacity>
        <Image source={ICON_PHONE} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={ICON_MESSAGE} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    marginVertical: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },

  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 5
  },

  title: {
    fontWeight: "bold",
    fontSize: 13
  },

  status: {
    color: "#7ED321",
    fontSize: 11,
    fontWeight: "bold",
    marginVertical: 5
  },

  date: {
    fontSize: 10
  },

  image: {
    alignSelf: "center"
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2,
    paddingHorizontal: 10
  }
})
