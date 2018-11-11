import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from "react-native"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"

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
  digitOne: string
  digitTwo: string
  digitThree: string
  digitFour: string
  isLoading: boolean
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
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    isLoading: false
  }

  componentDidMount() {
    this.formRef["digitOne"].focus()
  }

  // Reference object for the text inputs
  private formRef: any = {}

  // @param nextRef: string - Used to determine the next text input to focus
  // @param value: string - Value of the text input to pass into screen state
  handleFormFocusChange(nextRef: string, value: string): void {
    // Set the state of every text inputs according to value entered
    // From the nextRef param, we can determine the current text input to set its state into
    switch (nextRef) {
      case "digitTwo":
        this.setState({ digitOne: value })
        break
      case "digitThree":
        this.setState({ digitTwo: value })
        break
      case "digitFour":
        this.setState({ digitThree: value })
        break
      case "close":
        this.setState({ digitFour: value })

        // Dismiss the keyboard in the last text input for convenience
        Keyboard.dismiss()
        // Return because we don't want to call focus method below
        return
    }

    // Focus to the next text input based on nextRef param
    this.formRef[nextRef].focus()
  }

  handleLoginButtonPressed = (otp: Function) => async () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })

    const email = this.props.navigation.getParam("email")
    const password = this.props.navigation.getParam("password")
    const { digitOne, digitTwo, digitThree, digitFour } = this.state

    const result = await otp({
      email,
      password,
      otp: `${digitOne}${digitTwo}${digitThree}${digitFour}`
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Image source={LOGO} style={styles.logo} />
              <Image source={OVERLAY} style={styles.overlay} />
              <Text style={styles.caption}>
                Email verification has been sent to
              </Text>
              <Text style={styles.email}>adipramudya@hotmail.com</Text>
              <Text style={styles.code}>ENTER CODE</Text>
              <View style={styles.codeInputContainer}>
                <SingleNumberInput
                  ref={(ref: any) => (this.formRef["digitOne"] = ref)}
                  onChangeText={this.handleFormFocusChange.bind(
                    this,
                    "digitTwo"
                  )}
                />
                <SingleNumberInput
                  ref={(ref: any) => (this.formRef["digitTwo"] = ref)}
                  onChangeText={this.handleFormFocusChange.bind(
                    this,
                    "digitThree"
                  )}
                />
                <SingleNumberInput
                  ref={(ref: any) => (this.formRef["digitThree"] = ref)}
                  onChangeText={this.handleFormFocusChange.bind(
                    this,
                    "digitFour"
                  )}
                />
                <SingleNumberInput
                  ref={(ref: any) => (this.formRef["digitFour"] = ref)}
                  onChangeText={this.handleFormFocusChange.bind(this, "close")}
                />
              </View>
              <Text style={styles.resend}>Resend code in 00:30</Text>
              <Text style={styles.changeNumber}>CHANGE NUMBER</Text>
              <FixedButton
                isLoading={this.state.isLoading}
                label={"LOGIN"}
                backgroundColor={metrics.SECONDARY_COLOR}
                onPress={this.handleLoginButtonPressed(context.otp)}
              />
              <View style={styles.tosContainer}>
                <Text style={styles.caption}>
                  By registering I agree to the
                </Text>
                <Text style={styles.tos}>
                  Terms of Service and Privacy Policy
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    bottom: 0
  },

  logo: {
    marginTop: metrics.DEVICE_HEIGHT * 0.1
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
    position: "absolute",
    bottom: 65
  },

  tos: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
})
