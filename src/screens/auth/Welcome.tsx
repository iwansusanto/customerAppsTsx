import React from "react"
import { View, StyleSheet, Image, ImageStyle, AsyncStorage } from "react-native"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"

// Custom component used in the screen
import Text from "../../components/CustomText"
import CustomButton from "../../components/CustomButton"
import strings from "../../components/language"
import Lang from "../../components/Lang"

// Configs
import metrics from "../../config/metrics"
import { lang } from "moment"

// Assets
const LOGO = require("../../../assets/logo-higres.png")
const ICON_FB = require("../../../assets/ic_facebook.png")
const OVERLAY = require("../../../assets/overlay-login.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
  user: UserContext
}

export default class Welcome extends React.Component<Props, any> {
  // Config for the header bar
  static navigationOptions: NavigationStackScreenOptions = {
    // Null because we don't use a header
    header: null,
    // Title just to name the screen
    title: "Welcome"
  }

  // Constructor
  constructor(props: Props) {
    super(props)

    // Function binding to this class
    this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this)
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(
      this
    )
  }

  // Login button press handler
  handleLoginButtonPressed(): void {
    // Navigate to login screen
    this.props.navigation.navigate("Login")
  }

  // Register button press handler
  handleRegisterButtonPressed(): void {
    // Navigate to register screen
    this.props.navigation.navigate("Register")
  }

  render() {
    console.log("props welcome", strings.loginGreetings)
    return (
      <View style={styles.container}>
        <Image source={LOGO} style={styles.logo as ImageStyle} />
        <Image
          source={OVERLAY}
          style={styles.overlay as ImageStyle}
          resizeMode={"contain"}
        />
        <Lang styleLang={styles.title} language="loginGreetings" />
        <Lang styleLang={styles.caption} language="tagLine" />
        <View style={styles.defaultAuthButtonContainer}>
          <CustomButton
            label='login'
            style={styles.defaultAuthButton}
            onPress={this.handleLoginButtonPressed}
          />
          <CustomButton
            label='register'
            style={styles.defaultAuthButton}
            onPress={this.handleRegisterButtonPressed}
          />
        </View>
        {/* <CustomButton
          label={"LOGIN WITH FACEBOOK"}
          labelStyle={styles.facebookAuthLabel}
          style={styles.facebookAuthButton}
          icon={ICON_FB}
        /> */}
        <View style={styles.tosContainer}>
          <Lang styleLang={styles.caption} language="byRegister" />
          <Lang styleLang={styles.tos} language="byTos" />
        </View>
      </View>
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
      ? metrics.DEVICE_HEIGHT * 0.25
      : metrics.DEVICE_HEIGHT * 0.15
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20
  },

  caption: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    marginTop: 5
  },

  defaultAuthButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: metrics.DEVICE_WIDTH * 0.6,
    marginTop: 50
  },

  defaultAuthButton: {
    backgroundColor: metrics.SECONDARY_COLOR,
    width: metrics.DEVICE_WIDTH * 0.25
  },

  facebookAuthLabel: {
    color: "white",
    fontSize: 16
  },

  facebookAuthButton: {
    backgroundColor: metrics.FACEBOOK_COLOR,
    padding: 10,
    marginTop: 20
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.4
      : metrics.DEVICE_HEIGHT * 0.47
  },

  tosContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 30
  },

  tos: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
})
