import React from "react"
import { View, StyleSheet } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import CustomTextInput from "../../components/CustomTextInput"
import CustomButton from "../../components/CustomButton"
import FixedButton from "../../components/FixedButton"
import metrics from "../../config/metrics"

const IC_LOCATION = require("../../../assets/ic_location.png")
const IC_USER = require("../../../assets/ic_person.png")
const IC_PHONE = require("../../../assets/ic_phone_fill.png")

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default class NewAddress extends React.Component<Props, any> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "New Address"
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomTextInput
          icon={IC_LOCATION}
          placeholder={"Address name"}
          value={this.props.navigation.getParam("address")}
        />
        <CustomTextInput icon={IC_LOCATION} placeholder={"Address name"} />
        <CustomTextInput icon={IC_USER} placeholder={"Contact name"} />
        <CustomTextInput icon={IC_PHONE} placeholder={"Phone number"} />
        <FixedButton
          label={"SAVE ADDRESS"}
          backgroundColor={metrics.PRIMARY_COLOR}
          labelStyle={{ color: "white" }}
          onPress={() => this.props.navigation.goBack(null)}
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
