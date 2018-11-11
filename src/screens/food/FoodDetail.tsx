import React from "react"
import { View, StyleSheet, Image, ScrollView } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"
import HeaderOverlay from "../../components/HeaderOverlay"
import metrics from "../../config/metrics"
import AdditionalFoodItem from "../../components/AdditionalFoodItem"
import FixedButton from "../../components/FixedButton"

const PICTURE = require("../../../assets/dummy_food_detail.png")

export default class FoodDetail extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Fried Rice"
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
  }
})
