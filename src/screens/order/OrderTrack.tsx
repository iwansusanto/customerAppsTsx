import React from "react"
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native"
import MapView from "react-native-maps"

import Text from "../../components/CustomText"
import BottomSheet from "../../components/BottomSheet"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import CartItemTrack from "../../components/CartItemTrack"
import CustomButton from "../../components/CustomButton"

const ICON_TIME = require("../../../assets/ic_time.png")
const ICON_PHONE = require("../../../assets/ic_phone_fill.png")
const ICON_MESSAGE = require("../../../assets/ic_message.png")
const ICON_WALLET = require("../../../assets/ic_wallet.png")

const PROFILE_PICTURE = require("../../../assets/dummy_profile.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class OrderTrack extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Your Order"
  }

  renderBottomSheetContent = () => (
    <ScrollView
      style={{
        width: metrics.DEVICE_WIDTH,
        backgroundColor: "white",
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: metrics.PRIMARY_COLOR,
        marginBottom: 130
      }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View
        style={{
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          borderColor: "grey",
          width: metrics.DEVICE_WIDTH,
          padding: 20
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            color: "#4A90E2",
            fontWeight: "bold"
          }}
        >
          Delivery Notes
        </Text>
        <Text style={{ marginTop: 5 }}>
          just claps three times once arrived in front of my door. the bell is broken btw.
        </Text>
      </View>
      <FlatList
        data={["1", "2", "3"]}
        renderItem={() => <CartItemTrack />}
        scrollEnabled={false}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: metrics.DEVICE_WIDTH,
          padding: 20,
          borderBottomWidth: 0.3,
          borderColor: "grey"
        }}
      >
        <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Payment Method</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 20 }}>Cash</Text>
          <Image source={ICON_WALLET} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: metrics.DEVICE_WIDTH,
          padding: 20,
          borderBottomWidth: 0.3,
          borderColor: "grey"
        }}
      >
        <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Total</Text>
        <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Rp. 20.000</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: metrics.DEVICE_WIDTH,
          padding: 20,
          borderBottomWidth: 0.3,
          borderColor: "grey"
        }}
      >
        <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>Transaction Number</Text>
        <Text>12983719284318112974s</Text>
      </View>
      <CustomButton
        label={"CANCEL ORDER"}
        style={{
          backgroundColor: metrics.DANGER_COLOR,
          width: metrics.DEVICE_WIDTH,
          marginTop: 20,
          borderRadius: 0
        }}
        labelStyle={{ color: "white" }}
        onPress={() => this.props.navigation.navigate("SearchDriver")}
      />
    </ScrollView>
  )

  renderSlideUpButton() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#4A90E2", fontSize: 16, fontWeight: "bold" }}>
          Your Driver
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Image source={PROFILE_PICTURE} />
          <TouchableOpacity>
            <Image source={ICON_PHONE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={ICON_MESSAGE} />
          </TouchableOpacity>
          <View>
            <Text style={{ marginVertical: 2.5 }}>Mas Caca</Text>
            <Text style={{ marginVertical: 2.5 }}>Ford Ranger</Text>
            <Text style={{ marginVertical: 2.5 }}>A 5782 MVP</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.restoName}>Mc Donalds</Text>
        <Text style={styles.restoAddress}>Tebet dalam, faraway</Text>
        <View style={styles.divider} />
        <View style={styles.destinationItemContainer}>
          <Text style={styles.destinationAddress}>
            Doha, Main Street, Faraway 01, Your Area
          </Text>
        </View>
        <View style={styles.destinationItemContainer}>
          <Image source={ICON_TIME} />
          <Text style={styles.destinationTime}>AS SOON AS POSSIBLE</Text>
        </View>
        <View>
          <MapView
            showsMyLocationButton={true}
            showsUserLocation={true}
            style={styles.map}
          />
        </View>
        <BottomSheet
          content={this.renderBottomSheetContent}
          bottomUpSlideBtn={styles.bottomSheetSlideUpButton}
          slideUpButton={this.renderSlideUpButton()}
          startHeight={130}
          topEnd={metrics.DEVICE_HEIGHT * 0.3}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  restoName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 52,
    marginTop: 10
  },

  restoAddress: {
    fontWeight: "300",
    color: "white",
    marginLeft: 52,
    marginTop: 10,
    alignSelf: "flex-start"
  },

  divider: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 1,
    backgroundColor: "white",
    marginTop: 10
  },

  destinationItemContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: metrics.DEVICE_WIDTH * 0.9,
    alignItems: "center"
  },

  destinationAddress: {
    color: "white",
    marginLeft: 34,
    fontSize: 16
  },

  destinationTime: {
    color: "white",
    marginLeft: 20,
    fontSize: 12,
    fontWeight: "bold"
  },

  map: {
    flex: 1,
    width: metrics.DEVICE_WIDTH,
    marginTop: 20
  },

  bottomSheetSlideUpButton: {
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: metrics.PRIMARY_COLOR,
    padding: 20
  }
})
