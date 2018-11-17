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
import { NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import AdditionalFoodItem from "../../components/AdditionalFoodItem"
import FixedButton from "../../components/FixedButton"
import withCartContext from "../../components/consumers/withCartContext"

interface Props {
  navigation: NavigationScreenProp<any, any>
  cart: CartContext
}

interface State {
  selectedAdditional: boolean[]
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
    selectedAdditional: [] as boolean[]
  }

  async componentWillMount() {
    const { additional } = this.props.navigation.state.params
    await this.setState({
      selectedAdditional: new Array(additional.length).fill(false)
    })
  }

  render() {
    const {
      id,
      title,
      additional,
      picture
    } = this.props.navigation.state.params
    const { selectedAdditional } = this.state
    console.log(selectedAdditional)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.subtitle}>{title}</Text>
            <View style={styles.detailContainer}>
              <Image style={styles.picture} source={{ uri: picture }} />
              <View style={styles.detail}>
                <Text style={styles.title}>Add Extra Items</Text>
                <Text style={styles.category}>Toppings</Text>
                {additional !== null &&
                  additional.topping.map((item: any, index: number) => (
                    <AdditionalFoodItem
                      onPress={this.handleClick(index)}
                      active={selectedAdditional[index]}
                      name={item.name}
                      price={item.data}
                    />
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <FixedButton
          label={"ADD TO CART"}
          backgroundColor={metrics.SECONDARY_COLOR}
          labelStyle={{ color: "white" }}
          onPress={this.addToCart}
        />
      </View>
    )
  }

  handleClick = (index: number) => () => {
    console.log("index", index)
    const selected = this.state.selectedAdditional
    selected[index] = !selected[index]
    this.setState({ selectedAdditional: selected })
  }

  addToCart = async () => {
    const { id, additional } = this.props.navigation.state.params
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
    this.props.navigation.goBack()
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
  }
})

export default withCartContext(FoodDetail)
