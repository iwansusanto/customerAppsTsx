import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  FlatList,
  ImageStyle
} from "react-native"

import Text from "../../components/CustomText"
import Countries from "../../../assets/CountryCodes.json"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import metrics from "../../config/metrics"

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class CountrySelect extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Select your country"
  }

  selectCountry(item: any) {
    let callback = this.props.navigation.getParam("onSelect")
    this.props.navigation.goBack()
    callback(item.code, item.dial_code)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={Countries}
          renderItem={({ item }) => (
            <CountryItem
              name={item.name}
              dial_code={item.dial_code}
              code={item.code}
              onPress={() => this.selectCountry(item)}
            />
          )}
        />
      </View>
    )
  }
}

interface CountryItemProps extends TouchableOpacityProps {
  name: string
  dial_code: string
  code: string
}

const CountryItem = (props: CountryItemProps) => (
  <TouchableOpacity style={styles.itemContainer} {...props}>
    <Image
      source={{ uri: `https://www.countryflags.io/${props.code}/flat/64.png` }}
      style={styles.flag as ImageStyle}
    />
    <Text style={styles.countryName}>{props.name}</Text>
    <Text>{props.dial_code}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  itemContainer: {
    width: metrics.DEVICE_WIDTH,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 20
  },

  flag: {
    width: 40,
    height: 40
  },

  countryName: {
    flex: 1,
    marginHorizontal: 20
  }
})
