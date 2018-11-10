import React from "react"
import { Component } from "react"
import { StyleSheet, View, Image, AsyncStorage } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import metrics from "../config/metrics"
import withUserContext from "../components/consumers/withUserContext"

const LOGO = require("../../assets/logo-higres.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    user?: User
    changeUser: Function
  }
}

class SplashScreen extends Component<Props, any> {
  async componentDidMount() {
    const userJSONString = await AsyncStorage.getItem("user")
    if (userJSONString !== null) {
      const user = JSON.parse(userJSONString)

      if (user !== null) {
        await this.props.user.changeUser(user)
        console.log(this.props.user)
        this.props.navigation.replace("Home")
      } else {
        this.props.navigation.replace("Welcome")
      }
    } else {
      this.props.navigation.replace("Welcome")
    }
  }

  render() {
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
