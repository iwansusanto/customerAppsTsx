import React from "react"
import { View, StyleSheet, Image, FlatList, AsyncStorage } from "react-native"

import Text from "../../components/CustomText"
import metrics from "../../config/metrics"
import HeaderOverlay from "../../components/HeaderOverlay"
import InboxItem from "../../components/InboxItem"
import withInboxContext from "../../components/consumers/withInboxContext";
import Lang from '../../components/Lang'

interface Props {
  inbox: InboxContext
}

interface State {
  title: string
}

class Inbox extends React.Component<Props, State> {
  
  constructor(props) {
    super(props)
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

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <Lang styleLang={styles.title} language='inboxTitle'></Lang>
        <Lang styleLang={styles.subtitle} language='inboxInfo'></Lang>
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

export default withInboxContext(Inbox)