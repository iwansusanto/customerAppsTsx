import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  ImageStyle,
  AsyncStorage
} from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"
import api from "../../utils/api"

import { NavigationScreenProp } from "react-navigation"
import UserContext from "../../contexts/UserContext"
import strings from "../../components/language"
import Lang from "../../components/Lang"

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
    this.handleSendEmailButtonPressed = this.handleSendEmailButtonPressed.bind(
      this
    )
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this)
  }

  state = {
    email: ""
  }

  handleEmailInputChange(value: string): void {
    this.setState({ email: value })
  }

  async handleSendEmailButtonPressed(): Promise<void> {
    try {
      const { data } = await api.client.post("/reset_password", {
        email: this.state.email
      })
    } catch (err) {
      Alert.alert("Error", err.message)
    }
    Alert.alert("Email was sent to", this.state.email, [
      {
        text: "OK",
        onPress: () => this.props.navigation.goBack()
      }
    ])
  }

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
                <Image source={LOGO} style={styles.logo as ImageStyle} />
                <Lang styleLang={styles.subtitle} language="resetPassTitle" />
                <Lang styleLang={styles.caption} language="resetPassInfo" />
                <CustomTextInput
                  icon={ICON_MAIL}
                  // placeholder='loginEmail'
                  placeholder={strings.loginEmail}
                  keyboardType={"email-address"}
                  style={styles.form}
                  onChangeText={this.handleEmailInputChange}
                />
                <FixedButton
                  backgroundColor={
                    this.state.email.length > 0
                      ? metrics.SECONDARY_COLOR
                      : metrics.INACTIVE_COLOR
                  }
                  // label='resetPassSend'
                  label={strings.resetPassSend}
                  onPress={this.handleSendEmailButtonPressed}
                />
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

  logo: {
    marginTop: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.15
      : metrics.DEVICE_HEIGHT * 0.05
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.4
      : metrics.DEVICE_HEIGHT * 0.47
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
