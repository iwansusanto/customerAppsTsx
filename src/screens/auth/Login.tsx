import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import metrics from "../../config/metrics"
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"

const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_KEY = require("../../../assets/ic_key.png")
const LOGO = require("../../../assets/logo-higres.png")
const OVERLAY = require("../../../assets/overlay-login.png")

export default class Login extends React.Component {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<any, any>
  }): NavigationStackScreenOptions => {
    const { navigate, goBack } = navigation
    return {
      title: "",
      headerTitle: undefined,
      headerRight: (
        <TouchableOpacity>
          <Image source={ICON_HELP} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Image source={ICON_BACK} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      )
    }
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
        <CustomButton label={"LOGIN"} backgroundColor={"#FFCC00"} />
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
