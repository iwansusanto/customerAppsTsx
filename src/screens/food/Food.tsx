import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native"

import Text from "../../components/CustomText"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import SearchBar from "../../components/SearchBar"
import metrics from "../../config/metrics"
import FoodCategory from "../../components/FoodCategory"
import FoodSuggestion from "../../components/FoodSuggestion"
import Lang from "../../components/Lang"

// Actions
import { bindActionCreators } from "redux"
import * as suggestionActions from "../../actions/suggestionActions"
import * as pickCategoriesActions from "../../actions/pickCategoriesActions"
import * as searchActions from '../../actions/searchActions'
import { connect } from "react-redux"

const LOGO = require("../../../assets/logo-higres.png")
const ICON_HEART = require("../../../assets/ic_heart.png")

interface Props {
  navigation            : NavigationScreenProp<any, any>
  search                : {
    search                : Function
    searchBySuggestion    : Function
  }
  pickcategories        : {
    searchPickCategories  : Function
  }
  banner                : Category[]
  suggestion            : {
    getSuggestions        : Function
  }
  suggestionsBanner     : Category[]
  pickCategoriesBanner  : PickBanner[]
}

interface PickBanner {
  id            : number
  category_id   : number
  label         : string
  name          : string
  image_url     : string
  root_category : number
  status        : number
}

interface Category {
  id          : number
  name        : string
  _lft        : number
  _rgt        : number
  parent_id   : number
  suggest_id  : string
  city_id     : number
  merchant_id : number
  created_at  : string
  updated_at  : string
  has_children: number
  image_url   : string
}

interface State {
  parent_id: any
}

class Food extends React.Component<Props, State> {
  static navigationOptions = ({
    // Navigation variable to be able to call navigation-related functions in the header
    navigation
  }: {
    // Navigation variable type
    navigation: NavigationScreenProp<any, any>
  }): NavigationStackScreenOptions => {
    // Destructuring functions inside navigation object for easy use
    const { navigate, goBack } = navigation
    return {
      title: navigation.state.params.header,
      headerTitle: <Image source={LOGO} />,
      headerRight: (
        <TouchableOpacity style={{ marginRight: 20 }}>
          <Image source={ICON_HEART} />
        </TouchableOpacity>
      )
    }
  }

  async componentWillMount() {
    const suggestId = await this.props.navigation.getParam("suggestId")
    this.props.suggestion.getSuggestions(suggestId)
    this.props.pickcategories.searchPickCategories(suggestId)
  }

  search = (categoriId: number, type: string) => async() => {
    this.props.search.search(categoriId, type)
    this.props.navigation.navigate("FoodSearch", {
      header: this.props.navigation.state.params.header
    })
  }

  searchBySuggestion = (parentId: number) => () => {
    this.props.search.searchBySuggestion(parentId)
    this.props.navigation.navigate("FoodSearch", {
      header: this.props.navigation.state.params.header
    })
  }

  render() {
    console.log("this props food : ", this.props)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <View style={styles.captionContainer}>
          <Lang styleLang={styles.caption} language="foodTagline1" />
          <Lang styleLang={styles.caption} language="foodTagline2" />
        </View>
        <SearchBar
          style={styles.searchBar}
          onFocus={() => this.props.navigation.navigate("MainSearch")}
        />
        <View style={styles.categoryContainer}>
          <Lang styleLang={styles.subtitle} language="foodPickByCategories" />
          <View style={styles.categoryListContainer}>
            <FlatList
              data={this.props.pickCategoriesBanner}
              keyExtractor={item => item.id.toString()}
              numColumns={4}
              renderItem={({ item }) => {
                return (
                  <FoodCategory
                    label={item.label}
                    image_url={item.image_url}
                    name={item.name}
                    onPress={this.search(item.root_category, item.label)}
                  />
                )
              }}
              columnWrapperStyle={styles.categoryListRow}
            />
          </View>
        </View>
        <Lang styleLang={styles.suggestionCaption} language="foodSuggest" />
        <FlatList
          data={this.props.suggestionsBanner}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <FoodSuggestion
                title={item.name}
                picture={item.image_url}
                venueCount={item.has_children}
                onPress={this.searchBySuggestion(item.id)}
              />
            )
          }}
          horizontal
          contentContainerStyle={styles.suggestionsList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    // backgroundColor: "white"
  },

  captionContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 30
  },

  caption: {
    color: "white",
    fontSize: 18,
    fontWeight: "300"
  },

  searchBar: {
    marginTop: 20
  },

  categoryContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: metrics.DEVICE_WIDTH * 0.9,
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 40,
    borderRadius: 10,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },

  categoryListContainer: {
    marginTop: 10
  },

  categoryListRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5
  },

  subtitle: {
    fontSize: 18,
    marginVertical: 20
  },

  suggestionsList: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    alignSelf: "flex-start"
  },

  suggestionCaption: {
    alignSelf: "flex-start",
    marginLeft: 40,
    fontSize: 18,
    marginTop: metrics.IS_IPHONE_X ? 40 : 15
  }
})

// export default withPickCategoriesContext(withSuggestionContext(withSearchContext(Food)))

const mapStateToProps = ({ getCategories, suggestion, pickCategories }) => {
  const { banner } = getCategories
  const { suggestionsBanner } = suggestion
  const { pickCategoriesBanner } = pickCategories
  // console.log("pick banners : ", )
  return {
    banner,
    suggestionsBanner,
    pickCategoriesBanner
  }
}

const mapDispatchToProps = dispatch => {
  return {
    suggestion: bindActionCreators(suggestionActions, dispatch),
    pickcategories: bindActionCreators(pickCategoriesActions, dispatch),
    search: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food)
