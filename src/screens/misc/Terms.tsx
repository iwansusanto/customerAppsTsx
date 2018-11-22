import React from "react"
import { ScrollView, StyleSheet,View,WebView } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"

export default class Terms extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Mshwar Terms of Service"
  }

  render() {
    var htmlCode = "<b>I am rendered in a <i>WebView</i></b>";
    return (
      <ScrollView style={styles.container}>
        <View style = {{
    justifyContent: 'center',
    alignItems: 'center'}} >
          <Text style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
          Welcome to Mshwarapp.com website and applications (each our "Service"). This page (together with the documents referred to on it) tells you the terms and conditions on which our partner restaurants supply any of their meals (the "Meals") listed on our site to you. Please read these terms and conditions carefully before ordering any Meals from our applications. By accessing our website and placing an order, you agreed to be bound by these terms and conditions and our terms of use policy.
          </Text>
        </View>
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
