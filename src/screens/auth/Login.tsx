import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageStyle,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"

// Custom components used in the screen
import withUserContext from "../../components/consumers/withUserContext"
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"

import UserContext from "../../contexts/UserContext"
import strings from "../../components/language"
import Lang from "../../components/Lang"

// Configs
import metrics from "../../config/metrics"

// Assets
const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_KEY = require("../../../assets/ic_key.png")
const LOGO = require("../../../assets/logo-higres.png")
const OVERLAY = require("../../../assets/overlay-login.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  email: string
  password: string
  isLoading: boolean
}

class Login extends React.Component<Props, State> {
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
    email: "",
    password: "",
    isLoading: false
  }

  // Constructor
  constructor(props: Props) {
    super(props)

    // Function binding to this class
    this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this)
    this.handleForgetPasswordPressed = this.handleForgetPasswordPressed.bind(
      this
    )
  }

  // Login button press handler
  handleLoginButtonPressed = (login: Function) => async () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })

    const { email, password } = this.state

    const result = await login({
      email,
      password
    })

    this.setState({ isLoading: false })

    if (result) {
      // this.props.navigation.navigate("OTP", {
      //   email,
      //   password
      // })
      this.props.navigation.replace("Home", {
        inbox: strings.inboxTab,
        account: strings.accountTab,
        help: strings.helpTab,
        order: strings.ordersTab,
        home: strings.homeTab
      })
    } else {
      // TODO: show login failed
      Alert.alert("Failed", "Login failed, please try again")
    }
  }

  // Forget password press handlre
  handleForgetPasswordPressed(): void {
    // Navigate to change password screen
    this.props.navigation.navigate("Email")
  }

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Image source={LOGO} style={styles.logo as ImageStyle} />
                <Image
                  source={OVERLAY}
                  style={styles.overlay as ImageStyle}
                  resizeMode={"contain"}
                />
                <View style={styles.welcomeMessageContainer}>
                  <Lang
                    styleLang={[styles.welcomeMessage, { fontSize: 18 }]}
                    language="loginTitle"
                  />
                  <Lang
                    styleLang={[styles.welcomeMessage, { fontSize: 16 }]}
                    language="loginTagline"
                  />
                </View>
                <View style={styles.formContainer}>
                  <CustomTextInput
                    icon={ICON_MAIL}
                    placeholder="loginEmail"
                    keyboardType={"email-address"}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ email: text })}
                  />
                  <CustomTextInput
                    icon={ICON_KEY}
                    placeholder="loginPassword"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                  />
                  <Lang
                    styleLang={styles.forgot}
                    // not done yet
                    // onPress={this.handleForgetPasswordPressed}
                    language="loginForgotPass"
                  />
                </View>
                <FixedButton
                  isLoading={this.state.isLoading}
                  label={strings.login}
                  backgroundColor={
                    this.state.email.length > 0 &&
                    this.state.password.length > 0
                      ? metrics.SECONDARY_COLOR
                      : metrics.INACTIVE_COLOR
                  }
                  onPress={this.handleLoginButtonPressed(context.login)}
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
    alignItems: "center",
    backgroundColor: metrics.PRIMARY_COLOR
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
      ? metrics.DEVICE_HEIGHT * 0.15
      : metrics.DEVICE_HEIGHT * 0.05
  },

  welcomeMessageContainer: {
    marginTop: 20,
    alignItems: "center"
  },

  welcomeMessage: {
    color: "white",
    marginTop: 5
  },

  formContainer: {
    marginTop: 30
  },

  forgot: {
    color: "#FF0033",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20
  }
})

export default withUserContext(Login)
