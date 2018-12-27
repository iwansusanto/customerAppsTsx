import React from "react"
import { ScrollView, StyleSheet, WebView, AsyncStorage } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import strings from "../../components/language"


const TOS_HTML = require("../../../assets/tos.html")

interface Props {
  navigation: NavigationScreenProp<any, any>
}


export default class Terms extends React.Component<Props, any> {
  static navigationOptions =(): NavigationStackScreenOptions => ({
    title: strings.accountTos
  })

  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    console.log("STRING", languageStore, language)
    return language
  }

  componentWillMount = () => {
    this._onSetLanguage()
    this.props.navigation.setParams({})
  }

  render() {
    return (
      // <ScrollView style={styles.container}>
      //   <Text>
      //   Mshwar Company ("we," "our" or "Mshwar") is committed to protecting the privacy of all visitors to our website Mshwarapp.com and all visitors who access our website or services through any mobile application (together, "Website"). Please read the following privacy policy which explains how we use and protect your information.
      //   </Text>
      // </ScrollView>
      <WebView style={styles.container} originWhitelist={['*']} source={TOS_HTML} scalesPageToFit={false} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  }
})
