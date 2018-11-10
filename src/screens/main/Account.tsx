import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, Button } from "react-native"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import HeaderOverlay from "../../components/HeaderOverlay"
import CustomButton from "../../components/CustomButton"

const ICON_ACTIVE = require("../../../assets/ic_account_active.png")
const ICON_INACTIVE = require("../../../assets/ic_account_inactive.png")
const ICON_FB = require("../../../assets/ic_facebook.png")
const ICON_POINT = require("../../../assets/point.png")
const PICTURE = require("../../../assets/dummy_profile.png")

export default class Account extends React.Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: "Account",
    tabBarIcon: ({ focused }) => {
      switch (focused) {
        case true:
          return (
            <Image
              source={ICON_ACTIVE}
              style={metrics.TAB_BAR_ICON_STYLE}
              resizeMode={"contain"}
            />
          )
        case false:
          return (
            <Image
              source={ICON_INACTIVE}
              style={metrics.TAB_BAR_ICON_STYLE}
              resizeMode={"contain"}
            />
          )
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>View your information</Text>
        <View style={styles.profileContainer}>
          <View style={styles.detailContainer}>
            <Image source={PICTURE} />
            <View style={styles.detail}>
              <Text style={styles.name}>Adi Pramudya</Text>
              <Text style={styles.info}>jack_okira@yahoo.com</Text>
              <Text style={styles.info}>087871680132</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.edit}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.facebookContainer}>
            <Text style={styles.facebookCaption}>
              Tap to connect with your Facebook account
            </Text>
            <CustomButton
              label={"CONNECT WITH FACEBOOK"}
              labelStyle={styles.facebookAuthLabel}
              style={styles.facebookAuthButton}
              icon={ICON_FB}
            />
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Points</Text>
            <View style={styles.pointValueContainer}>
              <Image source={ICON_POINT} />
              <Text style={styles.pointValue}>2.000</Text>
            </View>
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <Button title={"Logout"} onPress={() => {}} color={metrics.DANGER_COLOR} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    marginLeft: 20,
    alignSelf: "flex-start"
  },

  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10
  },

  profileContainer: {
    width: metrics.DEVICE_WIDTH * 0.9,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },

  detailContainer: {
    flexDirection: "row"
  },

  detail: {
    marginLeft: 10
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5
  },

  info: {
    fontSize: 16,
    fontWeight: "300",
    marginVertical: 5
  },

  editButton: {
    position: "absolute",
    right: 10
  },

  edit: {
    color: "#007AFF",
    fontSize: 12
  },

  facebookContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: metrics.BORDER_COLOR,
    alignItems: "center",
    padding: 10
  },

  facebookCaption: {
    fontSize: 13,
    fontWeight: "300"
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

  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  pointsLabel: {
    fontSize: 16,
    fontWeight: "300"
  },

  pointValueContainer: {
    flexDirection: "row"
  },

  pointValue: {
    fontSize: 16,
    marginLeft: 10
  },

  logoutButtonContainer: {
    marginTop: 20
  }
})
