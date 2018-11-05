import React from "react"

import AppW from "./src/screens/App"
import { createStackNavigator } from "react-navigation"
import metrics from "./src/config/metrics"

export default class App extends React.Component<any, any> {
  render() {
    return <Navigator />
  }
}

const Navigator = createStackNavigator(
  {
    App: { screen: AppW }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: metrics.PRIMARY_COLOR,
        borderBottomWidth: 0
      },
      headerTintColor: "white"
    }
  }
)
