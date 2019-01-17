import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native"

import { NavigationScreenProp } from "react-navigation"
import DishItem from "../../components/DishItem"

// Actions
import { connect } from "react-redux"

interface Props {
  navigation: NavigationScreenProp<any, any>
  product_data: Product[]
  loading: boolean
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
  merchant: 
    {
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


class Dishes extends React.Component<Props> {
  render() {
    // console.log("dishes product", this.props.product_data)
    return (
      <View style={styles.container}>
        {this.props.loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.product_data}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
            style={styles.listContainer}
            renderItem={({ item }: { item: any }) => {
              
              return (
                <DishItem
                  name={item.name}
                  image={item.images[0]}
                  price={item.price}
                  merchant={item.merchant ? item.merchant.name : '-'}
                  address={item.merchant ? item.merchant.address : '-'}
                  onPress={() =>
                    this.props.navigation.navigate("RestoDetail", {
                      merchantId: item.merchant_id
                    })
                  }
                />
              )
            }}
          />
        )}
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

// export default withSearchContext(Dishes)
const mapStateToProps = ({ getCategories, suggestion, pickCategories, search }) => {
  const { banner } = getCategories
  const { suggestionsBanner } = suggestion
  const { pickCategoriesBanner } = pickCategories
  const { searchBySuggestion: { product_data }, loading } = search
  console.log("search product_data : ", search)
  return {
    banner,
    suggestionsBanner,
    pickCategoriesBanner,
    product_data,
    loading
  }
}

export default connect( mapStateToProps, null )(Dishes)
