import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native"

import RestoItem from "../../components/RestoItem"
import withSearchContext from "../../components/consumers/withSearchContext"

interface Props {
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
          renderItem={({ item }) => (
            <RestoItem
              title={item.name}
              address={item.merchant.name}
              distance={""}
              picture={item.images[0]}
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
    paddingTop: 20,
    paddingBottom: 20
  }
})

export default withSearchContext(Dishes)
