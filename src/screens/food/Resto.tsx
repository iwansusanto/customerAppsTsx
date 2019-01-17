import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Alert,
  ActivityIndicator
} from "react-native"

import RestoItem from "../../components/RestoItem"
import { NavigationScreenProp } from "react-navigation"
import withSearchContext from "../../components/consumers/withSearchContext"
import HeaderOverlay from "../../components/HeaderOverlay"

// Actions
import { connect } from "react-redux"

interface Props {
  navigation: NavigationScreenProp<any, any>
  loading: boolean
  merchant_data : Merchant[]
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

class Resto extends React.Component<Props, any> {
  render() {
    console.log("aa", this.props)
    return (
      <View style={styles.container}>
        {/* <HeaderOverlay /> */}
        {this.props.loading ? (
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color='white'/>
          </View>
        ) : (
          <FlatList
            data={this.props.merchant_data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
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
              )
            }}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
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
    paddingTop: 20,
    paddingBottom: 20
  }
})

// export default withSearchContext(Resto)
const mapStateToProps = ({
  getCategories,
  suggestion,
  pickCategories,
  search
}) => {
  const { banner } = getCategories
  const { suggestionsBanner } = suggestion
  const { pickCategoriesBanner } = pickCategories
  const {
    searchBySuggestion: { merchant_data },
    loading
  } = search
  console.log("search : ", search)
  return {
    banner,
    suggestionsBanner,
    pickCategoriesBanner,
    merchant_data,
    loading
  }
}

export default connect(
  mapStateToProps,
  null
)(Resto)
