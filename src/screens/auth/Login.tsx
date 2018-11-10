import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
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
          <Image source={ICON_HELP} style={{ marginRight: 20 }} />
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
      this.props.navigation.navigate("OTP", {
        email,
        password
      })
    } else {
      // TODO: show login failed
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Image source={LOGO} style={styles.logo} />
              <Image source={OVERLAY} style={styles.overlay} />
              <View style={styles.welcomeMessageContainer}>
                <Text style={[styles.welcomeMessage, { fontSize: 18 }]}>
                  ENTER YOUR ACCOUNT
                </Text>
                <Text style={[styles.welcomeMessage, { fontSize: 16 }]}>
                  LET US DO THE REST
                </Text>
              </View>
              <View style={styles.formContainer}>
                <CustomTextInput
                  icon={ICON_MAIL}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  autoCapitalize="none"
                  onChangeText={text => this.setState({ email: text })}
                />
                <CustomTextInput
                  icon={ICON_KEY}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
                <Text
                  style={styles.forgot}
                  onPress={this.handleForgetPasswordPressed}
                >
                  FORGOT PASSWORD
                </Text>
              </View>
              <FixedButton
                isLoading={this.state.isLoading}
                label={"LOGIN"}
                backgroundColor={metrics.SECONDARY_COLOR}
                onPress={this.handleLoginButtonPressed(context.login)}
              />
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
    alignItems: "center",
    backgroundColor: metrics.PRIMARY_COLOR
  },

  overlay: {
    width: metrics.DEVICE_WIDTH,
    position: "absolute",
    bottom: 0
  },

  logo: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05
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
