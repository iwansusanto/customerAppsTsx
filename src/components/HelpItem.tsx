import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacityProps,
  TouchableOpacity
} from "react-native"

import Text from "./CustomText"
import metrics from "../config/metrics"

const ICON_ARROW = require("../../assets/ic_arrow_blue.png")

interface Props extends TouchableOpacityProps {
  title: string
  content: Array<string>
  // content: string
  isContentVisible: boolean
}

interface State {
  isContentVisible: boolean
}

export default class HelpItem extends React.Component<Props, State> {
  state = {
    isContentVisible: this.props.isContentVisible
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ isContentVisible: nextProps.isContentVisible })
  }

  render() {
    return (
      <View style={styles.container} {...this.props}>
        <View style={styles.titleContainer}>
          <Text>{this.props.title}</Text>
{/*           
          <Image source={ICON_ARROW} />
          */}
        </View>
        {this.state.isContentVisible ? (
          <View>
            {this.props.content.map(paragraph => (
              <Text style={styles.paragraph}>{paragraph}</Text>
            ))}
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    paddingHorizontal: 10
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: "#EEEEEE"
  },

  paragraph: {
    fontSize: 14,
    marginTop: 20
  }
})
