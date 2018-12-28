import React from "react"
import { View, StyleSheet, Image, ScrollView, AsyncStorage } from "react-native"

import Text from "../../components/CustomText"
import HeaderOverlay from "../../components/HeaderOverlay"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import HelpItem from "../../components/HelpItem"
import strings from "../../components/language"



interface State {
  activeItem: string
}


export default class Help extends React.Component<any, State> {
  state = {
    activeItem: "Mshwar Food"
  }
  constructor(props) {
    super(props)
  }


  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    return await strings.setLanguage(languageStore)
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }


  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.title}>Help Center</Text>
        <Text style={styles.subtitle}>May us help you</Text>
        {/* <SearchBar /> */}
        <ScrollView style={styles.helpContainer}>
          <HelpItem
            content={HELP_ITEM}
            title={"Mshwar Food"}
            isContentVisible={this.state.activeItem === "Mshwar Food"}
          />
          {/*
          <HelpItem
            content={HELP_ITEM}
            title={"Mshwar Mart"}
            isContentVisible={this.state.activeItem === "Mshwar Mart"}
            onPress={() => this.setState({ activeItem: "Mshwar Mart" })}
          />
          <HelpItem
            content={HELP_ITEM}
            title={"Account"}
            isContentVisible={this.state.activeItem === "Account"}
            onPress={() => this.setState({ activeItem: "Account" })}
          />
          <HelpItem
            content={HELP_ITEM}
            title={"Other"}
            isContentVisible={this.state.activeItem === "Other"}
            onPress={() => this.setState({ activeItem: "Other" })}
          />
          */}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    marginLeft: 20,
    alignSelf: "flex-start"
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
    marginTop: 20
  },

  helpContainer: {
    backgroundColor: "white",
    height: metrics.DEVICE_HEIGHT,
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 100
  }
})

const HELP_ITEM = [
  "Selecting the cookware for your kitchen implies a few certain points you should consider: budget, cooking and eating habits, your family size, etc. One of the most essential points in choosing cookware is the material it is made of. Often, such an important detail is simply overlooked or is considered to be minor. In fact, proper understanding of differences between cookware materials will assist you in making the best choice and further on, will help maintain your cookware in a good shape.",
  "Stainless steel cookware is very common thank to its moderate price and a number of qualities, such as good tensile strength, excellent corrosion resistance and non-reaction with alkaline or acidic materials. Using stainless steel cookware allows using less oil and it better preserves the nutritious value of food. The drawback is that stainless steel does not conduct heat well, so the cookware requires a thick aluminum or copper core in the bottom and, sometimes, the sides to conduct heat more evenly and make the cookware more responsive to heat. Stainless steel cookware care is quite simple as it can be washed in a dishwasher and scraped with nylon pads. Special stainless steel cleaners will help bring the shine back.",
  "Non-stick cookware is a blessing when cooking and reheating sticky kinds of food. This coated surface also means you will need less oil or fat while frying on it. But you have to be careful while using and washing non-stick cookware."
]
