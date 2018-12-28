import React from "react"
import { ScrollView, StyleSheet, WebView, View, ActivityIndicator } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"
import metrics from "../../config/metrics";

const TOS_HTML = require("../../../assets/tos.html")

interface State {
  loading: boolean
}

export default class Terms extends React.Component<any, State> {
  
  state = {
    loading: true
  }

  static navigationOptions: NavigationStackScreenOptions = {
    title: "Mshwar Terms and Conditions"
  }

  render() {
    return (
      // <ScrollView style={styles.container}>
      //   <Text>
      //   Mshwar Company ("we," "our" or "Mshwar") is committed to protecting the privacy of all visitors to our website Mshwarapp.com and all visitors who access our website or services through any mobile application (together, "Website"). Please read the following privacy policy which explains how we use and protect your information.
      //   </Text>
      // </ScrollView>
      <View style={{flex: 1}}>
        <WebView 
          style={styles.container} 
          originWhitelist={['*']} 
          source={TOS_HTML} 
          // source={{uri: 'https://mshwarapp.com/privacy-policy.html'}} 
          scalesPageToFit={false} 
          onLoad={() => this.setState({loading: false})}
        />
        {this.state.loading && (
          <ActivityIndicator
            style={{ position: "absolute", top: metrics.DEVICE_HEIGHT / 2, left: metrics.DEVICE_WIDTH / 2 }}
            size="large"
          />
        )}
      </View>
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
