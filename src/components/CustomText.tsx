import React from "react"
import { Text, TextProps } from "react-native"

interface CustomTextProps extends TextProps {
  children: string
}

export default (props: CustomTextProps) => (
  <Text {...props} style={[{ fontFamily: "Helvetica" }, props.style]}>
    {props.children}
  </Text>
)
