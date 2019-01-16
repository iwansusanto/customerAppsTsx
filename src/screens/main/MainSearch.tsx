import React from "react"
import { View, StyleSheet, Image, ImageStyle, FlatList } from "react-native"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"

import Text from "../../components/CustomText"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import SearchItem from "../../components/SearchItem"

// Actions
import { bindActionCreators } from "redux"
import * as searchActions from "../../actions/searchActions"
import { connect } from "react-redux"

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
  search: {
    searchByName: Function
  }
  result: SearchResponse
}

interface SearchResponse {
  id: number
  type: string
  success: boolean
  product_found: number
  merchant_found: number
  product_data: Product[]
  merchant_data: Merchant[]
}

interface Merchant {
  id: number
  name: string
  lat: number
  lng: number
  image: string
  sort: number
  is_merchant_open: number
  category_id: number
  city_id: number
  close: string
  open: string
  created_at: string
  updated_at: string
  menu_id: number
  address: string
  phone: string
  image_url: string
}

interface Product {
  id: number
  name: string
  description: string
  price: string
  price_old: string
  category_id: number
  menu_id: number
  tax_group_id: number
  type: string
  created_at: string
  updated_at: string
  images: string[]
  tax_value: number
  city_id: number
  additional: [
    {
      id: number
      label: string
      name: string
      data: string
    }
  ]
  merchant: Merchant
  merchant_id: number
  formatted_price: string
  formatted_old_price: string
  product_images: [
    {
      id: number
      image: string
      product_id: number
      created_at: string
      updated_at: string
    }
  ]
  tax_group: string
  category: Category
  product_additional: [
    {
      id: number
      product_id: number
      label: string
      name: string
      price: string
      created_at: string
      updated_at: string
    }
  ]
}

interface State {
  keyword: string
  timeout: number
  results: Result[]
  result: Result[]
}

class MainSearch extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Search",
    headerTitle: <Image source={LOGO} />
  }

  state = {
    keyword: "",
    timeout: -1,
    results: [] as Result[],
    result: [] as Result[]
  }

  getResult = async () => {
    if (this.state.keyword === "") return
    // console.log("keyword ", this.state.keyword)
    await this.props.search.searchByName(this.state.keyword)
  }

  handleChange = async (text: string) => {
    await this.setState({ keyword: text })

    const results = await this.props.result

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

    clearTimeout(this.state.timeout)
    this.setState({
      timeout: setTimeout(this.getResult, 1000),
      results: parsedResults
    })
  }

  handleClick = (result: Result, type: string) => () => {
    if (type === "merchant") {
      this.props.navigation.navigate("RestoDetail", {
        merchantId: result.id
      })
    } else {
      const food = result.data as Food
      // console.log(food)
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
    // console.log("result : ", this.state.results.length, this.state.keyword)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        {this.state.results.length === 0 || this.state.keyword.length === 0 &&
          <Text style={styles.noresult}>No result found</Text>
        }
        <View style={styles.searchContainer}>
          <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
          <SearchBar
            autoFocus
            onChangeText={this.handleChange}
            style={{ borderWidth: 0 }}
          />
          <FlatList
            data={this.state.keyword.length !== 0 ? this.state.results : this.state.result}
            keyExtractor={item => `${item.type}.${item.id}`}
            renderItem={({ item }) => (
              <SearchItem
                label={item.name}
                onPress={this.handleClick(item, item.type)}
              />
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

const mapStateToProps = search => {
  const {
    search: { result }
  } = search
  // console.log("search by name state ", result)
  return {
    result
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSearch)