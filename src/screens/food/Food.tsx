import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
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
import withSuggestionContext from "../../components/consumers/withSuggestionContext";

const LOGO = require("../../../assets/logo-higres.png")
const ICON_HEART = require("../../../assets/ic_heart.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  suggestion: SuggestionContext
}

class Food extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Food",
    headerTitle: <Image source={LOGO} />,
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }}>
        <Image source={ICON_HEART} />
      </TouchableOpacity>
    )
  }

  componentWillMount() {
    const parentId = this.props.navigation.getParam("parentId")
    this.props.suggestion.getSuggestions(parentId)
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>Stay where you are,</Text>
          <Text style={styles.caption}>We bring your favorites</Text>
        </View>
        <SearchBar style={styles.searchBar} />
        <View style={styles.categoryContainer}>
          <Text style={styles.subtitle}>Pick by categories</Text>
          <View style={styles.categoryListContainer}>
            <View style={styles.categoryListRow}>
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
            </View>
            <View style={styles.categoryListRow}>
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
              <FoodCategory />
            </View>
          </View>
        </View>
        <Text style={styles.suggestionCaption}>Suggestion for you</Text>
        <FlatList
          data={this.props.suggestion.suggestions}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FoodSuggestion
              title={item.name}
              picture={item.image_url}
              venueCount={item.has_children}
              onPress={() => this.props.navigation.navigate("FoodSearch")}
            />
          )}
          horizontal
          style={styles.suggestionsList}
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
    fontSize: 18
  },

  suggestionsList: {
    marginTop: 20,
    paddingLeft: 20,
    alignSelf: "flex-start",
    flex: 1,
    minWidth: metrics.DEVICE_WIDTH
  },

  suggestionCaption: {
    alignSelf: "flex-start",
    marginLeft: 40,
    fontSize: 18,
    marginTop: 10
  }
})

export default withSuggestionContext(Food)