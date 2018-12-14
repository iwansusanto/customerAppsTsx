import React from "react"
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageStyle,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Dimensions
} from "react-native"
import { NavigationStackScreenOptions, NavigationScreenProp } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Custom component used in the screen
import Text from "../../components/CustomText"
import CustomTextInput from "../../components/CustomTextInput"
import FixedButton from "../../components/FixedButton"

import UserContext from "../../contexts/UserContext"

// Configs
import metrics from "../../config/metrics"

// Assets
const OVERLAY = require("../../../assets/overlay-login.png")
const LOGO = require("../../../assets/logo-higres.png")
const ICON_USER = require("../../../assets/ic_user.png")
const ICON_PHONE = require("../../../assets/ic_phone.png")
const ICON_MAIL = require("../../../assets/ic_mail.png")
const ICON_KEY = require("../../../assets/ic_key.png")
const ICON_HELP = require("../../../assets/ic-help.png")
const ICON_BACK = require("../../../assets/ic_back.png")

const window = Dimensions.get('window');

const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width /7;

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  isLoading: boolean
  email: string
  password: string
  name: string
  phone: string
  countryCode: string
  countryPhoneCode: string
}

export default class Register extends React.Component<Props, State> {
  // Config for the header bar
  static navigationOptions = ({
    // Navigation variable to be able to call navigation-related functions in the header
    navigation
  }: {
    // Navigation variable type
    navigation: NavigationScreenProp<any, any>
  }): NavigationStackScreenOptions => {
    // Destructuring functions inside navigation object for easy use
    const { navigate, goBack } = navigation
    return {
      title: "",
      headerTitle: undefined,

      // Component rendered in the right side of the header which is a help button
      headerRight: (
        <TouchableOpacity>
          {/* <Image source={ICON_HELP} style={{ marginRight: 20 }} /> */}
        </TouchableOpacity>
      ),

      // Component rendered in the left side of the header which is a back button
      headerLeft: (
        <TouchableOpacity onPress={() => goBack(null)}>
          <Image source={ICON_BACK} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      )
    }
  }

  state = {
    isLoading: false,
    email: "",
    password: "",
    phone: "",
    name: "",
    countryCode: "QA",
    countryPhoneCode: "+974",
    animation         : new Animated.Value(0),
    animationPosition : new Animated.Value(0)
  }

  // Constructor
  constructor(props: Props) {
    super(props)

    // Function binding to this class
    this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this)
    // this.keyboardHeight = this.state.animation
  }

  keyboardHeight = () => {
    new Animated.Value(0)
  }

  componentWillMount () {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow).remove()
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide).remove()
  }
  // keyboardHeigh: () => void

  keyboardWillShow = (event: any) => {
    console.log(event)
    console.log('height : ',window.height)
    Animated.parallel([
      Animated.timing(this.state.animation, {
        duration: event.duration,
        toValue: 100,
      }),
      Animated.timing(this.state.animationPosition, {
        duration: event.duration,
        toValue: window.height - (event.endCoordinates.screenY+100),
      })
    ]).start();
  };


  keyboardWillHide = (event: any) => {
    Animated.parallel([
      Animated.timing(this.state.animation, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.state.animationPosition, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  

  // Register button press handler
  handleRegisterButtonPressed = (register: Function) => async () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })
    let { email, password, phone, name } = this.state
    phone = `${this.state.countryPhoneCode}${this.state.phone}`
    const result = await register({
      email,
      password,
      name,
      phone
    })

    this.setState({ isLoading: false })

    if (result) {
      this.props.navigation.navigate("OTP", {
        email,
        password
      })
    } else {
      // TODO: show register failed
      Alert.alert("Failed", "Your registration has failed, please try again")
    }
  }

  setCountry = (countryCode: string, countryPhoneCode: string) => {
    this.setState({
      countryCode: countryCode,
      countryPhoneCode: countryPhoneCode
    })
  }

  scroll: any

  handleKeyboardAppeared() {
    this.scroll.props.scrollToPosition(0, 100, true)
  }

  render() {
    const { email, password, phone, name } = this.state
    return (
      <UserContext.Consumer>
        {context => (
          <Animated.View style={[styles.container, { paddingBottom: this.state.animation }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
              <Animated.View style={[styles.container, { bottom: this.state.animationPosition }]}>
                <Image source={OVERLAY} style={styles.overlay as ImageStyle} />
                <Image source={LOGO} style={styles.logo as ImageStyle} />
                <Text style={styles.title}>MAKE A NEW ACCOUNT</Text>
                <Text style={styles.caption}>FILL YOUR INFO AND GET STARTED</Text>
                <View style={styles.formContainer}>
                  <CustomTextInput
                    icon={ICON_USER}
                    placeholder={"Name"}
                    onChangeText={text => this.setState({ name: text })}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        width: metrics.DEVICE_WIDTH * 0.17,
                        height: 45,
                        backgroundColor: "white",
                        borderRadius: 5,
                        marginVertical: 5,
                        marginRight: metrics.DEVICE_WIDTH * 0.03,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("CountrySelect", {
                          onSelect: this.setCountry
                        })
                      }
                    >
                      <Image
                        source={{
                          uri: `https://www.countryflags.io/${
                            this.state.countryCode
                          }/flat/64.png`
                        }}
                        style={{ width: 40, height: 40 }}
                      />
                    </TouchableOpacity>
                    <CustomTextInput
                      style={{ width: metrics.DEVICE_WIDTH * 0.6 }}
                      icon={ICON_PHONE}
                      placeholder={"Phone Number"}
                      keyboardType={"number-pad"}
                      onChangeText={text => this.setState({ phone: text })}
                    />
                  </View>
                  <CustomTextInput
                    icon={ICON_MAIL}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ email: text })}
                  />
                  <CustomTextInput
                    icon={ICON_KEY}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                  />
                </View>
                <View style={styles.tosContainer}>
                  <Text style={styles.caption}>By registering I agree to the</Text>
                  <Text style={styles.tos}>Terms of Service and Privacy Policy</Text>
                </View>
                <FixedButton
                  isLoading={this.state.isLoading}
                  label={"REGISTER"}
                  backgroundColor={
                    email.length > 0 &&
                    password.length > 0 &&
                    phone.length > 0 &&
                    name.length > 0
                      ? metrics.SECONDARY_COLOR
                      : metrics.INACTIVE_COLOR
                  }
                  onPress={this.handleRegisterButtonPressed(context.register)}
                />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
      </UserContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: metrics.PRIMARY_COLOR,
    alignItems: "center",
    flex: 1
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.4
      : metrics.DEVICE_HEIGHT * 0.47
  },

  logo: {
    marginTop: metrics.IS_IPHONE_X
      ? metrics.DEVICE_HEIGHT * 0.15
      : metrics.DEVICE_HEIGHT * 0.05
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30
  },

  caption: {
    fontSize: 16,
    color: "white",
    fontWeight: "300",
    marginTop: 5
  },

  formContainer: {
    marginTop: 30
  },

  tosContainer: {
    alignItems: "center",
    marginTop: 50
  },

  tos: {
    color: metrics.DANGER_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
})
