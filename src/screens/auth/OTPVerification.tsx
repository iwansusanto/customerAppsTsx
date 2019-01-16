import React, { createRef } from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ImageStyle,
  KeyboardAvoidingView,
  Alert
} from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom components used in the screen
import Text from "../../components/CustomText"
import SingleNumberInput from "../../components/SingleNumberInput"
import FixedButton from "../../components/FixedButton"
import strings from "../../components/language"
import Lang from '../../components/Lang'

// Configs
import metrics from "../../config/metrics"

// Actions
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    otp: Function
    changeUser: Function
  }
}

// State typing
interface State {
  isLoading: boolean
  otp: string
}

class OTPVerification extends React.Component<Props, State> {
  // Config for the header bar
  static navigationOptions: NavigationStackScreenOptions = {
    // Null because we don't use a header
    header: null,
    // Title just to name the screen
    title: "OTP"
  }

  // Initial state
  state = {
    isLoading: false,
    otp: ""
  }

  // Reference object for the text inputs
  hiddenInputRef = createRef<TextInput>()

  handleFormFocusChange = () => {
    // Focus to the next text input based on nextRef param
    if (this.hiddenInputRef.current) {
      this.hiddenInputRef.current.focus()
    }
  }


  handleOtpType = (text: string) => {
    this.setState({ otp: text })
  }

  handleLoginButtonPressed = () => async () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })

    const email = this.props.navigation.getParam("email")
    const password = this.props.navigation.getParam("password")
    const otp = this.state.otp

    this.props.user.otp({
      email,
      password,
      otp
    }, this._onSuccessOtp, this._onFailedOtp)
  }

  _onSuccessOtp = (data) => {
    this.setState({ isLoading: false })
    this.props.user.changeUser(data)
    
    if (data.success) {
        this.props.navigation.replace("Home", {
          inbox: strings.inboxTab,
          account: strings.accountTab,
          help: strings.helpTab,
          order: strings.ordersTab,
          home: strings.homeTab
        })
    }
  }

  _onFailedOtp  = (error) => {
    this.setState({ isLoading: false })
    Alert.alert("Failed", error.message)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image source={LOGO} style={styles.logo as ImageStyle} />
            <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
            <Lang styleLang={styles.caption} language='otpTitle'></Lang>
            <Lang styleLang={[styles.caption, { marginTop: 5 }]} language='otpInfo'></Lang>
            <TextInput
              style={{ height: 0 }}
              ref={this.hiddenInputRef}
              value={this.state.otp}
              onChangeText={this.handleOtpType}
              keyboardType={"numeric"}
              maxLength={4}
            />
            {/* <Text style={styles.email}>{this.props.navigation.getParam("email")}</Text> */}
            <Text style={styles.code}>{strings.otpEnterCode}</Text>
            <View style={styles.codeInputContainer}>
              <SingleNumberInput
                value={this.state.otp[0]}
                onPress={this.handleFormFocusChange}
              />
              <SingleNumberInput
                value={this.state.otp[1]}
                onPress={this.handleFormFocusChange}
              />
              <SingleNumberInput
                value={this.state.otp[2]}
                onPress={this.handleFormFocusChange}
              />
              <SingleNumberInput
                value={this.state.otp[3]}
                onPress={this.handleFormFocusChange}
              />
            </View>
            {/* <Text style={styles.resend}>Resend code in 00:30</Text>
              <Text style={styles.changeNumber}>CHANGE NUMBER</Text> */}
            <FixedButton
              isLoading={this.state.isLoading}
              label='login'
              backgroundColor={
                this.state.otp.length === 4
                  ? metrics.SECONDARY_COLOR
                  : metrics.INACTIVE_COLOR
              }
              onPress={this.handleLoginButtonPressed()}
            />
            <View style={styles.tosContainer}>
              <Lang styleLang={styles.caption} language='byRegister'></Lang>
              <Lang styleLang={styles.tos} language='byTos'></Lang>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: metrics.PRIMARY_COLOR,
    alignItems: "center"
  },

  overlay: {
    width: metrics.DEVICE_WIDTH,
    position: "absolute",
    bottom: 0,
    height: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.4
      : metrics.DEVICE_HEIGHT * 0.47
  },

  logo: {
    marginTop: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.2
      : metrics.DEVICE_HEIGHT * 0.1
  },

  caption: {
    fontSize: 16,
    color: "white",
    marginTop: 25
  },

  email: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },

  code: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 35
  },

  codeInputContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: metrics.DEVICE_WIDTH * 0.65
  },

  resend: {
    color: "white",
    fontSize: 16,
    marginTop: 30
  },

  changeNumber: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30
  },

  tosContainer: {
    alignItems: "center",
    marginTop: 10
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

export default connect(null, mapDispatchToProps)(OTPVerification)