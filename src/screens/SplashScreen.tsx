import React from "react"
import { Component } from "react"
import { StyleSheet, View, Image, AsyncStorage } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import metrics from "../config/metrics"
import withUserContext from "../components/consumers/withUserContext"
import strings from "../components/language"
import { keys } from '../config/keys'
import { setData, getData } from '../utils/storage'

// Actions
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'

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
    const languageStore = await getData(keys.language)
    return await strings.setLanguage(languageStore)
  }

  componentWillMount() {
    this._onSetLanguage()
  }

  async componentDidMount() {
    const dataJSONString = await getData(keys.user)
    console.log('splash screen : ', dataJSONString)
    // this.props.navigation.replace('Welcome')

    if (dataJSONString !== null) {
      const data = await JSON.parse(dataJSONString)
      console.log('data json', data)

      if (data !== null) {
        await this.props.user.changeUser(data)
        console.log('hello', strings.inboxTab)
        // this.props.navigation.navigate('Login')
        await this.props.navigation.replace("Home", {
          inbox: strings.inboxTab,
          account: strings.accountTab,
          help: strings.helpTab,
          order: strings.ordersTab,
          home: strings.homeTab
        })
      } else {
        console.log('bb')
        await this.props.navigation.replace("Welcome")
      }
    } else {
      console.log('aa')
      await this.props.navigation.replace("Welcome")
    }
  }

  render() {
    console.log('tes token', this.props)
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

const mapStateToProps = ({ user, register }) => {
  const { users } = user;
  // const {users1} = register
  // console.log('state users1', users1)
  return {
    users
  }       
}

const mapDispatchToProps = (dispatch) => {
  return  {
    user: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
