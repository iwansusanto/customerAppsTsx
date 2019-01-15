import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native"

import Icon from "react-native-vector-icons/MaterialIcons"
import { NavigationScreenProp, NavigationStackScreenOptions } from "react-navigation"
import Lang from "../../components/Lang"
import strings from "../../components/language"

// Actions
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'


const BACKGROUND_IMAGE = require("../../../assets/curve-background.png")
const FLAG_EN = require("../../../assets/eng.png")
const FLAG_QATAR = require("../../../assets/qatar.png")

interface radioItems {
  label: string
  imagePath: any
  lang: string
}

interface languageState {
  radioItems: radioItems[]
}

interface Props {
  navigation: NavigationScreenProp<any, any>
  user: {
    changeLanguage: Function
  }
  language: string
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
          imagePath: FLAG_EN,
          lang: "en"
        },

        {
          label: "عربى",
          imagePath: FLAG_QATAR,
          lang: "ar"
        }
      ]
    }
  }

  async componentDidMount() {
    const languageStorage = this.props.language ? this.props.language : 'en'
    await this.props.user.changeLanguage(languageStorage)
  }

  componentWillMount = () => {
    this._onSetLanguage()
    this.props.navigation.setParams({})
  }

  _onSetLanguage = async() => {
    return await strings.setLanguage(this.props.language)
  }


  async changeActiveRadioButton(index) {
    await this.props.user.changeLanguage(this.state.radioItems[index].lang)
    await this.props.navigation.navigate('SplashScreen')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.background}
            resizeMode="cover"
            source={BACKGROUND_IMAGE}
          >
            <View style={styles.titleWrapper}>
              <Lang
                styleLang={styles.langTitle}
                language='languageInfo'
              >
              </Lang>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.card}>
                  {this.state.radioItems.map((item, key) => {
                    return (
                      <TouchableOpacity
                        onPress={this.changeActiveRadioButton.bind(this, key)}
                        activeOpacity={0.8}
                        style={styles.radioButtonWrapper}
                        key={key}
                      >
                        <View style={styles.radioButtonInner}>
                          <View style={styles.iconWrapper}>
                            {this.props.language === item.lang ? (
                              <Icon
                                type={"MaterialIcons"}
                                name={"check"}
                                style={styles.iconColor}
                              />
                            ) : null}
                          </View>
                          <View style={styles.flagWrapper}>
                            <View style={{ width: "20%" }}>
                              <Image
                                source={item.imagePath}
                                style={styles.flagImage}
                                resizeMode={"contain"}
                              />
                            </View>
                            <View style={styles.flagInner}>
                              <Text
                                style={[
                                  styles.labelFlag
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
    backgroundColor: "#FFF",
    alignItems: "center",
    marginLeft: 17,
    marginRight: 17,
    borderRadius: 15,
    marginTop: 25
  },
  card: {
    borderRadius: 15,
    height: 90,
    width: "100%",
    marginTop: 12
  },
  background: {
    width: null,
    height: null,
    flex: 1
  },
  titleWrapper: {
    marginLeft: 25,
    marginTop: 30
  },
  langTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Helvetica-Light"
  },
  flagWrapper: {
    width: "65%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(151, 151, 151, 0.12)",
    marginRight: "15%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12
  },
  flagInner: {
    width: "65%", 
    alignSelf: "center"
  },
  flagImage: {
    width: 26,
    height: 20
  },
  labelFlag: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: '#4A4A4A',
  },
  iconWrapper: {
    width: "20%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  iconColor: {
    fontSize: 20, 
    color: "#660099ff"
  },
  radioButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonInner: {
    width: 341,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})

const mapStateToProps = ({ user }) => {
  const { language } = user;
  return {
    language
  }       
}

const mapDispatchToProps = (dispatch) => {
  return {
    user: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Language)
