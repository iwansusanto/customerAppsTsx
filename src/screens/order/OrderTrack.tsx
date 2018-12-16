import React, { createRef } from "react"
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  GeolocationReturnType,
  Alert,
  DeviceEventEmitter,
  Linking
} from "react-native"
import MapView, { Region, Marker, PROVIDER_GOOGLE } from "react-native-maps"

import Text from "../../components/CustomText"
import BottomSheet from "../../components/BottomSheet"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import CartItemTrack from "../../components/CartItemTrack"
import CustomButton from "../../components/CustomButton"
import withOrderContext from "../../components/consumers/withOrderContext"

const ICON_TIME = require("../../../assets/ic_time.png")
const ICON_PHONE = require("../../../assets/ic_phone_fill.png")
const ICON_MESSAGE = require("../../../assets/ic_message.png")
const ICON_WALLET = require("../../../assets/ic_wallet.png")
const ICON_DRIVER = require("../../../assets/ic_driver_marker.png")

const PROFILE_PICTURE = require("../../../assets/dummy_profile.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  order: OrderContext
}

class OrderTrack extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Your Order"
  }

  private mapRef = createRef<MapView>()
  private interval = -1

  renderBottomSheetContent = () => {
    const order = this.props.order.orderDetail
    return (
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
          <Text style={{ marginTop: 5 }}>{order.comment}</Text>
        </View>
        <FlatList
          data={order.product_data}
          renderItem={({ item }) => {
            const productAdditonal: OrderAdditional =
              item.product_data === ""
                ? {
                    data: "",
                    notes: ""
                  }
                : JSON.parse(item.product_data)

            return (
              <CartItemTrack
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                additional={productAdditonal}
              />
            )
          }}
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
            <Text style={{ marginRight: 20 }}>{order.payment_method}</Text>
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
          <Text style={{ color: "#4A90E2", fontWeight: "bold" }}>{order.total}</Text>
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
          <Text>{order.id.toString()}</Text>
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
          onPress={() => this.props.navigation.goBack()}
        />
      </ScrollView>
    )
  }

  renderSlideUpButton() {
    const driver = this.props.order.orderDetail.driver_data as DriverData

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
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${this.props.order.orderDetail.driver_data!.phone}`)
            }}
          >
            <Image source={ICON_PHONE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`sms:${this.props.order.orderDetail.driver_data!.phone}`)
            }}
          >
            <Image source={ICON_MESSAGE} />
          </TouchableOpacity>
          <View>
            <Text style={{ marginVertical: 2.5 }}>{driver.name}</Text>
            <Text style={{ marginVertical: 2.5 }}> </Text>
            <Text style={{ marginVertical: 2.5 }}> </Text>
          </View>
        </View>
      </View>
    )
  }

  onMapReady = () => {
    const driver = this.props.order.orderDetail.driver_data as DriverData

    const driverLocation = {
      latitude: Number(driver.driver_location.lat),
      longitude: Number(driver.driver_location.lng),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    }

    const mapView = this.mapRef.current
    // Move the map to current position
    if (mapView) {
      mapView.animateToRegion(driverLocation)
    }
  }

  checkOrder = async () => {
    console.log("checkorder")
    await this.props.order.getOrderDetail()
    const order = this.props.order.orderDetail
    const driver = this.props.order.orderDetail.driver_data as DriverData
    console.log(order)
    const driverLocation = {
      latitude: Number(driver.driver_location.lat),
      longitude: Number(driver.driver_location.lng),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    }

    const mapView = this.mapRef.current
    if (mapView) {
      mapView.animateToRegion(driverLocation)
    }

    if (order.order_status_id === 6) {
      DeviceEventEmitter.emit("shouldCartUpdate")
      Alert.alert("Thank you", "Your order has been finished", [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Home")
        }
      ])
      clearInterval(this.interval)
    } else if (order.order_status_id === 8) {
      DeviceEventEmitter.emit("shouldCartUpdate")
      Alert.alert("Cancelled", "Your order has been cancelled", [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Home")
        }
      ])
      clearInterval(this.interval)
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.checkOrder, 2000)
  }

  render() {
    const order = this.props.order.orderDetail
    const driver = this.props.order.orderDetail.driver_data as DriverData

    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.restoName}>{order.merchant_data.name}</Text>
        <Text style={styles.restoAddress}>{order.merchant_data.address}</Text>
        <View style={styles.divider} />
        <View style={styles.destinationItemContainer}>
          <Text style={styles.destinationAddress}>{order.address}</Text>
        </View>
        <View style={styles.destinationItemContainer}>
          <Image source={ICON_TIME} />
          <Text style={styles.destinationTime}>{order.order_status.name}</Text>
        </View>
        <View>
          <MapView
            ref={this.mapRef}
            showsMyLocationButton={true}
            showsUserLocation={true}
            style={styles.map}
            onMapReady={this.onMapReady}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              title="Driver"
              coordinate={{
                latitude: Number(driver.driver_location.lat),
                longitude: Number(driver.driver_location.lng),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
              }}
              image={ICON_DRIVER}
            />
          </MapView>
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
    marginTop: 20,
    marginBottom: 150
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

export default withOrderContext(OrderTrack)
