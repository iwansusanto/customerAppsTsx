import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"

import { NavigationScreenProp } from "react-navigation"
import withSearchContext from "../../components/consumers/withSearchContext"
import DishItem from "../../components/DishItem"

interface Props {
  navigation: NavigationScreenProp<any, any>
  search: SearchContext
}

class Dishes extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.search.product_data}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          style={styles.listContainer}
          renderItem={({ item }) => (
            <DishItem
              name={item.name}
              image={item.images[0]}
              onPress={() =>
                this.props.navigation.navigate("RestoDetail", {
                  merchantId: item.merchant_id
                })
              }
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
    paddingBottom: 20
  },

  listContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 30
  }
})

export default withSearchContext(Dishes)
