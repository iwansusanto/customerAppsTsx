import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, Alert } from "react-native"

import RestoItem from "../../components/RestoItem"
import { NavigationScreenProp } from "react-navigation"
import withSearchContext from "../../components/consumers/withSearchContext"
import HeaderOverlay from "../../components/HeaderOverlay"

interface Props {
  navigation: NavigationScreenProp<any, any>
  search: SearchContext
}

class Resto extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        {/* <HeaderOverlay /> */}
        <FlatList
          data={this.props.search.merchant_data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RestoItem
              title={item.name}
              address={item.address}
              distance={""}
              picture={item.image_url}
              onPress={() =>
                this.props.navigation.navigate("RestoDetail", {
                  merchantId: item.id
                })
              }
            />
          )}
          contentContainerStyle={styles.list}
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
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default withSearchContext(Resto)
