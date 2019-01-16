import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageStyle,
  Alert,
  Animated,
  Dimensions
} from "react-native"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"
import strings from "../../components/language"
import Lang from "../../components/Lang"

// Custom component used in the screen
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"

// Configs
import metrics from "../../config/metrics"

// Actions
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")
const ICON_USER = require("../../../assets/ic_user.png")
const ICON_PHONE = require("../../../assets/ic_phone.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_KEY = require("../../../assets/ic_key.png")
const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")

const window = Dimensions.get("window")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    register: Function
  }
}

interface State {
  isLoading: boolean
  email: string
  password: string
  name: string
  phone: string
  countryCode: string
  countryPhoneCode: string
  animation: any
  animationPosition: any
  keyboardShowed: boolean
}

class Register extends React.Component<Props, State> {
  // Config for the header bar
  static navigationOptions = ({
    // Navigation variable to be able to call navigation-related functions in the header
    navigation
  }: {
    // Navigation variable type
    navigation: NavigationScreenProp<any, any>
  }): NavigationStackScreenOptions => {
    // Destructuring functions inside navigation object for easy use
    const { navigate, goBack } = navigation
    return {
      title: "",
      headerTitle: undefined,

      // Component rendered in the right side of the header which is a help button
      headerRight: (
        <TouchableOpacity>
          {/* <Image source={ICON_HELP} style={{ marginRight: 20 }} /> */}
        </TouchableOpacity>
      ),

      // Component rendered in the left side of the header which is a back button
      headerLeft: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Image source={ICON_BACK} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      )
    }
  }

  state = {
    isLoading: false,
    email: "",
    password: "",
    phone: "",
    name: "",
    countryCode: "QA",
    countryPhoneCode: "+974",
    animation: new Animated.Value(0),
    animationPosition: new Animated.Value(0),
    keyboardShowed: false
  }

  // Constructor
  constructor(props: Props) {
    super(props)

    // Function binding to this class
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this)
  }

  keyboardHeight = () => {
    new Animated.Value(0)
  }

  componentWillMount() {
    Keyboard.addListener("keyboardWillShow", this.keyboardWillShow)
    Keyboard.addListener("keyboardWillHide", this.keyboardWillHide)
  }

  componentWillUnmount() {
    Keyboard.addListener("keyboardWillShow", this.keyboardWillShow).remove()
    Keyboard.addListener("keyboardWillHide", this.keyboardWillHide).remove()
  }
  // keyboardHeigh: () => void

  keyboardWillShow = (event: any) => {
    this.setState({ keyboardShowed: !this.state.keyboardShowed })
    if (event.startCoordinates.screenY < event.endCoordinates.height * 3) {
      Animated.parallel([
        Animated.timing(this.state.animation, {
          duration: event.duration,
          toValue: 0
        }),
        Animated.timing(this.state.animationPosition, {
          duration: event.duration,
          toValue: window.height - (event.endCoordinates.screenY + 250)
        })
      ]).start()
    }
  }

  keyboardWillHide = (event: any) => {
    this.setState({ keyboardShowed: !this.state.keyboardShowed })
    Animated.parallel([
      Animated.timing(this.state.animation, {
        duration: event.duration,
        toValue: 0
      }),
      Animated.timing(this.state.animationPosition, {
        duration: event.duration,
        toValue: 0
      })
    ]).start()
  }

  // Register button press handler
  handleRegisterButtonPressed = () => async () => {
    if (this.state.isLoading) return

    await this.setState({ isLoading: true })
    let { email, password, phone, name } = this.state
    phone = `${this.state.countryPhoneCode}${this.state.phone}`

    // validate email address
    if(email.length > 0 && !this._validateEmail(email)) {
      await this.setState({ isLoading: false })
      return Alert.alert("Error", 'Email not valid')
    }

    this.props.user.register({
      email,
      password,
      name,
      phone
    }, this._onSuccessRegister, this._onErrorRegister)
  }

  _onSuccessRegister = (data) => {
    this.setState({ isLoading: false })
    let { email, password } = this.state

    if(data.success) {
      this.props.navigation.navigate("OTP", {
            email,
            password
      })
    }
  }

  _onErrorRegister = (error) => {  
    this.setState({ isLoading: false })
    Alert.alert("Failed", error.message)
  }

  setCountry = (countryCode: string, countryPhoneCode: string) => {
    this.setState({
      countryCode: countryCode,
      countryPhoneCode: countryPhoneCode
    })
  }

  scroll: any

  handleKeyboardAppeared() {
    this.scroll.props.scrollToPosition(0, 100, true)
  }

  _validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(text)
  }

  render() {
    const { email, password, phone, name } = this.state
    return (
      <Animated.View
            style={[styles.container, { paddingBottom: this.state.animation }]}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Animated.View
                  style={[
                    styles.container,
                    { bottom: this.state.animationPosition }
                  ]}
                >
                  <Image
                    source={OVERLAY}
                    style={styles.overlay as ImageStyle}
                  />
                  <Image source={LOGO} style={styles.logo as ImageStyle} />
                  <Lang styleLang={styles.title} language="registerTitle" />
                  <Lang styleLang={styles.caption} language="registerInfo" />
                  <View style={styles.formContainer}>
                    <CustomTextInput
                      icon={ICON_USER}
                      // placeholder='registerName'
                      placeholder={strings.registerName}
                      onChangeText={text => this.setState({ name: text })}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          width: metrics.DEVICE_WIDTH * 0.17,
                          height: 45,
                          backgroundColor: "white",
                          borderRadius: 5,
                          marginVertical: 5,
                          marginRight: metrics.DEVICE_WIDTH * 0.03,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        onPress={() =>
                          this.props.navigation.navigate("CountrySelect", {
                            onSelect: this.setCountry
                          })
                        }
                      >
                        <Image
                          source={{
                            uri: `https://www.countryflags.io/${
                              this.state.countryCode
                            }/flat/64.png`
                          }}
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity>
                      <CustomTextInput
                        style={{ width: metrics.DEVICE_WIDTH * 0.6 }}
                        icon={ICON_PHONE}
                        placeholder={strings.registerPhone}
                        keyboardType={"number-pad"}
                        onChangeText={text => this.setState({ phone: text.replace(/[^0-9]/g, '') })}
                        value={this.state.phone}
                      />
                    </View>
                    <CustomTextInput
                      icon={ICON_MAIL}
                      placeholder={strings.registerEmail}
                      keyboardType={"email-address"}
                      autoCapitalize="none"
                      onChangeText={text => this.setState({ email: text })}
                      value={this.state.email}
                    />
                    <CustomTextInput
                      icon={ICON_KEY}
                      placeholder={strings.registerPassword}
                      secureTextEntry={true}
                      onChangeText={text => this.setState({ password: text })}
                    />
                  </View>
                  <View style={styles.tosContainer}>
                    <Lang styleLang={styles.tos} language="byTos" />
                  </View>
                  <FixedButton
                    isLoading={this.state.isLoading}
                    label='register'
                    backgroundColor={
                      email.length > 0 &&
                      password.length > 0 &&
                      phone.length > 0 &&
                      name.length > 0
                        ? metrics.SECONDARY_COLOR
                        : metrics.INACTIVE_COLOR
                    }
                    onPress={this.handleRegisterButtonPressed()}
                  />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: metrics.PRIMARY_COLOR,
    alignItems: "center",
    flex: 1
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.4
      : metrics.DEVICE_HEIGHT * 0.47
  },

  logo: {
    marginTop: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.15
      : metrics.DEVICE_HEIGHT * 0.05
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30
  },

  caption: {
    fontSize: 16,
    color: "white",
    fontWeight: "300",
    marginTop: 5
  },

  formContainer: {
    marginTop: 30
  },

  tosContainer: {
    alignItems: "center",
    marginTop: 50
  },

  tos: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
})


const mapDispatchToProps = (dispatch) => {
  return {
      user: bindActionCreators(userActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Register)


