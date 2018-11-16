import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import AdditionalFoodItem from "../../components/AdditionalFoodItem"
import FixedButton from "../../components/FixedButton"
import BottomSheet from "../../components/BottomSheet"
import CartItem from "../../components/CartItem"
const PICTURE = require("../../../assets/dummy_food_detail.png")
const ICON_CART = require("../../../assets/ic_cart.png")
const ICON_ARROW = require("../../../assets/ic_arrow.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class FoodDetail extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Fried Rice"
  }

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
        <Image source={ICON_CART} />
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderReview")}>
            <Image source={ICON_ARROW} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.subtitle}>Ayam Kecap Koh Aseng</Text>
            <View style={styles.detailContainer}>
              <Image source={PICTURE} />
              <View style={styles.detail}>
                <Text style={styles.title}>Add Extra Items</Text>
                <Text style={styles.category}>Drinks</Text>
                <AdditionalFoodItem />
                <AdditionalFoodItem />
                <Text style={styles.category}>Drinks</Text>
                <AdditionalFoodItem />
                <AdditionalFoodItem />
              </View>
            </View>
          </View>
        </ScrollView>
        <FixedButton label={"ADD TO CART"} backgroundColor={metrics.SECONDARY_COLOR} />
        <BottomSheet
          content={this.renderBottomSheetContent}
          bottomUpSlideBtn={styles.bottomSheetSlideUpButton}
          slideUpButton={this.renderSlideUpButton()}
          startHeight={80}
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

  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 20
  },

  detailContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginTop: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "bold"
  },

  detail: {
    padding: 20
  },

  category: {
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10
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
