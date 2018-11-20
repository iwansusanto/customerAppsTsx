import React, { createRef } from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ImageStyle,
  KeyboardAvoidingView
} from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom components used in the screen
import Text from "../../components/CustomText"
import SingleNumberInput from "../../components/SingleNumberInput"
import FixedButton from "../../components/FixedButton"

import UserContext from "../../contexts/UserContext"

// Configs
import metrics from "../../config/metrics"

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

// State typing
interface State {
  isLoading: boolean
  otp: string
}

export default class OTPVerification extends React.Component<Props, State> {
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

  handleLoginButtonPressed = (otp: Function) => async () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })

    const email = this.props.navigation.getParam("email")
    const password = this.props.navigation.getParam("password")

    const result = await otp({
      email,
      password,
      otp: this.state.otp
    })

    this.setState({ isLoading: false })

    if (result) {
      this.props.navigation.replace("Home")
    } else {
      // TODO: show otp failed
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Image source={LOGO} style={styles.logo as ImageStyle} />
                <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
                <Text style={styles.caption}>Email verification has been sent</Text>
                <Text style={[styles.caption, { marginTop: 5 }]}>to your email</Text>
                <TextInput
                  style={{ height: 0 }}
                  ref={this.hiddenInputRef}
                  value={this.state.otp}
                  onChangeText={this.handleOtpType}
                  keyboardType={"numeric"}
                  maxLength={4}
                />
                {/* <Text style={styles.email}>{this.props.navigation.getParam("email")}</Text> */}
                <Text style={styles.code}>ENTER CODE</Text>
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
                  label={"LOGIN"}
                  backgroundColor={
                    this.state.otp.length === 4
                      ? metrics.SECONDARY_COLOR
                      : metrics.INACTIVE_COLOR
                  }
                  onPress={this.handleLoginButtonPressed(context.otp)}
                />
                <View style={styles.tosContainer}>
                  <Text style={styles.caption}>By registering I agree to the</Text>
                  <Text style={styles.tos}>Terms of Service and Privacy Policy</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
      </UserContext.Consumer>
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
    marginTop: 30
  },

  tos: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
})
