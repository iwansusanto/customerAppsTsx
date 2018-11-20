import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActionSheetIOS,
  Alert,
  GeolocationReturnType,
  DeviceEventEmitter
} from "react-native"
import RNGooglePlaces from "react-native-google-places"
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions
} from "react-native-popup-menu"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import FixedButton from "../../components/FixedButton"
import OrderReviewItem from "../../components/OrderReviewItem"
import AddressItem from "../../components/AddressItem"
import withCartContext from "../../components/consumers/withCartContext"
import api from "../../api"
import withOrderContext from "../../components/consumers/withOrderContext"
import { Region } from "react-native-maps"
import Geocoder from "react-native-geocoder"
import withUserContext from "../../components/consumers/withUserContext"

const ICON_MARKER = require("../../../assets/ic_marker_order.png")
const ICON_TIME = require("../../../assets/ic_time.png")
const ICON_WALLET = require("../../../assets/ic_wallet.png")
const RADIO_INACTIVE = require("../../../assets/ic_radio_uncheck.png")
const RADIO_ACTIVE = require("../../../assets/ic_radio_active.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  cart: CartContext
  order: OrderContext
  user: UserContext
}

interface State {
  address: string
  destination: boolean
  schedule: boolean
  addresses: UserAddress[]
  selectedAddressIndex: number
  notes: string
  shippingPrice: number
  lat: number
  lng: number
  selectedDate: string
  selectedTime: string
}

class OrderReview extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Your Order"
  }

  state = {
    address: "",
    destination: true,
    schedule: true,
    addresses: [] as UserAddress[],
    selectedAddressIndex: -1,
    notes: "",
    shippingPrice: -1,
    lat: 0,
    lng: 0,
    selectedDate: this.getNextDays()[0],
    selectedTime: this.getTime()[0]
  }

  monthAsString(monthIndex: number) {
    let d = new Date()
    let month = new Array()
    month[0] = "Jan"
    month[1] = "Feb"
    month[2] = "Mar"
    month[3] = "Apr"
    month[4] = "May"
    month[5] = "Jun"
    month[6] = "Jul"
    month[7] = "Aug"
    month[8] = "Sep"
    month[9] = "Oct"
    month[10] = "Nov"
    month[11] = "Dec"

    return month[monthIndex]
  }

  dayAsString(dayIndex: number) {
    var weekdays = new Array(7)
    weekdays[0] = "Sun"
    weekdays[1] = "Mon"
    weekdays[2] = "Tue"
    weekdays[3] = "Wed"
    weekdays[4] = "Thu"
    weekdays[5] = "Fri"
    weekdays[6] = "Sat"

    return weekdays[dayIndex]
  }

  getDates(startDate: Date, daysToAdd: number) {
    var aryDates = []

    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date()
      currentDate.setDate(startDate.getDate() + i)
      let date =
        this.dayAsString(currentDate.getDay()) +
        ", " +
        currentDate.getDate() +
        " " +
        this.monthAsString(currentDate.getMonth()) +
        " " +
        currentDate.getFullYear()
      aryDates.push(date)
    }

    return aryDates
  }

  getNextDays() {
    let startDate = new Date()
    return this.getDates(startDate, 7)
  }

  getTime() {
    let arr = [],
      i,
      j
    for (i = 9; i < 18; i++) {
      for (j = 0; j < 2; j++) {
        arr.push(
          i +
            ":" +
            (j === 0 ? "00" : 30 * j) +
            " - " +
            (j !== 0 ? i + 1 : i) +
            ":" +
            (j === 0 ? "30" : "00")
        )
      }
    }
    return arr
  }

  async handleAddressChange() {
    const place = await RNGooglePlaces.openPlacePickerModal()
    console.log(place)
    this.setState({
      address: place.address,
      lat: place.latitude,
      lng: place.longitude
    })

    this.createAddress()
  }

  async addAddress() {
    const place = await RNGooglePlaces.openPlacePickerModal()
    this.props.navigation.navigate("NewAddress", { address: place })
  }

  selectDestination = (destination: boolean) => () => {
    this.setState({ destination })
  }

  selectSchedule = (schedule: boolean) => () => {
    this.setState({ schedule })
  }

  createAddress = async () => {
    try {
      const { data } = await api.client.post<AddressCreateResponse>("/address", {
        address: this.state.address,
        lat: this.state.lat,
        lng: this.state.lng,
        phone: this.props.user.customer.phone,
        fullname: "Home",
        label: "Home"
      })
      console.log(data)
      await this.getAddress()

      const newIdIndex = this.state.addresses.findIndex(
        item => item.id === data.address_data.id
      )
      await this.setState({ selectedAddressIndex: newIdIndex })

      this.getShippingPrice()
    } catch (err) {
      console.log(err)
    }
  }

  getAddress = async () => {
    try {
      const { data } = await api.client.get<AddressResponse>("/address")
      console.log(data)
      await this.setState({ addresses: data.address_data })
    } catch (err) {
      console.log(err)
    }
  }

  setSelectedAddress = (index: number) => async () => {
    await this.setState({ selectedAddressIndex: index })
    await this.getShippingPrice()
  }

  deleteAddress = (id: number) => async () => {
    await api.client.delete(`/address/${id}`)
    await this.getAddress()
  }

  getShippingPrice = async () => {
    try {
      const { data } = await api.client.post<ShippingResponse>("/shipping", {
        address_id: this.state.addresses[this.state.selectedAddressIndex].id,
        merchant_id: this.props.cart.cart.merchant_id
      })

      this.setState({ shippingPrice: Number(data.delivery_price) })
    } catch (err) {
      console.log(err)
    }
  }

  createOrder = async () => {
    const address = this.state.addresses[this.state.selectedAddressIndex]
    const cart = this.props.cart.cart
    const success = await this.props.order.createOrder(
      address.fullname,
      address.address,
      address.phone,
      address.lat,
      address.lng,
      "cash",
      "1",
      "1",
      cart.merchant_id.toString(),
      this.state.notes,
      "now",
      new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      cart.id
    )

    if (success) {
      this.props.navigation.navigate("SearchDriver")
    } else {
      Alert.alert("Order failed, try again later!")
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("addressAdd", () => this.getAddress())
  }

  async componentWillMount() {
    DeviceEventEmitter.addListener("addressAdd", () => this.getAddress())
    await this.getAddress()

    navigator.geolocation.getCurrentPosition(async (position: GeolocationReturnType) => {
      try {
        const address = await Geocoder.geocodePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

        console.log(address)

        this.setState({
          address: address[0].formattedAddress,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

        await this.createAddress()
      } catch (err) {
        console.log(err)
      }
    })
  }

  deleteCartItem = (id: number) => async () => {
    await this.props.cart.deleteCart(id)
    await this.props.cart.getCart()
  }

  updateCartItem = (id: number, quantity: number) => async () => {
    await this.props.cart.updateCart(quantity, id)
    await this.props.cart.getCart()
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.restoName}>Mc Donalds</Text>
        <Text style={styles.restoAddress}>Tebet dalam, faraway</Text>
        <View style={styles.divider} />
        <View style={styles.destinationItemContainer}>
          <Image source={ICON_MARKER} />
          <Text style={styles.destinationAddress}>
            Doha, Main Street, Faraway 01, Your Area
          </Text>
        </View>
        <View style={styles.destinationItemContainer}>
          <Image source={ICON_TIME} />
          <Text style={styles.destinationTime}>SEND NOW</Text>
          <Text
            style={{ color: "white", fontWeight: "300", fontSize: 11, marginLeft: 20 }}
          >
            ARRIVES UNDER 15 MINS
          </Text>
        </View>
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={styles.contentItemContainer}>
            <View>
              <TouchableOpacity
                style={styles.destionationButton}
                onPress={this.selectDestination(true)}
              >
                <Image
                  source={this.state.destination === true ? RADIO_ACTIVE : RADIO_INACTIVE}
                />
              </TouchableOpacity>
              <Text style={styles.contentTitle}>Destination</Text>
              <View style={styles.destinationInputContainer}>
                <TextInput
                  placeholder={"Address"}
                  editable={false}
                  multiline
                  style={{ flex: 1 }}
                  value={this.state.address}
                />
                <TouchableOpacity onPress={() => this.handleAddressChange()}>
                  <Text style={styles.changeAddressButton}>CHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentDivider} />
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={styles.destionationButton}
                onPress={this.selectDestination(false)}
              >
                <Image
                  source={
                    this.state.destination === false ? RADIO_ACTIVE : RADIO_INACTIVE
                  }
                />
              </TouchableOpacity>
              <Text style={styles.contentTitle}>Send to Others</Text>
              {this.state.destination === false && (
                <>
                  <FlatList
                    style={{ flex: 1 }}
                    data={this.state.addresses}
                    extraData={this.state}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                      <AddressItem
                        deleteAddress={this.deleteAddress(item.id)}
                        setSelected={this.setSelectedAddress(index)}
                        selected={index === this.state.selectedAddressIndex}
                        name={item.label}
                        person={item.fullname}
                        address={item.address}
                        phone={item.phone}
                      />
                    )}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => this.addAddress()}
                  >
                    <Text style={styles.addButtonLabel}>ADD</Text>
                  </TouchableOpacity>
                  <View style={styles.contentDivider} />
                  <TextInput
                    onChangeText={text => this.setState({ notes: text })}
                    placeholder={"ADD NOTES"}
                    style={{ flex: 1 }}
                  />
                </>
              )}
            </View>
          </View>
          <View style={styles.contentItemContainer}>
            <View>
              <Text style={styles.contentTitle}>Send Now</Text>
              <TouchableOpacity
                style={styles.destionationButton}
                onPress={this.selectSchedule(true)}
              >
                <Image
                  source={this.state.schedule === true ? RADIO_ACTIVE : RADIO_INACTIVE}
                />
              </TouchableOpacity>
              <Text style={styles.contentCaption}>Immediately send to your address</Text>
            </View>
            <View style={styles.contentDivider} />
            <View>
              <TouchableOpacity
                style={styles.destionationButton}
                onPress={this.selectSchedule(true)}
              >
                <Image
                  source={this.state.schedule === false ? RADIO_ACTIVE : RADIO_INACTIVE}
                />
              </TouchableOpacity>
              <Text style={styles.contentTitle}>Schedule Order</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Menu onSelect={value => this.setState({ selectedDate: value })}>
                  <MenuTrigger>
                    <View
                      style={{
                        borderColor: metrics.PRIMARY_COLOR,
                        borderWidth: 0.3,
                        borderRadius: 5,
                        shadowColor: metrics.SHADOW_COLOR,
                        shadowOffset: {
                          width: 0,
                          height: 2
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        padding: 5,
                        margin: 5
                      }}
                    >
                      <Text>{this.state.selectedDate}</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions>
                    {this.getNextDays().map(day => (
                      <MenuOption value={day}>
                        <Text style={{ marginVertical: 5 }}>{day}</Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
                <Menu onSelect={value => this.setState({ selectedTime: value })}>
                  <MenuTrigger>
                    <View
                      style={{
                        borderColor: metrics.PRIMARY_COLOR,
                        borderWidth: 0.3,
                        borderRadius: 5,
                        shadowColor: metrics.SHADOW_COLOR,
                        shadowOffset: {
                          width: 0,
                          height: 2
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        padding: 5,
                        margin: 5
                      }}
                    >
                      <Text>{this.state.selectedTime}</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions customStyles={{ optionsContainer: { width: 100 } }}>
                    <ScrollView style={{ maxHeight: 200 }}>
                      {this.getTime().map(time => (
                        <MenuOption value={time}>
                          <Text style={{ marginVertical: 5 }}>{time}</Text>
                        </MenuOption>
                      ))}
                    </ScrollView>
                  </MenuOptions>
                </Menu>
              </View>
              <Text style={styles.contentCaption}>
                Your order will be scheduled to spesific time
              </Text>
            </View>
          </View>
          <FlatList
            data={this.props.cart.cart.product_data}
            style={{ width: metrics.DEVICE_WIDTH }}
            renderItem={({ item }) => (
              <OrderReviewItem
                name={item.name}
                price={item.price}
                additional={item.additional}
                quantity={item.quantity}
                id={item.id}
                updateCartItem={this.updateCartItem}
                deleteCartItem={this.deleteCartItem(item.id)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10 }}
          />
          <View style={styles.contentItemContainer}>
            <Text style={styles.contentTitle}>Price</Text>
            <View style={styles.priceItemContainer}>
              <Text>Subtotal</Text>
              <Text>{this.props.cart.cart.total}</Text>
            </View>
            <View style={styles.priceItemContainer}>
              <Text>Shipping</Text>
              <Text>
                {this.state.shippingPrice === -1
                  ? "Silahkan pilih alamat pengiriman"
                  : `QR${this.state.shippingPrice}`}
              </Text>
            </View>
            <View style={styles.contentDivider} />
            <View style={styles.priceItemContainer}>
              <Text>Total</Text>
              <Text>{`QR${Number(this.props.cart.cart.total.substr(2)) +
                Math.max(this.state.shippingPrice, 0)}`}</Text>
            </View>
          </View>
          <View style={styles.contentItemContainer}>
            <Text style={styles.contentTitle}>Payment</Text>
            <View style={[styles.priceItemContainer, { marginTop: 20 }]}>
              <View style={{ flexDirection: "row" }}>
                <Image source={ICON_WALLET} />
                <Text style={{ marginLeft: 10 }}>Cash</Text>
              </View>
              <Image source={RADIO_ACTIVE} />
            </View>
          </View>
        </ScrollView>
        <FixedButton
          label={"PROCEED"}
          backgroundColor={
            this.props.cart.cart.product_data.length > 0
              ? metrics.PRIMARY_COLOR
              : metrics.INACTIVE_COLOR
          }
          labelStyle={{ color: "white" }}
          onPress={this.createOrder}
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
    marginLeft: 20,
    marginTop: 10
  },

  restoAddress: {
    fontWeight: "300",
    color: "white",
    marginLeft: 20,
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

  destionationButton: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 99
  },

  destinationAddress: {
    color: "white",
    marginLeft: 20,
    fontSize: 16
  },

  destinationTime: {
    color: "white",
    marginLeft: 20,
    fontSize: 12,
    fontWeight: "bold"
  },

  contentContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 65
  },

  contentItemContainer: {
    backgroundColor: "white",
    padding: 20,
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginVertical: 10
  },

  contentTitle: {
    color: metrics.PRIMARY_COLOR,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },

  destinationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10
  },

  changeAddressButton: {
    color: "#007AFF",
    fontSize: 12
  },

  contentDivider: {
    backgroundColor: "#ccc",
    height: 1,
    flex: 1,
    marginLeft: -20,
    width: metrics.DEVICE_WIDTH * 0.9,
    marginVertical: 15
  },

  contentCaption: {
    fontSize: 16,
    fontWeight: "300",
    marginTop: 5
  },

  addButton: {
    padding: 5,
    backgroundColor: "#7ED321",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    marginTop: 10,
    alignSelf: "flex-end"
  },

  addButtonLabel: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold"
  },

  priceItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
})

export default withUserContext(withOrderContext(withCartContext(OrderReview)))
