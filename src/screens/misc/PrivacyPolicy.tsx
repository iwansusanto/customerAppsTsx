import React from "react"
import { ScrollView, StyleSheet, WebView, AsyncStorage, View, ActivityIndicator } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp} from "react-navigation"
import strings from "../../components/language"
import metrics from "../../config/metrics"
import Lang from "../../components/Lang"



const PRIVACY_HTML = require("../../../assets/privacy.html")

interface State {
  loading: boolean
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class PrivacyPolicy extends React.Component<Props, State> {

  state = {
    loading: true
  }

  static navigationOptions = () : NavigationStackScreenOptions => ({
    title: strings.accountPrivacyPolicy
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
      <View style={{flex: 1}}>
        <WebView 
          style={styles.container} 
          originWhitelist={['*']} 
          // source={{uri: 'https://mshwarapp.com/privacy-policy.html'}} 
          source={PRIVACY_HTML} 
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
