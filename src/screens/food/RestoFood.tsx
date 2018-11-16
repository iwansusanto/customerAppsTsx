import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import FoodItem from "../../components/FoodItem"
import metrics from "../../config/metrics"

import Text from "../../components/CustomText"

interface Props {
  navigation: NavigationScreenProp<any, any>
  data: Food[]
}

export default class RestoFood extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FoodItem
              name={item.name}
              picture={item.images[0]}
              price={item.price}
              onPress={() => {
                console.log("lala")
                this.props.navigation.navigate("FoodDetail")
              }}
            />
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
