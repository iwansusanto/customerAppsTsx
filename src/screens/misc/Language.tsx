import React from "react"
import { ScrollView, StyleSheet, Text} from "react-native"

import { NavigationStackScreenOptions } from "react-navigation"

// const TOS_HTML = require("../../../assets/privacy.html")

export default class Language extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Mshwar Language"
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>
        Mshwar Company ("we," "our" or "Mshwar") is committed to protecting the privacy of all visitors to our website Mshwarapp.com and all visitors who access our website or services through any mobile application (together, "Website"). Please read the following privacy policy which explains how we use and protect your information.
        </Text>
      </ScrollView>
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
