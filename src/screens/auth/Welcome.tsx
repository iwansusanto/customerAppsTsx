import React from "react"
import { View, StyleSheet, Image } from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom component used in the screen
import Text from "../../components/CustomText"
import CustomButton from "../../components/CustomButton"

// Configs
import metrics from "../../config/metrics"

// Assets
const LOGO = require("../../../assets/logo-higres.png")
const ICON_FB = require("../../../assets/ic_facebook.png")
const OVERLAY = require("../../../assets/overlay-login.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
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
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this)
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
    return (
      <View style={styles.container}>
        <Image source={LOGO} style={styles.logo} />
        <Image source={OVERLAY} style={styles.overlay} />
        <Text style={styles.title}>WELCOME TO MSHWAR APP</Text>
        <Text style={styles.caption}>WE TAKE YOUR ORDER RESPONSIBLY</Text>
        <View style={styles.defaultAuthButtonContainer}>
          <CustomButton
            label={"LOGIN"}
            style={styles.defaultAuthButton}
            onPress={this.handleLoginButtonPressed}
          />
          <CustomButton
            label={"REGISTER"}
            style={styles.defaultAuthButton}
            onPress={this.handleRegisterButtonPressed}
          />
        </View>
        <CustomButton
          label={"LOGIN WITH FACEBOOK"}
          labelStyle={styles.facebookAuthLabel}
          style={styles.facebookAuthButton}
          icon={ICON_FB}
        />
        <View style={styles.tosContainer}>
          <Text style={styles.caption}>By registering I agree to the</Text>
          <Text style={styles.tos}>Terms of Service and Privacy Policy</Text>
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
    marginTop: metrics.DEVICE_HEIGHT * 0.15
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
    fontWeight: "100",
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
    width: metrics.DEVICE_WIDTH * 0.6,
    marginTop: 20
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH
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
