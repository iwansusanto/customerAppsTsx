// Custom text input which contains an icon, white background color, and border radius

import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TextInputProps,
  ImageSourcePropType,
  ImageStyle
} from "react-native"

// Configs
import metrics from "../config/metrics"
import LangInput from '../components/LangInput'


// Props typing
interface CustomTextInputProps extends TextInputProps {
  icon: ImageSourcePropType
}

export default (props: CustomTextInputProps) => {
  const { style, ...otherProps } = props
  // console.log('coba props', props)
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={props.icon}
          style={styles.icon as ImageStyle}
          resizeMode={"contain"}
        />
      </View>
      <TextInput {...otherProps} style={styles.textInput} />
      {/* <LangInput {...otherProps} styleLang={styles.textInput} language={props.placeholder}/> */}
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
