import React from "react"
import { View, StyleSheet, DeviceEventEmitter, Alert } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import FixedButton from "../../components/FixedButton"
import metrics from "../../config/metrics"
import api from "../../utils/api"

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
  lat: number
  lng: number
}

export default class NewAddress extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "New Address"
  }

  state = {
    name: "",
    addressName: "",
    contactName: "",
    phoneNumber: "",
    isLoading: false,
    lat: 0,
    lng: 0
  }

  componentDidMount() {
    const address = this.props.navigation.getParam("address")
    const editAddress = this.props.navigation.getParam("editAddress")
    if (address) {
      this.setState({
        name: address.name,
        addressName: address.address,
        lat: address.latitude,
        lng: address.longitude
      })
    } else {
      this.setState({
        name: editAddress.address,
        addressName: editAddress.label,
        lat: editAddress.lat,
        lng: editAddress.lng,
        phoneNumber: editAddress.phone,
        contactName: editAddress.fullname
      })
    }
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

  editAddress = async () => {
    this.setState({ isLoading: true })
    const place = this.state
    try {
      const { data } = await api.client.post<any>(
        `/address/${this.props.navigation.getParam("editAddress").id}`,
        {
          address: place.name,
          lat: place.lat,
          lng: place.lng,
          phone: place.phoneNumber,
          fullname: place.contactName,
          label: place.addressName
        }
      )
      DeviceEventEmitter.emit("addressAdd")
      this.props.navigation.goBack(null)
    } catch (err) {
      Alert.alert("Error", err.message)
    }
    this.setState({ isLoading: false })
  }

  render() {
    const place = this.props.navigation.getParam("address")
    console.log(place)
    console.log(this.props.navigation.getParam("editAddress"))
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
          value={this.state.addressName}
          onChangeText={value => this.setState({ addressName: value })}
        />
        <CustomTextInput
          icon={IC_USER}
          placeholder={"Contact name"}
          value={this.state.contactName}
          onChangeText={value => this.setState({ contactName: value })}
        />
        <CustomTextInput
          icon={IC_PHONE}
          placeholder={"Phone number"}
          value={this.state.phoneNumber}
          onChangeText={value => this.setState({ phoneNumber: value })}
        />
        <FixedButton
          label={"SAVE ADDRESS"}
          backgroundColor={metrics.PRIMARY_COLOR}
          labelStyle={{ color: "white" }}
          onPress={() =>
            this.props.navigation.getParam("address")
              ? this.createAddressFromAddButton()
              : this.editAddress()
          }
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
