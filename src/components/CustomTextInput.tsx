// Custom text input which contains an icon, white background color, and border radius

import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TextInputProps,
  ImageSourcePropType
} from "react-native"

// Configs
import metrics from "../config/metrics"

// Props typing
interface CustomTextInputProps extends TextInputProps {
  icon: ImageSourcePropType
}

export default (props: CustomTextInputProps) => {
  const { style, ...otherProps } = props
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image source={props.icon} style={styles.icon} resizeMode={"contain"} />
      </View>
      <TextInput {...otherProps} style={styles.textInput} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.8,
    height: 45,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 5,
    marginVertical: 5
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  icon: {
    width: 20,
    height: 20
  },

  textInput: {
    flex: 5
  }
})
