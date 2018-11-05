import React from "react"
import { TextInput, View, StyleSheet, TextInputProps } from "react-native"

interface SingleNumberInputProps extends TextInputProps {
  ref?: any
}

export default class SingleNumberInput extends React.Component<
  SingleNumberInputProps,
  any
> {
  private textInputRef: TextInput | null = null

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
