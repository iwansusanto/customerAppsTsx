import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"
import { NavigationScreenProp } from "react-navigation"

const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  email: string
}

export default class Email extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.handleSendEmailButtonPressed = this.handleSendEmailButtonPressed.bind(this)
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this)
  }

  state = {
    email: ""
  }

  handleEmailInputChange(value: string): void {
    this.setState({ email: value })
  }

  handleSendEmailButtonPressed(): void {
    Alert.alert("Email was sent to", this.state.email, [
      {
        text: "OK",
        onPress: () => this.props.navigation.navigate("ChangePassword")
      }
    ])
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={OVERLAY} style={styles.overlay} />
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.subtitle}>RESET YOUR PASSWORD</Text>
          <Text style={styles.caption}>ENTER YOUR EMAIL ADDRESS</Text>
          <CustomTextInput
            icon={ICON_MAIL}
            placeholder={"Email"}
            keyboardType={"email-address"}
            style={styles.form}
            onChangeText={this.handleEmailInputChange}
          />
          <FixedButton
            backgroundColor={metrics.SECONDARY_COLOR}
            label={"SEND EMAIL"}
            onPress={this.handleSendEmailButtonPressed}
          />
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

  logo: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH
  },

  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },

  caption: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
    marginTop: 5
  },

  form: {
    marginTop: 50
  }
})
