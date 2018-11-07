import React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

export default class TobTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DUMMY}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.labelContainer}>
              <Text style={styles.label}>{item}</Text>
              <View style={styles.underline} />
            </TouchableOpacity>
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: metrics.DEVICE_WIDTH,
    borderBottomWidth: 1,
    borderColor: "#9B1EB8",
    justifyContent: "center",
    paddingLeft: 20
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },

  labelContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },

  list: {
    flex: 1
  },

  listContent: {
    alignItems: "center"
  },

  underline: {
    backgroundColor: "#9B1EB8",
    position: "absolute",
    bottom: 0,
    height: 5,
    width: 70
  }
})

const DUMMY = ["Resto", "Dishes"]
