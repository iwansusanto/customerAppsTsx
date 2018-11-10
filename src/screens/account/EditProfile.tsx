import React from "react"
import { View, StyleSheet, Image, Button, TouchableOpacity } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import CustomTextInput from "../../components/CustomTextInput"

const ICON_USER = require("../../../assets/ic_account_inactive.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_PHONE = require("../../../assets/ic_phone.png")
const PICTURE = require("../../../assets/dummy_profile.png")

export default class EditProfile extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Edit Profile"
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.subtitle}>Edit your information</Text>
        <View style={styles.profileContainer}>
          <View style={styles.captionContainer}>
            <Image
              source={ICON_USER}
              style={metrics.TAB_BAR_ICON_STYLE}
              resizeMode={"contain"}
            />
            <View style={styles.captionView}>
              <Text style={styles.header}>Edit your profile data</Text>
              <Text style={styles.description}>Your current photo</Text>
            </View>
          </View>
          <Image source={PICTURE} style={styles.picture} />
          <View style={styles.divider} />
          <Text style={styles.formTitle}>Your Info</Text>
          <CustomTextInput
            icon={ICON_USER}
            placeholder={"Full Name"}
            style={styles.form}
          />
          <CustomTextInput icon={ICON_MAIL} placeholder={"Email"} style={styles.form} />
          <CustomTextInput
            icon={ICON_PHONE}
            placeholder={"Phone Number"}
            style={styles.form}
          />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonLabel}>SAVE</Text>
          </TouchableOpacity>
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

  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20
  },

  profileContainer: {
    backgroundColor: "white",
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
    alignItems: "center"
  },

  captionContainer: {
    flexDirection: "row",
    alignSelf: "flex-start"
  },

  captionView: {
    marginLeft: 20
  },

  header: {
    fontSize: 14
  },

  description: {
    fontSize: 16,
    fontWeight: "300",
    marginTop: 5
  },

  picture: {
    marginVertical: 20
  },

  divider: {
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 10
  },

  formTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20
  },

  form: {
    borderBottomWidth: 1,
    borderColor: "#D8D8D8"
  },

  saveButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10
  },

  saveButtonLabel: {
    color: "#007AFF"
  }
})
