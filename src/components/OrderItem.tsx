import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageStyle
} from "react-native"
import moment from "moment"
import metrics from "../config/metrics"

import Text from "../components/CustomText"

const PICTURE = require("../../assets/dummy_order.png")
const ICON_PHONE = require("../../assets/ic_phone_fill.png")
const ICON_MESSAGE = require("../../assets/ic_message.png")
const ICON_ARROW = require("../../assets/ic_arrow_blue.png")

interface Props extends TouchableOpacityProps {
  name: string
  statusText: string
  date: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <Image source={PICTURE} style={styles.image as ImageStyle} />
    <View style={styles.detailContainer}>
      <View style={styles.titleCard}>
        <Text style={styles.title}>{props.name}</Text>
        {props.statusText === 'SCHEDULED' && (
          <View style={{flex: 1}}>
            <Image source={ICON_ARROW} style={styles.image as ImageStyle} />  
          </View>
        )}
      </View>
      <Text style={styles.status}>{props.statusText}</Text>
      <Text style={styles.date}>{moment(props.date).format("DD MMM, hh:mm a")}</Text>
    </View>
    {props.statusText !== 'SCHEDULED' && (
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={ICON_PHONE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={ICON_MESSAGE} />
        </TouchableOpacity>
      </View>
    )}
    
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
  titleCard: {
    flex: 1, 
    flexDirection: 'row'
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 5
  },

  title: {
    fontWeight: "bold",
    fontSize: 13,
    flex: 9
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
