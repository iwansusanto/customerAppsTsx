import React from "react"
import { View, StyleSheet, Image, FlatList, AsyncStorage } from "react-native"
import moment from "moment"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import OrderItem from "../../components/OrderItem"
import HeaderOverlay from "../../components/HeaderOverlay"
import api from "../../utils/api"
import strings from "../../components/language"
import Lang from "../../components/Lang"

interface State {
  isDataLoading: boolean
  data: Array<any>
}

export default class Orders extends React.Component<any, State> {
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
    return await strings.setLanguage(languageStore)
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  render() {
    console.log("data", this.state.data)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Lang styleLang={styles.title} language="ordersTitle" />
        <Lang
          styleLang={styles.subtitle}
          language={this.state.data.length === 0 ? "ordersEmpty" : "ordersList"}
        />
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
