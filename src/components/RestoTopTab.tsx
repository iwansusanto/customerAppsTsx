import React from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageStyle
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"
import { NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "./HeaderOverlay"

const LABEL = require("../../assets/label_open.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  navigation: NavigationScreenProp<any, any>
}

export default class RestoTopTab extends React.Component<Props, State> {
  state = {
    navigation: this.props.navigation
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ navigation: nextProps.navigation })
  }

  render() {
    const { navigation } = this.state
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.subtitle}>Skycrawler tower, Doha, Qatar</Text>
        <Text style={styles.subtitle}>12345 Wide Street</Text>
        <Text style={styles.hours}>8 AM - 10 PM</Text>
        <Text style={styles.tags}>western • chicken • fastfood</Text>
        <View style={styles.tabContainer}>
          <FlatList
            data={navigation.state.routes}
            horizontal
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                style={styles.labelContainer}
                onPress={() => this.props.navigation.navigate(item.routeName)}
              >
                {navigation.state.routes[navigation.state.index].routeName ===
                item.routeName ? (
                  <Text style={styles.label}>{item.routeName}</Text>
                ) : (
                  <Text style={styles.inactiveLabel}>{item.routeName}</Text>
                )}
                {navigation.state.routes[navigation.state.index].routeName ===
                item.routeName ? (
                  <View style={styles.underline} />
                ) : null}
              </TouchableOpacity>
            )}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        </View>
        <Image source={LABEL} style={styles.status as ImageStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },

  tabContainer: {
    height: 50,
    width: metrics.DEVICE_WIDTH,
    borderBottomWidth: 1,
    borderColor: "#9B1EB8",
    justifyContent: "center",
    paddingLeft: 20
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },

  labelContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },

  list: {
    flex: 1
  },

  listContent: {
    alignItems: "center"
  },

  underline: {
    backgroundColor: "#9B1EB8",
    position: "absolute",
    bottom: 0,
    height: 4,
    width: 70
  },

  subtitle: {
    color: "white",
    fontWeight: "300",
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 20
  },

  search: {
    marginTop: 20
  },

  hours: {
    color: "white",
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10
  },

  tags: {
    color: "white",
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold"
  },

  status: {
    position: "absolute",
    right: 20,
    top: 40
  },

  inactiveLabel: {
    color: "#999999",
    fontSize: 16,
    fontWeight: "bold"
  }
})
