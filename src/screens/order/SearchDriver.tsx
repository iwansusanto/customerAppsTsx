import React from "react"
import { View, StyleSheet, Image, ImageStyle, TouchableOpacity } from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import { NavigationStackScreenOptions } from "react-navigation"
import FixedButton from "../../components/FixedButton"

const OVERLAY = require("../../../assets/overlay-search-driver.png")
const ICON_SEARCH = require("../../../assets/ic_search_driver.png")
const ICON_CANCEL = require("../../../assets/ic_cancel_driver.png")

export default class SearchDriver extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Searching for Driver"
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
        <Text style={[styles.caption, { marginTop: 20 }]}>Sit back User</Text>
        <Text style={styles.caption}> We are searching the nearest driver from you</Text>
        <Image source={ICON_SEARCH} style={{ marginTop: 50 }} />
        <TouchableOpacity style={styles.cancelButtonContainer}>
          <Image source={ICON_CANCEL} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: metrics.DANGER_COLOR,
              marginTop: 20
            }}
          >
            CANCEL
          </Text>
        </TouchableOpacity>
        <FixedButton
          label={"MAKE NEW ORDER"}
          labelStyle={{ color: "white" }}
          backgroundColor={metrics.SECONDARY_COLOR}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: metrics.PRIMARY_COLOR,
    alignItems: "center"
  },

  overlay: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center"
  },

  caption: {
    color: "white",
    fontWeight: "300",
    textAlign: "center",
    fontSize: 18
  },

  cancelButtonContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center"
  }
})
