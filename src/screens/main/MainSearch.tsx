import React from "react"
import { View, StyleSheet, Image, ImageStyle } from "react-native"
import { NavigationStackScreenOptions } from "react-navigation"

import Text from "../../components/CustomText"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import SearchItem from "../../components/SearchItem"

const LOGO = require("../../../assets/logo-higres.png")
const OVERLAY = require("../../../assets/overlay_search.png")

export default class MainSearch extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Search",
    headerTitle: <Image source={LOGO} />
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <View style={styles.searchContainer}>
          <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
          <SearchBar style={{ borderWidth: 0 }} />
          <SearchItem label={"MCD"} />
          <SearchItem label={"Dunkin"} />
          <SearchItem label={"Holycow"} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  searchContainer: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    width: metrics.DEVICE_WIDTH * 0.9,
    marginTop: 20
  },

  overlay: {
    position: "absolute",
    alignSelf: "center",
    top: metrics.DEVICE_HEIGHT * 0.3
  }
})
