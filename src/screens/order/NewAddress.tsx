import React from "react"
import { View, StyleSheet, DeviceEventEmitter } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import FixedButton from "../../components/FixedButton"
import metrics from "../../config/metrics"
import api from "../../api"

const IC_LOCATION = require("../../../assets/ic_location.png")
const IC_USER = require("../../../assets/ic_person.png")
const IC_PHONE = require("../../../assets/ic_phone_fill.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  name: string
  addressName: string
  contactName: string
  phoneNumber: string
  isLoading: boolean
}

export default class NewAddress extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "New Address"
  }

  state = {
    name: this.props.navigation.getParam("address").name,
    addressName: "",
    contactName: "",
    phoneNumber: "",
    isLoading: false
  }

  createAddressFromAddButton = async () => {
    this.setState({ isLoading: true })
    const place = this.props.navigation.getParam("address")
    try {
      const { data } = await api.client.post<AddressCreateResponse>("/address", {
        address: this.state.name,
        lat: place.latitude,
        lng: place.longitude,
        phone: this.state.phoneNumber,
        fullname: this.state.contactName,
        label: this.state.addressName
      })
      DeviceEventEmitter.emit("addressAdd")
      this.props.navigation.goBack(null)
    } catch (err) {
      console.log(err)
    }
    this.setState({ isLoading: false })
  }

  render() {
    const place = this.props.navigation.getParam("address")
    console.log(place)
    return (
      <View style={styles.container}>
        <CustomTextInput
          icon={IC_LOCATION}
          placeholder={"Address name"}
          value={this.state.name}
          onChangeText={value => this.setState({ name: value })}
        />
        <CustomTextInput
          icon={IC_LOCATION}
          placeholder={"Address name"}
          onChangeText={value => this.setState({ addressName: value })}
        />
        <CustomTextInput
          icon={IC_USER}
          placeholder={"Contact name"}
          onChangeText={value => this.setState({ contactName: value })}
        />
        <CustomTextInput
          icon={IC_PHONE}
          placeholder={"Phone number"}
          onChangeText={value => this.setState({ phoneNumber: value })}
        />
        <FixedButton
          label={"SAVE ADDRESS"}
          backgroundColor={metrics.PRIMARY_COLOR}
          labelStyle={{ color: "white" }}
          onPress={() => this.createAddressFromAddButton()}
          isLoading={this.state.isLoading}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
})
