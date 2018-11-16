import React from "react"

import { createTabNavigator, NavigationScreenProp } from "react-navigation"
import TopTab from "../../components/RestoTopTab"

import RestoFood from "./RestoFood"
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native"

import metrics from "../../config/metrics"

import BottomSheet from "../../components/BottomSheet"
import Text from "../../components/CustomText"
import CartItem from "../../components/CartItem"
import CustomButton from "../../components/CustomButton"

const ICON_ARROW = require("../../../assets/ic_arrow.png")
const ICON_CART = require("../../../assets/ic_cart.png")

const Tabs = createTabNavigator(
  {
    Rice: { screen: RestoFood },
    Dumplings: { screen: RestoFood }
  },
  {
    tabBarComponent: ({ navigation }) => <TopTab navigation={navigation} />,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true
  }
)

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class RestoDetail extends React.Component<Props, any> {
  static router = Tabs.router

  renderBottomSheetContent = () => (
    <View
      style={{
        width: metrics.DEVICE_WIDTH,
        height: 400,
        backgroundColor: "white",
        alignItems: "center",
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: metrics.PRIMARY_COLOR
      }}
    >
      <FlatList data={["1", "2", "3"]} renderItem={() => <CartItem />} />
    </View>
  )

  renderSlideUpButton() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderReview")}>
          <Image source={ICON_CART} />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#4A90E2" }}>
            Estimate price
          </Text>
          <Text style={{ fontSize: 14, marginTop: 5 }}>3 Items</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#4A90E2",
              marginRight: 20
            }}
          >
            Rp. 20.000
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("OrderReview")}
            style={{ backgroundColor: "red", flex: 1 }}
          >
            <Image source={ICON_ARROW} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomSheet
          content={this.renderBottomSheetContent}
          bottomUpSlideBtn={styles.bottomSheetSlideUpButton}
          slideUpButton={this.renderSlideUpButton()}
          startHeight={80}
          topEnd={metrics.DEVICE_HEIGHT * 0.3}
        />
        <View style={{ flex: 1, zIndex: -1 }}>
          <Tabs navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
