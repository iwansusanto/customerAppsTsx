import React from "react"
import { View, StyleSheet, Image, FlatList, AsyncStorage } from "react-native"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions, NavigationScreenProp, NavigationStackScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import HeaderOverlay from "../../components/HeaderOverlay"
import InboxItem from "../../components/InboxItem"
import withInboxContext from "../../components/consumers/withInboxContext";
import strings from "../../components/language"
import withUserContext from "../../components/consumers/withUserContext";


const ICON_ACTIVE = require("../../../assets/ic_mail_active.png")
const ICON_INACTIVE = require("../../../assets/ic_mail_inactive.png")

interface Props {
  inbox: InboxContext
  user: UserContext
}

interface State {
  title: string
}

class Inbox extends React.Component<Props, State> {
  
  // static navigationOptions: NavigationTabScreenOptions = {
  //   // title: strings.inboxTab,
  //   tabBarLabel: () => {
  //     console.log('props.user',Props)
  //     return (
  //       <Text>{this.props.user}</Text>
  //     )
  //   },
  //   tabBarIcon: ({ focused }) => {
  //     switch (focused) {
  //       case true:
  //         return (
  //           <Image
  //             source={ICON_ACTIVE}
  //             resizeMode={"contain"}
  //             style={metrics.TAB_BAR_ICON_STYLE}
  //           />
  //         )
  //       case false:
  //         return (
  //           <Image
  //             source={ICON_INACTIVE}
  //             resizeMode={"contain"}
  //             style={metrics.TAB_BAR_ICON_STYLE}
  //           />
  //         )
  //     }
  //   }
  // }
  static navigationOptions = ({
    // Navigation variable to be able to call navigation-related functions in the header
    navigation
  }: {
    // Navigation variable type
    navigation: NavigationScreenProp<any, any>
  }): NavigationTabScreenOptions => {
    // Destructuring functions inside navigation object for easy use
    const { navigate, goBack } = navigation
    return {
      // title: navigation.state.params.header,
      tabBarLabel: (props) => {
        return (
          <Text>{strings.inboxTab}</Text>
        )
      },
      tabBarIcon: ({ focused }) => {
        switch (focused) {
          case true:
            return (
              <Image
                source={ICON_ACTIVE}
                resizeMode={"contain"}
                style={metrics.TAB_BAR_ICON_STYLE}
              />
            )
          case false:
            return (
              <Image
                source={ICON_INACTIVE}
                resizeMode={"contain"}
                style={metrics.TAB_BAR_ICON_STYLE}
              />
            )
        }
      }
    }
  }

  async componentDidMount() {
    console.log(this.props)
    try {
      const result = await this.props.inbox.getInbox()
      if (result) {

      }
    } catch(err) {
      console.log(err)
    }
  }

  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    console.log("STRING", languageStore, language)
    return language
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Text style={styles.title}>{strings.inboxTitle}</Text>
        <Text style={styles.subtitle}>{strings.inboxInfo}</Text>
        <FlatList
          data={this.props.inbox.inboxs}
          keyExtractor={item => item.id.toString()}
          renderItem={() => <InboxItem />}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
    marginTop: 20
  },

  list: {
    paddingTop: 20
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    marginLeft: 20,
    alignSelf: "flex-start"
  }
})

export default withUserContext(withInboxContext(Inbox))