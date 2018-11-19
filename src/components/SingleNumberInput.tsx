// Number input for OTP screen which only contains 1 character max

import React from "react"
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text
} from "react-native"

interface Props extends TouchableOpacityProps {
  value: string
}

export default class SingleNumberInput extends React.Component<Props> {
  // Text input reference
  private textInputRef: TextInput | null = null

  // Redeclare focus function so we can call it from higher order component
  focus = () => this.textInputRef!.focus()

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        activeOpacity={1}
        style={styles.container}
      >
        <Text style={styles.textInput}>{this.props.value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    width: 53,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },

  textInput: {
    fontSize: 36,
    fontWeight: "bold"
  }
})
