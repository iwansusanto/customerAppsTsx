import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ImageStyle,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import FixedButton from "../../components/FixedButton"
import withOrderContext from "../../components/consumers/withOrderContext"

import api from "../../utils/api"

const OVERLAY = require("../../../assets/overlay-search-driver.png")
const ICON_SEARCH = require("../../../assets/ic_search_driver.png")
const ICON_CANCEL = require("../../../assets/ic_cancel_driver.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  order: OrderContext
}

interface State {
  isLoading: boolean
  isCancelling: boolean
}

class SearchDriver extends React.Component<Props, State> {
  interval: number = -1

  state = {
    isLoading: false,
    isCancelling: false
  }

  static navigationOptions: NavigationStackScreenOptions = {
    title: "Searching for Driver"
  }

  checkOrder = async () => {
    await this.props.order.getOrderDetail()
    const order = this.props.order.orderDetail

    if (order.driver_id !== 0) {
      this.props.navigation.replace("OrderTrack")
      clearInterval(this.interval)
    }
  }

  makeNewOrder = async () => {
    this.setState({ isLoading: true })
    await api.client.delete(`/order/${this.props.order.orderDetail.id}`)
    this.props.navigation.navigate("Home")
  }

  componentDidMount() {
    this.interval = setInterval(this.checkOrder, 3000)
  }

  handleCancelButtonPressed = async () => {
    this.setState({ isCancelling: true })
    const order = this.props.order.orderDetail
    try {
      await api.client.post("/cancel_order", {
        order_id: order.id
      })
    } catch (err) {
      Alert.alert("Error", err.message)
      this.setState({ isCancelling: false })
    }
    this.setState({ isCancelling: false })
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
        <Text style={[styles.caption, { marginTop: 20 }]}>Sit back User</Text>
        <Text style={styles.caption}>We are searching the nearest driver from you</Text>
        <Image source={ICON_SEARCH} style={{ marginTop: 50 }} />
        {!this.state.isCancelling ? (
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={this.handleCancelButtonPressed}
          >
            <Image source={ICON_CANCEL} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: metrics.DANGER_COLOR,
                marginTop: 20
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cancelButtonContainer}>
            <ActivityIndicator />
          </View>
        )}
        <FixedButton
          label={"MAKE NEW ORDER"}
          labelStyle={{ color: "white" }}
          backgroundColor={metrics.SECONDARY_COLOR}
          isLoading={this.state.isLoading}
          onPress={this.makeNewOrder}
        />
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

  overlay: {
    position: "absolute",
    bottom: 200,
    alignSelf: "center"
  },

  caption: {
    color: "white",
    fontWeight: "300",
    textAlign: "center",
    fontSize: 18
  },

  cancelButtonContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center"
  }
})

export default withOrderContext(SearchDriver)
