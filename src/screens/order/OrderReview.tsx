import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActionSheetIOS
} from "react-native"
import RNGooglePlaces from "react-native-google-places"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import FixedButton from "../../components/FixedButton"
import OrderReviewItem from "../../components/OrderReviewItem"
import AddressItem from "../../components/AddressItem"

const ICON_MARKER = require("../../../assets/ic_marker_order.png")
const ICON_TIME = require("../../../assets/ic_time.png")
const ICON_WALLET = require("../../../assets/ic_wallet.png")
const RADIO_ACTIVE = require("../../../assets/ic_radio_active.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  address: string
}

export default class OrderReview extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Your Order"
  }

  state = {
    address: ""
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
      aryDates.push(
        this.dayAsString(currentDate.getDay()) +
          ", " +
          currentDate.getDate() +
          " " +
          this.monthAsString(currentDate.getMonth()) +
          " " +
          currentDate.getFullYear()
      )
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
        arr.push(i + ":" + (j === 0 ? "00" : 30 * j))
      }
    }
    return arr
  }

  async handleAddressChange() {
    const place = await RNGooglePlaces.openPlacePickerModal()
    this.setState({ address: place.name })
  }

  async addAddress() {
    const place = await RNGooglePlaces.openPlacePickerModal()
    this.props.navigation.navigate("NewAddress", { address: place.name })
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
        </View>
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={styles.contentItemContainer}>
            <Text style={styles.contentTitle}>Destination</Text>
            <View style={styles.destinationInputContainer}>
              <TextInput
                placeholder={"Address"}
                style={{ flex: 1 }}
                value={this.state.address}
              />
              <TouchableOpacity onPress={() => this.handleAddressChange()}>
                <Text style={styles.changeAddressButton}>CHANGE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentDivider} />
            <Text style={[styles.contentTitle, { marginTop: 25 }]}>Send to Others</Text>
            <AddressItem />
            <AddressItem />
            <TouchableOpacity style={styles.addButton} onPress={() => this.addAddress()}>
              <Text style={styles.addButtonLabel}>ADD</Text>
            </TouchableOpacity>
            <View style={styles.contentDivider} />
            <TextInput placeholder={"ADD NOTES"} style={{ flex: 1, marginTop: 25 }} />
          </View>
          <View style={styles.contentItemContainer}>
            <Text style={styles.contentTitle}>Send Now</Text>
            <Text style={styles.contentCaption}>Immediately send to your address</Text>
            <View style={styles.contentDivider} />
            <Text style={[styles.contentTitle, { marginTop: 25 }]}>Schedule Order</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableOpacity
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
                onPress={() =>
                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      options: ["Cancel", ...this.getNextDays()],
                      cancelButtonIndex: 0
                    },
                    buttonIndex => console.log(buttonIndex)
                  )
                }
              >
                <Text>Tomorrow, Aug 13</Text>
              </TouchableOpacity>
              <TouchableOpacity
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
                onPress={() =>
                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      options: ["Cancel", ...this.getTime()],
                      cancelButtonIndex: 0
                    },
                    buttonIndex => console.log(buttonIndex)
                  )
                }
              >
                <Text>09:00</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.contentCaption}>
              Your order will be scheduled to spesific time
            </Text>
          </View>
          <FlatList
            data={["1", "2", "3"]}
            renderItem={() => <OrderReviewItem />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.contentItemContainer}>
            <Text style={styles.contentTitle}>Price</Text>
            <View style={styles.priceItemContainer}>
              <Text>Subtotal</Text>
              <Text>Rp. 20.000</Text>
            </View>
            <View style={styles.priceItemContainer}>
              <Text>Shipping</Text>
              <Text>Rp. 20.000</Text>
            </View>
            <View style={styles.contentDivider} />
            <View style={[styles.priceItemContainer, { marginTop: 25 }]}>
              <Text>Total</Text>
              <Text>Rp. 20.000</Text>
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
          backgroundColor={metrics.PRIMARY_COLOR}
          labelStyle={{ color: "white" }}
          onPress={() => this.props.navigation.navigate("OrderTrack")}
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
    marginBottom: 50
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
    fontSize: 16
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
    backgroundColor: "grey",
    height: 1,
    width: metrics.DEVICE_WIDTH * 0.9,
    position: "relative",
    left: -20,
    top: 10
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
