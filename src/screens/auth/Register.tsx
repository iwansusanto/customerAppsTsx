import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom component used in the screen
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"

// Configs
import metrics from "../../config/metrics"

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")
const ICON_USER = require("../../../assets/ic_user.png")
const ICON_PHONE = require("../../../assets/ic_phone.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_KEY = require("../../../assets/ic_key.png")
const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class Register extends React.Component<Props, any> {
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
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this)
  }

  // Register button press handler
  handleRegisterButtonPressed(): void {
    // Navigate to OTP screen
    this.props.navigation.navigate("OTP")
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={OVERLAY} style={styles.overlay} />
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.title}>MAKE A NEW ACCOUNT</Text>
          <Text style={styles.caption}>FILL YOUR INFO AND GET STARTED</Text>
          <View style={styles.formContainer}>
            <CustomTextInput icon={ICON_USER} placeholder={"Name"} />
            <CustomTextInput
              icon={ICON_PHONE}
              placeholder={"Phone Number"}
              keyboardType={"number-pad"}
            />
            <CustomTextInput
              icon={ICON_MAIL}
              placeholder={"Email"}
              keyboardType={"email-address"}
            />
            <CustomTextInput
              icon={ICON_KEY}
              placeholder={"Password"}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.tosContainer}>
            <Text style={styles.caption}>By registering I agree to the</Text>
            <Text style={styles.tos}>Terms of Service and Privacy Policy</Text>
          </View>
          <FixedButton
            label={"REGISTER"}
            backgroundColor={metrics.SECONDARY_COLOR}
            onPress={this.handleRegisterButtonPressed}
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

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH
  },

  logo: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30
  },

  caption: {
    fontSize: 16,
    color: "white",
    fontWeight: "100",
    marginTop: 5
  },

  formContainer: {
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
