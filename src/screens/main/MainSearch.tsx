import React from "react"
import { View, StyleSheet, Image, ImageStyle, FlatList } from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

import Text from "../../components/CustomText"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import SearchItem from "../../components/SearchItem"
import withSearchContext from "../../components/consumers/withSearchContext"
import Lang from '../../components/Lang'

import { any } from "prop-types"

const LOGO = require("../../../assets/logo-higres.png")
const OVERLAY = require("../../../assets/overlay_search.png")

interface Result {
  id: number
  type: string
  name: string
  data?: Food
}

interface Props {
  navigation: NavigationScreenProp<any, any>
  search: SearchContext
}

interface State {
  keyword: string
  timeout: number
  results: Result[]
}

class MainSearch extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Search",
    headerTitle: <Image source={LOGO} />
  }

  state = {
    keyword: "",
    timeout: -1,
    results: [] as Result[]
  }

  getResult = async () => {
    if (this.state.keyword === "") return

    await this.props.search.searchByName(this.state.keyword)
    const results = this.props.search.result

    const merchantResult: Result[] = results.merchant_data.map(item => ({
      id: item.id,
      type: "merchant",
      name: item.name
    }))

    const foodResult: Result[] = results.product_data.map(item => ({
      id: item.id,
      type: "product",
      name: item.name,
      data: item as Food
    }))

    const parsedResults = [...merchantResult, ...foodResult]
    this.setState({ results: parsedResults })
  }

  handleChange = async (text: string) => {
    await this.setState({ keyword: text })

    clearTimeout(this.state.timeout)
    this.setState({
      timeout: setTimeout(this.getResult, 1000)
    })
  }

  handleClick = (result: Result, type: string) => () => {
    if (type === "merchant") {
      this.props.navigation.navigate("RestoDetail", {
        merchantId: result.id
      })
    } else {
      const food = result.data as Food
      console.log(food)
      this.props.navigation.navigate("FoodDetail", {
        id: result.id,
        title: result.name,
        additional: food.additional,
        picture: food.images[0],
        price: food.price,
        merchantId: food.merchant_id
      })
    }
  }

  render() {
    console.log(this.state.results.length)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        {this.state.results.length === 0 && (
          <Text style={styles.noresult}>No result found</Text>
        )}
        <View style={styles.searchContainer}>
          <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
          <SearchBar
            autoFocus
            onChangeText={this.handleChange}
            style={{ borderWidth: 0 }}
          />
          <FlatList
            data={this.state.results}
            keyExtractor={item => `${item.type}.${item.id}`}
            renderItem={({ item }) => (
              <SearchItem label={item.name} onPress={this.handleClick(item, item.type)} />
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  searchContainer: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    width: metrics.DEVICE_WIDTH * 0.9,
    marginTop: 20,
    marginBottom: 20
  },

  overlay: {
    position: "absolute",
    alignSelf: "center",
    top: metrics.DEVICE_HEIGHT * 0.3
  },

  noresult: {
    position: "absolute",
    top: 100,
    zIndex: 10
  }
})

export default withSearchContext(MainSearch)
