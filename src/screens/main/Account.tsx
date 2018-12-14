import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ScrollView
} from "react-native"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions, NavigationScreenProp } from "react-navigation"
import metrics from "../../config/metrics"
import HeaderOverlay from "../../components/HeaderOverlay"
import CustomButton from "../../components/CustomButton"
import withUserContext from "../../components/consumers/withUserContext"

const ICON_FB = require("../../../assets/ic_facebook.png")
const ICON_POINT = require("../../../assets/point.png")
const ICON_ARROW = require("../../../assets/ic_arrow.png")
const PICTURE = require("../../../assets/dummy_profile.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: UserContext
}

class Account extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container} >
        <HeaderOverlay />
        <View style={[styles.container, { alignItems: "center" }]}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.subtitle}>View your information</Text>
          <View style={styles.profileContainer}>
            <View style={styles.detailContainer}>
              {/* 
              <Image source={PICTURE} />
              */}
              <View style={styles.detail}>
                <Text style={styles.name}>{this.props.user.customer.name}</Text>
                <Text style={styles.info}>{this.props.user.customer.email}</Text>
                <Text style={styles.info}>{this.props.user.customer.phone}</Text>
              </View>
              {/*
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => this.props.navigation.navigate("EditProfile")}
              >
                <Text style={styles.edit}>EDIT</Text>
              </TouchableOpacity>
              */}
            </View>
              {/*
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
              */}
          </View>
              {/*
          <View style={styles.profileContainer}>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Points</Text>
              <View style={styles.pointValueContainer}>
                <Image source={ICON_POINT} />
                <Text style={styles.pointValue}>
                  {this.props.user.customer.total_point}
                </Text>
              </View>
            </View>
          </View>
              */}
          <View style={styles.menuContainer}>
              {/*
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuLabel}>Change language</Text>
              <Image source={ICON_ARROW} />
            </TouchableOpacity>
              */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.props.navigation.navigate("Terms")}
            >
              <Text style={styles.menuLabel}>Terms of Service</Text>
              <Image source={ICON_ARROW} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
            >
              <Text style={styles.menuLabel}>Privacy Policy</Text>
              <Image source={ICON_ARROW} />
            </TouchableOpacity>
              {/*
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuLabel}>Rate App</Text>
              <Image source={ICON_ARROW} />
            </TouchableOpacity>
              */}
          </View>
          <View style={styles.logoutButtonContainer}>
            <Button
              title={"Logout"}
              onPress={() => {
                this.props.user.changeUser(null)
                this.props.navigation.replace("Welcome")
              }}
              color={metrics.DANGER_COLOR}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderColor: "#EEEEEE",
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
    padding: 10,
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
  },

  menuContainer: {
    backgroundColor: "white",
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    padding: 20,
    marginTop: 20
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 5
  },

  menuLabel: {
    fontSize: 16,
    fontWeight: "300"
  }
})

export default withUserContext(Account)
