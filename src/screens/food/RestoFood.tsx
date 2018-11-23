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
          contentContainerStyle={{ paddingBottom: 100 }}
          data={this.props.data}
          style={styles.listContainer}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FoodItem
              name={item.name}
              picture={item.images[0]}
              description={item.description}
              price={item.price}
              onPress={() => {
                console.log(item)
                this.props.navigation.navigate("FoodDetail", {
                  id: item.id,
                  title: item.name,
                  additional: item.additional,
                  picture: item.images[0],
                  price: item.price,
                  merchantId: item.merchant_id
                })
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
  },

  listContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 30
  }
})
