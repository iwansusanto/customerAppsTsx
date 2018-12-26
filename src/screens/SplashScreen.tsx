import React from "react"
import { Component } from "react"
import { StyleSheet, View, Image, AsyncStorage } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import metrics from "../config/metrics"
import withUserContext from "../components/consumers/withUserContext"
import api from '../api'

const LOGO = require("../../assets/logo-higres.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    changeUser: Function
  }
}

class SplashScreen extends Component<Props, any> {
  async componentDidMount() {
    const dataJSONString = await AsyncStorage.getItem("user")
    const dataLanguage = await AsyncStorage.getItem('language')
    if (dataJSONString !== null && dataLanguage !== null) {
      const data = JSON.parse(dataJSONString)

      if (data !== null) {
        await this.props.user.changeUser(data)
        console.log('hello', this.props.user)
        this.props.navigation.replace("Home")
      } else {
        this.props.navigation.replace("Welcome")
      }
    } else {
      this.props.navigation.replace("Welcome")
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
