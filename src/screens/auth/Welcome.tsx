import React from "react"
import { View, StyleSheet, Image } from "react-native"
import Text from "../../components/CustomText"

import metrics from "../../config/metrics"
import { NavigationStackScreenOptions } from "react-navigation"
import CustomButton from "../../components/CustomButton"

const LOGO = require("../../../assets/logo-higres.png")
const ICON_FB = require("../../../assets/ic_facebook.png")
const OVERLAY = require("../../../assets/overlay-login.png")

export default class Welcome extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null,
    title: "Welcome"
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={LOGO} style={styles.logo} />
        <Image source={OVERLAY} style={styles.overlay} />
        <Text style={styles.title}>WELCOME TO MSHWAR APP</Text>
        <Text style={styles.caption}>WE TAKE YOUR ORDER RESPONSIBLY</Text>
        <View style={styles.defaultAuthButtonContainer}>
          <CustomButton label={"LOGIN"} style={styles.defaultAuthButton} />
          <CustomButton label={"REGISTER"} style={styles.defaultAuthButton} />
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
