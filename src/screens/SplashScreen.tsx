import React from "react"
import { Component } from "react"
import { StyleSheet, View, Image, AsyncStorage } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import metrics from "../config/metrics"
import withUserContext from "../components/consumers/withUserContext"
import strings from "../components/language"

const LOGO = require("../../assets/logo-higres.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    changeUser: Function
  }
}

class SplashScreen extends Component<Props, any> {
  constructor(props) {
    super(props)
  }
  
  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    return await strings.setLanguage(languageStore)
  }

  componentWillMount() {
    this._onSetLanguage()
  }

  async componentDidMount() {
    const dataJSONString = await AsyncStorage.getItem("user")
    const dataLanguage = await AsyncStorage.getItem('language')
    if (dataJSONString !== null && dataLanguage !== null) {
      const data = JSON.parse(dataJSONString)

      if (data !== null) {
        await this.props.user.changeUser(data)
        await console.log('hello', strings.inboxTab)
        await this.props.navigation.replace("Home", {
          inbox: strings.inboxTab,
          account: strings.accountTab,
          help: strings.helpTab,
          order: strings.ordersTab,
          home: strings.homeTab
        })
      } else {
        await this.props.navigation.replace("Welcome")
      }
    } else {
      await this.props.navigation.replace("Welcome")
    }
  }

  render() {
    console.log('tes token')
    return (
      <View style={styles.container}>
        <Image source={LOGO} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: metrics.PRIMARY_COLOR
  }
})

export default withUserContext(SplashScreen)
