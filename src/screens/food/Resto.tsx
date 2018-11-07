import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"

import RestoItem from "../../components/RestoItem"

export default class Resto extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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

  list: {
    paddingTop: 20
  }
})
