import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  FlatList,
  ImageStyle,
  AsyncStorage
} from "react-native"

import Text from "../../components/CustomText"
import Countries from "../../../assets/CountryCodes.json"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import strings from "../../components/language"


interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface Country {
  name: string
  dial_code: string
  code: string
}

interface State {
  filteredCountry: Array<Country>
  allCountries: Array<Country>
}

export default class CountrySelect extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: strings.registerCountryTitle
  }

  state = {
    filteredCountry: Countries,
    allCountries: Countries
  }

  selectCountry(item: any) {
    let callback = this.props.navigation.getParam("onSelect")
    this.props.navigation.goBack()
    callback(item.code, item.dial_code)
  }

  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    console.log("STRING select", languageStore)
    return language
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  filter(query: string) {
    let filteredCountry = []
    for (let country of this.state.allCountries) {
      let isExist = country.name.toLowerCase().search(query) >= 0
      if (isExist) {
        filteredCountry.push(country)
      }
    }
    this.setState({ filteredCountry: filteredCountry })
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          style={styles.searchBar}
          onChangeText={value => this.filter(value)}
          autoCapitalize={"none"}
        />
        <FlatList
          data={this.state.filteredCountry}
          extraData={this.state}
          renderItem={({ item }: { item: Country }) => (
            <CountryItem
              name={item.name}
              dial_code={item.dial_code}
              code={item.code}
              onPress={() => this.selectCountry(item)}
            />
          )}
        />
      </View>
    )
  }
}

interface CountryItemProps extends TouchableOpacityProps {
  name: string
  dial_code: string
  code: string
}

const CountryItem = (props: CountryItemProps) => (
  <TouchableOpacity style={styles.itemContainer} {...props}>
    <Image
      source={{ uri: `https://www.countryflags.io/${props.code}/flat/64.png` }}
      style={styles.flag as ImageStyle}
    />
    <Text style={styles.countryName}>{props.name}</Text>
    <Text>{props.dial_code}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  itemContainer: {
    width: metrics.DEVICE_WIDTH,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 20
  },

  flag: {
    width: 40,
    height: 40
  },

  countryName: {
    flex: 1,
    marginHorizontal: 20
  },

  searchBar: {
    width: metrics.DEVICE_WIDTH,
    borderWidth: 0
  }
})
