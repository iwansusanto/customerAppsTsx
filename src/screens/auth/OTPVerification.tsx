import React, { createRef } from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from "react-native"
import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import { NavigationStackScreenOptions } from "react-navigation"
import SingleNumberInput from "../../components/SingleNumberInput"
import FixedButton from "../../components/FixedButton"

const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")

interface State {
  digitOne: string
  digitTwo: string
  digitThree: string
  digitFour: string
}

export default class OTPVerification extends React.Component<any, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null,
    title: "OTP"
  }

  state = {
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: ""
  }

  private formRef: any = {}

  handleFormFocusChange(refName: string, value: string): void {
    switch (refName) {
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
        Keyboard.dismiss()
        break
    }
    this.formRef[refName].focus()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={LOGO} style={styles.logo} />
          <Image source={OVERLAY} style={styles.overlay} />
          <Text style={styles.caption}>Email verification has been sent to</Text>
          <Text style={styles.email}>adipramudya@hotmail.com</Text>
          <Text style={styles.code}>ENTER CODE</Text>
          <View style={styles.codeInputContainer}>
            <SingleNumberInput
              ref={(ref: any) => (this.formRef["digitOne"] = ref)}
              onChangeText={this.handleFormFocusChange.bind(this, "digitTwo")}
            />
            <SingleNumberInput
              ref={(ref: any) => (this.formRef["digitTwo"] = ref)}
              onChangeText={this.handleFormFocusChange.bind(this, "digitThree")}
            />
            <SingleNumberInput
              ref={(ref: any) => (this.formRef["digitThree"] = ref)}
              onChangeText={this.handleFormFocusChange.bind(this, "digitFour")}
            />
            <SingleNumberInput
              ref={(ref: any) => (this.formRef["digitFour"] = ref)}
              onChangeText={this.handleFormFocusChange.bind(this, "close")}
            />
          </View>
          <Text style={styles.resend}>Resend code in 00:30</Text>
          <Text style={styles.changeNumber}>CHANGE NUMBER</Text>
          <FixedButton label={"LOGIN"} backgroundColor={metrics.SECONDARY_COLOR} />
          <View style={styles.tosContainer}>
            <Text style={styles.caption}>By registering I agree to the</Text>
            <Text style={styles.tos}>Terms of Service and Privacy Policy</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
