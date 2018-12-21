// Food category component, which is used in food main menu screen

import React from "react"
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Image,
  ImageStyle,
  View,
  ImageSourcePropType
} from "react-native"

// Custom component used in this component
import Text from "./CustomText"

// Configs
import metrics from "../config/metrics"

interface Props extends TouchableOpacityProps {
  label: string
  image_url: string
  name: string
}

export default (props: Props) => (
  <View style={{flex: 2}}>
    <TouchableOpacity style={styles.container} {...props}>
      <Image source={{uri: props.image_url}} style={styles.icon as ImageStyle} />
      <Text style={styles.caption}>{props.name}</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "grey",
    width: 70,
    height: 70,
    borderRadius: 10
  },

  caption: {
    fontWeight: "bold",
    fontSize: 12,
    position: "absolute",
    bottom: 5,
    alignSelf: "flex-start",
    left: 5
  },

  icon: {
    marginLeft: 5,
    marginTop: 5,
    width: 18,
    height: 18
  }
})
