import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import SearchBar from "../../components/SearchBar"
import TobTab from "../../components/TopTab"
import RestoItem from "../../components/RestoItem"

const LOGO = require("../../../assets/logo-higres.png")
const ICON_HEART = require("../../../assets/ic_heart.png")

export default class Search extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Food",
    headerTitle: <Image source={LOGO} />,
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }}>
        <Image source={ICON_HEART} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.subtitle}>Craving certain food, We'll help you find it?</Text>
        <SearchBar style={styles.search} />
        <TobTab />
        <FlatList
          data={["1", "2", "3"]}
          renderItem={() => <RestoItem />}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  subtitle: {
    color: "white",
    fontWeight: "300",
    fontSize: 18
  },

  search: {
    marginTop: 20
  },

  list: {
    paddingTop: 20
  }
})
