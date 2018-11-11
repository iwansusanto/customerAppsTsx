import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native"

import RestoItem from "../../components/RestoItem"
import { NavigationScreenProp } from "react-navigation"
import withSearchContext from "../../components/consumers/withSearchContext"

interface Props {
  navigation: NavigationScreenProp<any, any>
  search: SearchContext
}

class Resto extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.search.merchant_data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RestoItem
              title={item.name}
              address={item.address}
              distance={""}
              picture={item.image_url}
              onPress={() => this.props.navigation.navigate("RestoDetail")}
            />
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

export default withSearchContext(Resto)
