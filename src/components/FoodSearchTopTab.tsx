import React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"
import { NavigationScreenProp } from "react-navigation"
import HeaderOverlay from "./HeaderOverlay"
import SearchBar from "./SearchBar"

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  navigation: NavigationScreenProp<any, any>
}

export default class TobTab extends React.Component<Props, State> {
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
        <Text style={styles.subtitle}>Search what you're craving for</Text>
        <SearchBar style={styles.search} />
        <View style={styles.tabContainer}>
          <FlatList
            data={navigation.state.routes}
            horizontal
            extraData={this.state}
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

  inactiveLabel: {
    color: "#999999",
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
    fontSize: 18
  },

  search: {
    marginTop: 20
  }
})
