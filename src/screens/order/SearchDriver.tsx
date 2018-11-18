import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ImageStyle,
  TouchableOpacity
} from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import {
  NavigationStackScreenOptions,
  NavigationScreenProp
} from "react-navigation"
import FixedButton from "../../components/FixedButton"
import withOrderContext from "../../components/consumers/withOrderContext"

const OVERLAY = require("../../../assets/overlay-search-driver.png")
const ICON_SEARCH = require("../../../assets/ic_search_driver.png")
const ICON_CANCEL = require("../../../assets/ic_cancel_driver.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  order: OrderContext
}

class SearchDriver extends React.Component<Props> {
  interval: number = -1

  static navigationOptions: NavigationStackScreenOptions = {
    title: "Searching for Driver"
  }

  checkOrder = async () => {
    await this.props.order.getOrderDetail()
    const order = this.props.order.orderDetail

    if (order.driver_id !== null) {
      this.props.navigation.navigate("OrderTrack")
      clearInterval(this.interval)
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.checkOrder, 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
        <Text style={[styles.caption, { marginTop: 20 }]}>Sit back User</Text>
        <Text style={styles.caption}>
          We are searching the nearest driver from you
        </Text>
        <Image source={ICON_SEARCH} style={{ marginTop: 50 }} />
        <TouchableOpacity style={styles.cancelButtonContainer}>
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
        <FixedButton
          label={"MAKE NEW ORDER"}
          labelStyle={{ color: "white" }}
          backgroundColor={metrics.SECONDARY_COLOR}
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
    bottom: 50,
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
