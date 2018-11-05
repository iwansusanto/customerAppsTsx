// Number input for OTP screen which only contains 1 character max

import React from "react"
import { TextInput, View, StyleSheet, TextInputProps } from "react-native"

// Props typing
interface SingleNumberInputProps extends TextInputProps {
  ref?: any
}

export default class SingleNumberInput extends React.Component<
  SingleNumberInputProps,
  any
> {
  // Text input reference
  private textInputRef: TextInput | null = null

  // Redeclare focus function so we can call it from higher order component
  focus = () => this.textInputRef!.focus()

  render() {
    const props: SingleNumberInputProps = this.props
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          maxLength={1}
          keyboardType={"numeric"}
          {...props}
          ref={ref => (this.textInputRef = ref)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 50,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },

  textInput: {
    fontSize: 36,
    fontWeight: "bold"
  }
})
