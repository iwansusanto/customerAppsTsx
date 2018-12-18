import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import SearchBar from "../../components/SearchBar"
import metrics from "../../config/metrics"
import FoodCategory from "../../components/FoodCategory"
import FoodSuggestion from "../../components/FoodSuggestion"
import withSuggestionContext from "../../components/consumers/withSuggestionContext"
import withSearchContext from "../../components/consumers/withSearchContext"

const LOGO = require("../../../assets/logo-higres.png")
const ICON_HEART = require("../../../assets/ic_heart.png")

const ICON_RATING = require("../../../assets/ic_rating.png")
const ICON_NEARBY = require("../../../assets/ic_nearby.png")
const ICON_NEW = require("../../../assets/ic_new.png")
const ICON_TIMELAPSE = require("../../../assets/ic_timelapse.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  suggestion: SuggestionContext
  search: SearchContext
}

class Food extends React.Component<Props, any> {
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

  componentWillMount() {
    const suggestId = this.props.navigation.getParam("suggestId")
    this.props.suggestion.getSuggestions(suggestId)
  }

  search = (id: number) => () => {
    this.props.search.search(id)
    this.props.navigation.navigate("FoodSearch")
  }

  searchBySuggestion = (parentId: number) => () => {
    this.props.search.searchBySuggestion(parentId)
    this.props.navigation.navigate("FoodSearch", {
      header: this.props.navigation.state.params.header
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>Stay where you are,</Text>
          <Text style={styles.caption}>We bring your favorites</Text>
        </View>
        <SearchBar
          style={styles.searchBar}
          onFocus={() => this.props.navigation.navigate("MainSearch")}
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Pick by categories</Text>
          <View style={styles.categoryListContainer}>
            <View style={styles.categoryListRow}>
              <FoodCategory
                onPress={this.search(1)}
                icon={ICON_RATING}
                caption={"Rating"}
              />
              <FoodCategory
                onPress={this.search(2)}
                icon={ICON_NEARBY}
                caption={"Nearby"}
              />
              <FoodCategory onPress={this.search(3)} icon={ICON_NEW} caption={"New"} />
              <FoodCategory
                onPress={this.search(4)}
                icon={ICON_TIMELAPSE}
                caption={"24 Hours"}
              />
            </View>
          </View>
        </View>
        <Text style={styles.suggestionCaption}>Suggestion for you</Text>
        <FlatList
          data={this.props.suggestion.suggestions}
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

export default withSuggestionContext(withSearchContext(Food))
