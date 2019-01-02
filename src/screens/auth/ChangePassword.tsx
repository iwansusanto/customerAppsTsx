import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageStyle,
  AsyncStorage
} from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"

// Custom component used in the screen
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"
import strings from "../../components/language"
import Lang from "../../components/Lang"



// Configs
import metrics from "../../config/metrics"

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")
const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")
const ICON_KEY = require("../../../assets/ic_key.png")

export default class ChangePassword extends React.Component {
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
          <Image source={LOGO} style={styles.logo as ImageStyle} />
          <Lang styleLang={styles.title} language='forgotPassTitle'></Lang>
          <View style={styles.formContainer}>
            <CustomTextInput
              icon={ICON_KEY}
              // placeholder='forgotPassNew'
              placeholder={strings.forgotPassNew}
              secureTextEntry={true}
            />
            <CustomTextInput
              icon={ICON_KEY}
              // placeholder='forgotPassVerify'
              placeholder={strings.forgotPassVerify}
              secureTextEntry={true}
            />
          </View>
          <FixedButton backgroundColor={metrics.SECONDARY_COLOR} label='forgotPassChange'/>
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
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X       ? metrics.DEVICE_HEIGHT * 0.4       : metrics.DEVICE_HEIGHT * 0.47
  },

  logo: {
    marginTop: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.15
      : metrics.DEVICE_HEIGHT * 0.05
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 30
  },

  formContainer: {
    marginTop: 30
  }
})
