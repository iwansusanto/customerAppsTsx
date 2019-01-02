import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import withUserContext from "../../components/consumers/withUserContext"
import { NavigationScreenProp, NavigationStackScreenOptions } from "react-navigation"
import Lang from "../../components/Lang"
import strings from "../../components/language"



// const TOS_HTML = require("../../../assets/privacy.html")
interface radioItems {
  label: string
  width: number
  height: number
  color: string
  imagePath: any
  selected: boolean
  lang: string
}

interface languageState {
  radioItems: radioItems[]
  selectedItem: string
}

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: UserContext
}

class Language extends React.Component<Props, languageState> {
  static navigationOptions: NavigationStackScreenOptions = {
    title: strings.languageTitle
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      radioItems: [
        {
          label: "English",
          width: 26,
          height: 20,
          color: "#4A4A4A",
          imagePath: require("../../../assets/eng.png"),
          selected: true,
          lang: "en"
        },

        {
          label: "عربى",
          width: 26,
          height: 20,
          color: "#4A4A4A",
          selected: false,
          imagePath: require("../../../assets/qatar.png"),
          lang: "ar"
        }
      ],
      selectedItem: "en"
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.user.language !== this.state.selectedItem || this.props.user.language !== nextProps.user.language) {
      this.state.radioItems.map((item, key) => {
        if(nextProps.user.language === item.lang) {
          this.state.radioItems[key].selected = true
          this.setState({
            selectedItem: item.lang
          })
        } else {
          this.state.radioItems[key].selected = false
        }
      })
      return true
    }
      
    return false
  }

  async componentDidMount() {
    const languageStorage = await AsyncStorage.getItem("language")
    await this.props.user.changeLanguage(languageStorage)
  }

  componentWillMount = () => {
    this._onSetLanguage()
    this.props.navigation.setParams({})
  }

  _onSetLanguage = async() => {
    const languageStore = await AsyncStorage.getItem("language")
    const language = await strings.setLanguage(languageStore)
    console.log("STRING", languageStore, language)
    return language
  }


  async changeActiveRadioButton(index) {
    console.log('changeActiveRadioButton:', index)
    await this.state.radioItems.map(item => {
      item.selected = false
    })

    this.state.radioItems[index].selected = true
    await this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].lang })
    })


    const data = await this.state.selectedItem
    await AsyncStorage.setItem("language", data)
    await this.props.user.changeLanguage(this.state.radioItems[index].lang)
    await this.props.navigation.navigate('SplashScreen')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{
              width: null,
              height: null,
              flex: 1
            }}
            resizeMode="cover"
            source={require("../../../assets/curve-background.png")}
          >
            <View
              style={{
                marginLeft: 25,
                marginTop: 30
              }}
            >
              <Lang
                styleLang={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontFamily: "Helvetica-Light"
                }}
                language='languageInfo'
              >
              </Lang>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "#FFF",
                  alignItems: "center",
                  marginLeft: 17,
                  marginRight: 17,
                  borderRadius: 15,
                  marginTop: 25
                }}
              >
                <View
                  style={{
                    borderRadius: 15,
                    height: 90,
                    width: "100%",
                    marginTop: 12
                  }}
                >
                  {this.state.radioItems.map((item, key) => {
                    return (
                      <TouchableOpacity
                        onPress={this.changeActiveRadioButton.bind(this, key)}
                        activeOpacity={0.8}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                        key={key}
                      >
                        <View
                          style={{
                            width: 341,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <View
                            style={{
                              width: "20%",
                              alignSelf: "center",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            {item.selected ? (
                              <Icon
                                type={"MaterialIcons"}
                                name={"check"}
                                style={{ fontSize: 20, color: "#660099ff" }}
                              />
                            ) : null}
                          </View>
                          <View
                            style={{
                              width: "65%",
                              flexDirection: "row",
                              borderBottomWidth: 1,
                              borderBottomColor: "rgba(151, 151, 151, 0.12)",
                              marginRight: "15%",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              paddingVertical: 12
                            }}
                          >
                            <View style={{ width: "20%" }}>
                              <Image
                                source={item.imagePath}
                                style={{
                                  width: item.width,
                                  height: item.height
                                }}
                                resizeMode={"contain"}
                              />
                            </View>
                            <View style={{ width: "65%", alignSelf: "center" }}>
                              <Text
                                style={[
                                  {
                                    fontSize: 16,
                                    marginLeft: 10,
                                    fontWeight: "bold"
                                  },
                                  { color: item.color }
                                ]}
                              >
                                {item.label}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
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


export default withUserContext(Language)
