import React from "react"
import { ScrollView, StyleSheet } from "react-native"

import Text from "../../components/CustomText"
import { NavigationStackScreenOptions } from "react-navigation"

export default class PrivacyPolicy extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Privacy Policy"
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nisl sit amet
          neque finibus tempor. Donec eu dui id leo rutrum maximus. Pellentesque fermentum
          tellus vitae mollis molestie. Nam sit amet velit ullamcorper, pulvinar libero
          non, lacinia tellus. Nullam id quam vitae libero tincidunt vulputate. Aenean et
          tellus pulvinar, mollis tellus eu, aliquam neque. Sed eu arcu vitae justo
          condimentum ultricies at id orci. Ut ornare felis vitae condimentum lobortis.
          Nulla quis neque a nisl dapibus mollis. Vivamus sed auctor arcu, quis bibendum
          leo. Nam vitae dui sed ex iaculis dapibus. Integer ante est, lobortis vel
          aliquet sit amet, commodo vestibulum ligula. Aenean sed aliquam leo, sit amet
          aliquam sem. Quisque iaculis diam urna, vitae tempor eros malesuada nec. Etiam
          eu porta metus. Nam placerat at tellus et pulvinar. Proin pretium fermentum
          mauris. Nunc ultrices, lectus in convallis euismod, diam tellus rhoncus risus,
          vitae maximus leo nunc eget orci. Etiam viverra nec lectus ut mattis. Praesent
          sit amet ex et arcu sodales viverra. Suspendisse venenatis purus turpis, et
          semper diam sagittis auctor. Suspendisse vehicula velit id ex blandit, sed
          consectetur arcu viverra. Nam sem leo, varius pretium consectetur in, cursus nec
          diam. Suspendisse placerat, eros eu molestie elementum, sapien ipsum dictum mi,
          ut posuere nunc est vitae lacus. Ut in luctus massa. Suspendisse non eros sit
          amet nulla condimentum dictum et quis urna. Quisque velit mauris, mattis sit
          amet dolor sed, molestie posuere quam. Suspendisse augue libero, elementum sit
          amet efficitur ac, tincidunt sit amet nulla. Nullam in lorem mollis, iaculis
          augue sit amet, scelerisque risus. In iaculis nec ipsum a fringilla. Vivamus
          dolor mauris, accumsan a orci quis, egestas viverra leo. Proin porta blandit
          tristique. Integer ac imperdiet mi. Duis vitae nulla vitae nulla commodo porta.
          Donec mattis quam felis, in aliquam elit suscipit eget. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam
          ut lacus vitae purus gravida imperdiet a quis eros. Pellentesque ut arcu
          molestie, laoreet ipsum a, pretium metus. Curabitur iaculis vel sem rhoncus
          commodo. Fusce sagittis tempus sapien, vitae malesuada nisi euismod vel.
          Praesent ornare sagittis imperdiet. Aliquam faucibus, nisi in convallis auctor,
          urna augue dignissim elit, ultricies varius elit mi quis erat. Nulla vulputate
          semper vehicula. Nam porta odio nec ante consectetur, et cursus ex rutrum.
          Praesent fermentum lorem et nulla pellentesque porttitor. Donec vitae purus ut
          nibh placerat venenatis in vitae ex. Pellentesque venenatis dui nec convallis
          feugiat. Curabitur congue nulla volutpat turpis pretium, at facilisis felis
          aliquet. Nulla convallis elit at elit rhoncus, sed accumsan nunc aliquet.
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  }
})
