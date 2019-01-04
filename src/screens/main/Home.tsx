import React, { createRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  GeolocationReturnType,
  ScrollView,
  FlatList,
  ImageStyle,
  DeviceEventEmitter,
  AsyncStorage
} from "react-native"
import { NavigationScreenProp, NavigationTabScreenOptions } from "react-navigation"
import MapView, { Region, PROVIDER_GOOGLE } from "react-native-maps"
import Geocoder from "react-native-geocoder"

// Custom component used in the screen
import HeaderOverlay from "../../components/HeaderOverlay"
import SearchBar from "../../components/SearchBar"
import strings from "../../components/language/index"
import Lang from '../../components/Lang'

// Actions
import { bindActionCreators } from 'redux'
import * as loginActions from '../../actions/loginActions'
import { connect } from 'react-redux'


// Configs
import metrics from "../../config/metrics"
import CategoryItem from "../../components/CategoryItem"

import withUserContext from "../../components/consumers/withUserContext"
import withCategoryContext from "../../components/consumers/withCategoryContext"
import withCartContext from "../../components/consumers/withCartContext"

// Assets
const ICON_POINT = require("../../../assets/point-bronze.png")
const ICON_ACTIVE = require("../../../assets/ic_home_active.png")
const ICON_INACTIVE = require("../../../assets/ic_home_inactive.png")
const ICON_MARKER = require("../../../assets/ic_marker.png")
const LOGO = require("../../../assets/logo-higres.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
  user: UserContext
  category: CategoryContext
  cart: CartContext
}

interface State {
  currentLocation: Region
  address: string
}

class Home extends React.Component<any, State> {

  private mapRef = createRef<MapView>()

  state = {
    currentLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    address: ""
  }

  constructor(props: Props) {
    super(props)
    this.onMapReady = this.onMapReady.bind(this)
  }

  onMapReady(): void {
    navigator.geolocation.getCurrentPosition(async (position: GeolocationReturnType) => {
      // Convert GeolocationReturnType to Region to be usable in Map View
      let region: Region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }

      try {
        const address = await Geocoder.geocodePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

        console.log(address)

        this.setState({ address: address[0].formattedAddress })
      } catch (err) {
        console.log(err)
      }

      const mapView = this.mapRef.current
      // Move the map to current position
      if (mapView) {
        mapView.animateToRegion(region)
        this.setState({ currentLocation: region })
      }
    })
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("shouldCartUpdate", () => this.props.cart.getCart())
  }

  async componentDidMount() {
    await this.props.category.getCategories()
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("shouldCartUpdate", () => this.props.cart.getCart())
  }

  render() {
    console.log('name', this.props)
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <StatusBar barStyle={"light-content"} />
        <Image source={LOGO} style={{ marginTop: 50 }} />
        <View style={styles.customerDetail}>
          <Lang styleLang={styles.greeting} language='homeHi'>
          {this.props.users.customer.name} !
          </Lang>
          <View>
            <View style={styles.pointContainer}>
              <View style={styles.iconPointContainer}>
                <Image source={ICON_POINT} style={styles.point_icon as ImageStyle} />
                <Text style={styles.lblIcon}>BRONZE</Text>
              </View>
              <View>
                <Text style={styles.point}>
                {this.props.users.customer.total_point}
                </Text>
                <Lang styleLang={styles.lblPoint} language='homePoints'></Lang>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.map}>
            <MapView
              ref={this.mapRef}
              showsUserLocation={true}
              onMapReady={this.onMapReady}
              region={this.state.currentLocation}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
            />
          </View>
          <View style={styles.mapOverlay}>
            <Image source={ICON_MARKER} />
            <Text style={styles.address}>{this.state.address}</Text>
          </View>
        </View>
        <Lang styleLang={styles.searchCaption} language='homeSearch'></Lang>
        <SearchBar onFocus={() => this.props.navigation.navigate("MainSearch")} />
        {/* <FlatList
          contentContainerStyle={styles.categories}
          data={this.props.category.categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CategoryItem
                title={item.name}
                picture={item.image_url}
                onPress={() =>
                  this.props.navigation.navigate("Food", {
                    suggestId: item.suggest_id,
                    header: item.name
                  })
                }
              />
            )
          }}
          horizontal
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },

  customerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: metrics.DEVICE_WIDTH * 0.9,
    marginTop: 20
  },

  greeting: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20
  },

  iconPointContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    borderRightWidth: 0.3,
    borderColor: metrics.WHITE_COLOR,
    paddingRight: 10,
    marginRight: 10
  },

  lblIcon: {
    color: metrics.GOLD_COLOR, 
    fontSize: 8, 
    paddingTop: 5
  },

  lblPoint: {
    fontSize: 12, 
    color: metrics.WHITE_COLOR
  },

  pointContainer: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  point: {
    fontFamily: "Helvetica",
    fontSize: 24,
    color: "white"
  },

  point_icon: {
    marginTop: 5
  },

  mapContainer: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: metrics.DEVICE_HEIGHT * 0.35,
    marginTop: 20
  },

  map: {
    borderRadius: 15,
    flex: 1
  },

  mapOverlay: {
    backgroundColor: metrics.PRIMARY_COLOR,
    height: 50,
    width: metrics.DEVICE_WIDTH * 0.9,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row"
  },

  address: {
    color: "white",
    fontSize: 14,
    marginLeft: 20
  },

  searchCaption: {
    fontSize: 18,
    fontWeight: "300",
    color: metrics.PRIMARY_COLOR,
    marginTop: 20,
    marginLeft: 25,
    alignSelf: "flex-start"
  },

  categories: {
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 10
  }
})

const mapStateToProps = ({ login, register }) => {
  console.log('coba regis', register)
  const { users } = login;
  return {
    users
  }       
}

const mapDispatchToProps = (dispatch) => {
  return  {
    user: bindActionCreators(loginActions, dispatch)
  }
}

// export default withCartContext(withUserContext(withCategoryContext(Home)))
export default connect( mapStateToProps, mapDispatchToProps)(Home)
