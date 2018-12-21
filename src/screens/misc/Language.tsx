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
        Mshwar Company
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
