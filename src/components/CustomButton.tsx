import React from "react"
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  Image
} from "react-native"
import Text from "./CustomText"

interface CustomButtonProps extends TouchableOpacityProps {
  label: string
  icon?: ImageSourcePropType
  labelStyle?: StyleProp<TextStyle>
}

export default (props: CustomButtonProps) => {
  const { style, ...otherProps } = props
  return (
    <TouchableOpacity style={[styles.container, style]} {...otherProps}>
      {props.icon ? <Image source={props.icon} style={styles.icon} /> : null}
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    flexDirection: "row"
  },

  label: {
    fontSize: 13,
    fontWeight: "bold"
  },

  icon: {
    marginRight: 15
  }
})
