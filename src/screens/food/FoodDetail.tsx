import React from "react"
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageStyle
} from "react-native"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import Text from "../../components/CustomText"
import { NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import AdditionalFoodItem from "../../components/AdditionalFoodItem"
import FixedButton from "../../components/FixedButton"
import withCartContext from "../../components/consumers/withCartContext"
import CustomTextInput from "../../components/CustomTextInput"

const ICON_NOTE = require("../../../assets/ic_add_note.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
  cart: CartContext
}

interface State {
  selectedAdditional: boolean[]
  additionalPrice: number
}

class FoodDetail extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<any, any>
  }) => ({
    title: navigation.state.params.title
  })

  state = {
    selectedAdditional: [] as boolean[],
    additionalPrice: 0
  }

  async componentWillMount() {
    const { additional } = this.props.navigation.state.params
    await this.setState({
      selectedAdditional: new Array(additional.length).fill(false)
    })
  }

  render() {
    const { id, title, additional, picture, price } = this.props.navigation.state.params
    const { selectedAdditional } = this.state
    console.log(selectedAdditional)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={styles.subtitle}>{title}</Text>
            <View style={styles.detailContainer}>
              <Image style={styles.picture as ImageStyle} source={{ uri: picture }} />
              {additional !== null && (
                <View style={styles.detail}>
                  <Text style={styles.title}>Add Extra Items</Text>
                  <Text style={styles.category}>Toppings</Text>
                  {additional !== null &&
                    additional.topping.map((item: any, index: number) => (
                      <AdditionalFoodItem
                        key={item.id.toString()}
                        onPress={this.handleClick(index)}
                        active={selectedAdditional[index]}
                        name={item.name}
                        price={item.data}
                      />
                    ))}
                </View>
              )}
              <CustomTextInput icon={ICON_NOTE} placeholder={"Add notes"} />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity style={styles.addToCartButton} onPress={this.addToCart}>
          <Text style={styles.addToCartLabel}>Add to cart</Text>
          <Text style={styles.addToCartLabel}>{`QR ${Number(price) +
            Number(this.state.additionalPrice)}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleClick = (index: number) => () => {
    console.log("index", index)
    const { additional } = this.props.navigation.state.params
    let selected = this.state.selectedAdditional
    selected = new Array(additional.length).fill(false)
    selected[index] = true
    this.setState({
      selectedAdditional: selected,
      additionalPrice: additional.topping[index].data
    })
  }

  addToCart = async () => {
    const { id, additional, merchantId } = this.props.navigation.state.params
    const { selectedAdditional } = this.state

    const additionalIds: number[] = []
    selectedAdditional.forEach((item, index) => {
      if (item === true) {
        additionalIds.push(additional.topping[index].id)
      }
    })

    const additionalValues = additionalIds.length > 0 ? additionalIds : null

    await this.props.cart.addToCart(1, id, additionalValues, "")
    this.props.cart.getCart()
    this.props.navigation.navigate("RestoDetail", { merchantId: 1 })
    // this.props.navigation.navigate("RestoDetail", { merchantId: merchantId })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  picture: {
    flex: 1,
    width: metrics.DEVICE_WIDTH - 40,
    height: metrics.DEVICE_HEIGHT / 4
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
    overflow: "hidden",
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

  addToCartButton: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: metrics.IS_IPHONE_X ? 65 : 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: metrics.PRIMARY_COLOR,
    width: metrics.DEVICE_WIDTH * 0.9,
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  addToCartLabel: {
    fontWeight: "bold",
    color: "#4A90E2"
  }
})

export default withCartContext(FoodDetail)
