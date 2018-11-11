import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import FoodItem from "../../components/FoodItem"

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class RestoFood extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={["1", "2", "3"]}
          renderItem={() => (
            <FoodItem onPress={() => this.props.navigation.navigate("FoodDetail")} />
          )}
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
