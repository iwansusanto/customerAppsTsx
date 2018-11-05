import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom components used in the screen
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"

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

export default class Login extends React.Component<Props, any> {
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

  // Constructor
  constructor(props: Props) {
    super(props)

    // Function binding to this class
    this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this)
  }

  // Login button press handler
  handleLoginButtonPressed(): void {
    // Navigate to OTP screen
    this.props.navigation.navigate("OTP")
  }

  render() {
    return (
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
          <CustomTextInput icon={ICON_MAIL} placeholder={"Email"} />
          <CustomTextInput icon={ICON_KEY} placeholder={"Password"} />
          <Text style={styles.forgot}>FORGOT PASSWORD</Text>
        </View>
        <FixedButton
          label={"LOGIN"}
          backgroundColor={metrics.SECONDARY_COLOR}
          onPress={this.handleLoginButtonPressed}
        />
      </View>
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
