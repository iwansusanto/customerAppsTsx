import React from "react"
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native"
import Text from "./CustomText"
import metrics from "../config/metrics"
const ChangeRestoImage = require("../../assets/change_restaurant.png")

interface Props {
  visible: boolean
  onRequestClose: () => void
  addToCart: () => void
}

const ChangeRestoAlert = ({ visible, onRequestClose, addToCart }: Props) => (
  <Modal
    visible={visible}
    onRequestClose={onRequestClose}
    animationType="fade"
    transparent
  >
    <TouchableOpacity style={{ flex: 1 }} onPress={onRequestClose}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.4)"
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: "white",
              width: metrics.DEVICE_WIDTH * 0.9,
              borderRadius: 20,
              overflow: "hidden"
            }}
          >
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text
                style={{
                  color: metrics.DANGER_COLOR,
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 20
                }}
              >
                Want to change restaurants?
              </Text>
              <Image source={ChangeRestoImage} />
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 20,
                  textAlign: "center"
                }}
              >
                No problem! But just a heads up, we'll need to clear your
                current cart first
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: metrics.PRIMARY_COLOR,
                  borderRightWidth: StyleSheet.hairlineWidth,
                  borderRightColor: "white"
                }}
                onPress={onRequestClose}
              >
                <Text
                  style={{ color: metrics.SECONDARY_COLOR, fontWeight: "bold" }}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: metrics.PRIMARY_COLOR
                  // borderLeftWidth: StyleSheet.hairlineWidth,
                  // borderLefttColor: "white"
                }}
                onPress={addToCart}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableOpacity>
  </Modal>
)

export default ChangeRestoAlert
