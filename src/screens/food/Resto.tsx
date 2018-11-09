import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"

import RestoItem from "../../components/RestoItem"
import { NavigationScreenProp } from "react-navigation"

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class Resto extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={["1", "2", "3"]}
          renderItem={() => (
            <RestoItem onPress={() => this.props.navigation.navigate("RestoDetail")} />
          )}
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
