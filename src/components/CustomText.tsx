// Use custom text component to be able to implement a application-wide font

import React from "react"
import { Text, TextProps } from "react-native"

// Props typing
interface CustomTextProps extends TextProps {
  children: string
}

export default (props: CustomTextProps) => (
  <Text {...props} style={[{ fontFamily: "Helvetica" }, props.style]}>
    {props.children}
  </Text>
)
