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
const ICON_CANCEL = require("../../assets/ic_cancel.png")

interface Props extends TouchableOpacityProps {
  name: string
  statusText: string
  date: string
}

export default (props: Props) => (
  <TouchableOpacity style={styles.container} {...props}>
    <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
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
    </View>

    {props.statusText === 'SCHEDULED' && (
      <View style={styles.bottomEdgeContainer}>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: metrics.DANGER_COLOR}}></View>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.scheduleDay}>Tomorrow, Jan 15</Text>
          <Text style={styles.scheduleTime}>10:15 - 10:45</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => alert('Click')}>
            <Image source={ICON_CANCEL} style={styles.image as ImageStyle} />  
          </TouchableOpacity>
        </View>
      </View>
    )}  
    
    
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    backgroundColor: "white",
    // flexDirection: "row",
    // padding: 20,
    marginVertical: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },
  bottomEdgeContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    paddingBottom: 10, 
    paddingTop: 5,
    backgroundColor: metrics.BACKGROUND_GRAY, 
    borderBottomRightRadius: 5, 
    borderBottomLeftRadius: 5
  },
  scheduleDay: {
    fontSize: 12,
    color: metrics.INACTIVE_COLOR
  },
  scheduleTime: {
    fontSize: 11,
    color: metrics.INACTIVE_COLOR
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
