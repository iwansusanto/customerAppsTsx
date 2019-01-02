// Custom button component

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

// Custom component used in this component
import Text from "./CustomText"
import metrics from "../config/metrics";
import Lang from '../components/Lang'


// Props typing
interface CustomButtonProps extends TouchableOpacityProps {
  label: string
  icon?: ImageSourcePropType
  labelStyle?: StyleProp<TextStyle>
}

export default (props: CustomButtonProps) => {
  // Destructure props object to extract style so style prop does not override this component's style
  const { style, ...otherProps } = props
  return (
    <TouchableOpacity style={[styles.container, style]} {...otherProps}>
      {props.icon ? <Image source={props.icon} style={styles.icon} /> : null}
      <Lang styleLang={[styles.label, props.labelStyle]} language={props.label}></Lang>
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
    fontWeight: "bold",
    color: metrics.WHITE_COLOR
  },

  icon: {
    marginRight: 15
  }
})
