import React from "react"
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from "react-native"

import { NavigationStackScreenOptions } from "react-navigation"

// const TOS_HTML = require("../../../assets/privacy.html")

export default class Language extends React.Component {
  static navigationOptions: NavigationStackScreenOptions = {
    title: "Mshwar Language"
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{
              // width: null,
              // height: null,
              flex: 1
            }}
            resizeMode="cover"
            source={require("../../../assets/curve-background.png")}
          >
            <View
              style={{
                // marginLeft: wp(w(25)),
                // marginTop: hp(h(5))
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  // fontSize: hp(h(18)),
                  fontFamily: "Helvetica-Light"
                }}
              >
                Pick the right language for you
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              {/* <Card
                title={"English"}
                style={{
                  backgroundColor: "#FFF",
                  alignItems: "center",
                  marginLeft: 17,
                  marginRight: 17,
                  borderRadius: 15,
                  marginTop: 25
                }}
              >
                <CardItem
                  cardBody
                  style={{
                    borderRadius: 15,
                    height: hp(h(height)),
                    width: "100%",
                    marginTop: hp(h(12))
                  }}
                >
                  <Body>
                    {this.state.radioItems.map((item, key) => (
                      <RadioButton
                        key={key}
                        button={item}
                        onClick={this.changeActiveRadioButton.bind(this, key)}
                      />
                    ))}
                  </Body>
                </CardItem>
              </Card> */}
            </View>
          </ImageBackground>
        </View>
      </View>
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
