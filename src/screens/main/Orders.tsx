import React from "react"
import { View, StyleSheet, Image, FlatList, AsyncStorage } from "react-native"
import moment from "moment"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import OrderItem from "../../components/OrderItem"
import HeaderOverlay from "../../components/HeaderOverlay"
import api from "../../api"
import strings from "../../components/language"

const ICON_ACTIVE = require("../../../assets/ic_order_active.png")
const ICON_INACTIVE = require("../../../assets/ic_order_inactive.png")

interface State {
  isDataLoading: boolean
  data: Array<any>
}

export default class Orders extends React.Component<any, State> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: "Orders",
    tabBarIcon: ({ focused }) => {
      switch (focused) {
        case true:
          return (
            <Image
              source={ICON_ACTIVE}
              resizeMode={"contain"}
              style={metrics.TAB_BAR_ICON_STYLE}
            />
          )
        case false:
          return (
            <Image
              source={ICON_INACTIVE}
              resizeMode={"contain"}
              style={metrics.TAB_BAR_ICON_STYLE}
            />
          )
      }
    }
  }

  state = {
    isDataLoading: true,
    data: []
  }

  async componentDidMount() {
    this.setState({ isDataLoading: true })
    const { data } = await api.client.get<any>("/orders")
    console.log(data)
    this.setState({ data: data, isDataLoading: false })
  }
  _onSetLanguage = async () => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    console.log("STRING", languageStore, language)
    return language
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.title}>{strings.ordersTitle}</Text>
        <Text style={styles.subtitle}>
          {this.state.data === null ? strings.ordersEmpty : strings.ordersList}
        </Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }: { item: any }) => {
            return (
              <OrderItem
                name={item.name}
                date={item.ordered_at}
                statusText={item.status_text}
              />
            )
          }}
          style={styles.list}
          refreshing={this.state.isDataLoading}
          onRefresh={() => this.componentDidMount()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  list: {
    paddingTop: 20
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    alignSelf: "flex-start",
    marginLeft: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
    marginTop: 20
  }
})
