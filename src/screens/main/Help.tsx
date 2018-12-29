import React from "react"
import { View, StyleSheet, Image, ScrollView, AsyncStorage } from "react-native"

import Text from "../../components/CustomText"
import HeaderOverlay from "../../components/HeaderOverlay"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import SearchBar from "../../components/SearchBar"
import HelpItem from "../../components/HelpItem"
import strings from "../../components/language"
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface arrayOf {
  [index: number]: { title: string; content: string }
}

interface State {
  activeItem: string
  data: arrayOf
}

export default class Help extends React.Component<any, State> {
  state = {
    activeItem: "Mshwar Food",
    data: [
      { title: strings.food, content: strings.helpTabFood },
      { title: strings.mart, content: strings.helpTabMart },
      { title: strings.groceries, content: strings.helpTabGroceris },
      { title: strings.tech, content: strings.helpTabTech }
    ]
  }
  constructor(props) {
    super(props)
  }

  _onSetLanguage = async () => {
    const languageStore = await AsyncStorage.getItem("language")
    return await strings.setLanguage(languageStore)
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  _header = item => {
    return (
      <View
        style={{
          borderBottomColor: "rgb(74,74,74)",
          borderBottomWidth: 0.2,
          paddingVertical: 10,
          marginHorizontal: 15
        }}
      >
        {strings.getLanguage() === "ar" ? (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1
            }}
          >
            <Icon
              type={"MaterialIcons"}
              name={"arrow-drop-down"}
              style={{ color: "#0099CC" }}
              size={25}
            />
            <Text
              style={[
                { marginLeft: 15, marginTop: 5 },
                strings.getLanguage() === "ar"
                  ? { textAlign: "right", marginRight: 15 }
                  : { textAlign: "left" }
              ]}
            >
              {item.title}
            </Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1
            }}
          >
            <Text
              style={[
                { marginLeft: 15, marginTop: 5 },
                strings.getLanguage() === "ar"
                  ? { textAlign: "right", marginRight: 15 }
                  : { textAlign: "left" }
              ]}
            >
              {item.title}
            </Text>
            <Icon
              type={"MaterialIcons"}
              name={"arrow-drop-down"}
              style={{ color: "#0099CC" }}
              size={25}
            />
          </View>
        )}
      </View>
    )
  }

  _body = item => {
    return (
      <View>
        <Text
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
            textAlign: "justify"
          }}
        >
          {item.content}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.title}>Help Center</Text>
        <Text style={styles.subtitle}>May us help you</Text>
        {/* <SearchBar /> */}
        <ScrollView style={styles.helpContainer}>
          {/* <Text
            style={[
              { marginLeft: 15, marginTop: 5 },
              strings.getLanguage() === "ar"
                ? { textAlign: "right", marginRight: 15 }
                : { textAlign: "left" }
            ]}
          >
            {strings.food}
          </Text>
          <Text
            style={{
              marginVertical: 15,
              marginHorizontal: 15,
              textAlign: "justify"
            }}
          >
            {strings.helpTabFood}
          </Text>
          <Text
            style={[
              { marginLeft: 15, marginTop: 5 },
              strings.getLanguage() === "ar"
                ? { textAlign: "right", marginRight: 15 }
                : { textAlign: "left" }
            ]}
          >
            {strings.mart}
          </Text>
          <Text
            style={{
              marginVertical: 15,
              marginHorizontal: 15,
              textAlign: "justify"
            }}
          >
            {strings.helpTabMart}
          </Text>
          <Text
            style={[
              { marginLeft: 15, marginTop: 5 },
              strings.getLanguage() === "ar"
                ? { textAlign: "right", marginRight: 15 }
                : { textAlign: "left" }
            ]}
          >
            {strings.groceries}
          </Text>
          <Text
            style={{
              marginVertical: 15,
              marginHorizontal: 15,
              textAlign: "justify"
            }}
          >
            {strings.helpTabGroceris}
          </Text>
          <Text
            style={[
              { marginLeft: 15, marginTop: 5 },
              strings.getLanguage() === "ar"
                ? { textAlign: "right", marginRight: 15 }
                : { textAlign: "left" }
            ]}
          >
            {strings.tech}
          </Text>
          <Text
            style={{
              marginVertical: 15,
              marginHorizontal: 15,
              textAlign: "justify"
            }}
          >
            {strings.helpTabTech}
          </Text> */}

          <AccordionList
            list={this.state.data}
            header={this._header}
            body={this._body}
          />

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
    paddingTop: 20,
    paddingBottom: 100
  }
})

const HELP_ITEM = [
  { title: strings.food, content: strings.helpTabFood },
  { title: strings.mart, content: strings.helpTabMart },
  { title: strings.groceries, content: strings.helpTabGroceris },
  { title: strings.tech, content: strings.helpTabTech }
]
