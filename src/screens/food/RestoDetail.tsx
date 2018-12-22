import React, { Component } from "react"

import { createTabNavigator, NavigationScreenProp } from "react-navigation"
import TopTab from "../../components/RestoTopTab"

import RestoFood from "./RestoFood"
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import metrics from "../../config/metrics"
import SearchContextProvider from "../../components/providers/SearchContextProvider"
import withSearchContext from "../../components/consumers/withSearchContext"
import CustomText from "../../components/CustomText"
import ChangeRestoAlert from "../../components/ChangeRestoAlert"
import BottomSheet from "../../components/BottomSheet"
import Text from "../../components/CustomText"
import CartItem from "../../components/CartItem"
import CustomButton from "../../components/CustomButton"
import withCartContext from "../../components/consumers/withCartContext"

const IC_MENU = require("../../../assets/ic_menu.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  search: SearchContext
  cart: CartContext
}

interface State {
  menus: any
  isLoading: boolean
  isAlertOpen: boolean
}
var addressnew = ""
var opens = ""
const LoadingMenu = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator />
  </View>
)

const ICON_ARROW = require("../../../assets/ic_arrow.png")
const ICON_CART = require("../../../assets/ic_cart.png")

class RestoDetail extends Component<Props, State> {
  state = {
    menus: {
      "Fetching Menu": LoadingMenu
    },
    isLoading: true,
    isAlertOpen: false
  }

  public async componentWillMount() {
    const merchantId = this.props.navigation.getParam("merchantId")
    await this.props.search.searchRestoDetail(merchantId)
    const menus: any = {}
    this.props.search.resto.menu_data.map(
      item =>
        (menus[item.name] = () => (
          <RestoFood navigation={this.props.navigation} data={item.data} />
        ))
    )
    addressnew = this.props.search.resto.merchant.address
    var String_1 = this.props.search.resto.merchant.open
    var String_2 = this.props.search.resto.merchant.close
    opens = String_1.concat(" - ", String_2)
    // opens = "09 AM - 09 PM";

    console.log("alamat ini harusnya muncul")
    console.log(this.props.search.resto.merchant)
    console.log(addressnew)
    console.log(opens)
    if (Object.keys(menus).length === 0) {
      menus["Menu Unvailable"] = () => (
        <RestoFood navigation={this.props.navigation} data={[]} />
      )
    }
    await this.setState({ menus, isLoading: false })

    const { setParams } = this.props.navigation
    setParams({ title: this.props.search.resto.merchant.name })

    this.props.cart.getCart()
  }

  public render() {
    const Tabs = createTabNavigator(this.state.menus, {
      tabBarComponent: ({ navigation }) => (
        <TopTab
          navigation={navigation}
          address={
            this.props.search.resto.merchant
              ? this.props.search.resto.merchant.address
              : ""
          }
          open={opens}
          isOpen={
            this.props.search.resto.merchant &&
            this.props.search.resto.merchant.is_merchant_open === 1
          }
          isLoading={this.state.isLoading}
        />
      ),
      tabBarPosition: "top",
      swipeEnabled: true,
      animationEnabled: true
    })

    console.log(this.props.cart)
    return (
      <View style={{ flex: 1 }}>
        {this.props.cart.cart.product_data.length > 0 && (
          <BottomSheet
            content={this.renderBottomSheetContent}
            bottomUpSlideBtn={styles.bottomSheetSlideUpButton}
            slideUpButton={this.renderSlideUpButton()}
            startHeight={100}
            topEnd={metrics.DEVICE_HEIGHT * 0.3}
          />
        )}
        <View style={{ flex: 1, zIndex: -1 }}>
          <Tabs />
        </View>
        <ChangeRestoAlert
          visible={this.state.isAlertOpen}
          onRequestClose={() => this.setState({ isAlertOpen: false })}
        />
      </View>
    )
  }

  changeTitle = (title: string) => {
    const { setParams } = this.props.navigation
    setParams({ title })
  }

  deleteCartItem = (id: number) => async () => {
    await this.props.cart.deleteCart(id)
    await this.props.cart.getCart()
  }

  updateCartItem = (id: number, quantity: number) => async () => {
    await this.props.cart.updateCart(quantity, id)
    await this.props.cart.getCart()
  }

  renderBottomSheetContent = () => (
    <View
      style={{
        width: metrics.DEVICE_WIDTH,
        height: metrics.DEVICE_HEIGHT,
        backgroundColor: "white",
        alignItems: "center",
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: metrics.PRIMARY_COLOR
      }}
    >
      <FlatList
        data={this.props.cart.cart.product_data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            deleteCartItem={this.deleteCartItem(item.id)}
            updateCartItem={this.updateCartItem}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            additional={item.additional}
          />
        )}
      />
    </View>
  )

  renderSlideUpButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Image source={IC_MENU} style={{ position: "absolute", top: -10 }} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("OrderReview")}
        >
          <Image source={ICON_CART} />
        </TouchableOpacity>
        <View style={{ marginLeft: 20, justifyContent: "center", flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#4A90E2" }}>
            Estimate price
          </Text>
          <Text style={{ fontSize: 14, marginTop: 5 }}>
            {`${this.props.cart.cart.product_data.length} Items`}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#4A90E2",
              paddingTop: 17
            }}
          >
            {this.props.cart.cart.total}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("OrderReview")}
            style={{ flex: 1, padding: 20 }}
          >
            <Image source={ICON_ARROW} />
          </TouchableOpacity>
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

export default withCartContext(withSearchContext(RestoDetail))
