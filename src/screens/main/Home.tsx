import React, { createRef } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  GeolocationReturnType
} from "react-native"
import { NavigationScreenProp, NavigationTabScreenOptions } from "react-navigation"
import MapView, { Region } from "react-native-maps"

// Custom component used in the screen
import HeaderOverlay from "../../components/HeaderOverlay"

// Configs
import metrics from "../../config/metrics"

// Assets
const ICON_POINT = require("../../../assets/point.png")
const ICON_ACTIVE = require("../../../assets/ic_home_active.png")
const ICON_INACTIVE = require("../../../assets/ic_home_inactive.png")
const ICON_MARKER = require("../../../assets/ic_marker.png")

// Props typing
interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  currentLocation: Region
}

export default class Home extends React.Component<Props, State> {
  // Tab bar configs
  static navigationOptions: NavigationTabScreenOptions = {
    // Tab title
    title: "Home",
    // Tab icon according to the focused state of the tab
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

  private mapRef = createRef<MapView>()

  state = {
    currentLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  constructor(props: Props) {
    super(props)
    this.onMapReady = this.onMapReady.bind(this)
  }

  onMapReady(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationReturnType) => {
      // Convert GeolocationReturnType to Region to be usable in Map View
      let region: Region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
      const mapView = this.mapRef.current
      // Move the map to current position
      if (mapView) {
        mapView.animateToRegion(region)
        this.setState({ currentLocation: region })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderOverlay />
        <StatusBar barStyle={"light-content"} />
        <View style={styles.customerDetail}>
          <Text style={styles.greeting}>Hi Adi!</Text>
          <View>
            <Text style={styles.current_point}>your current points</Text>
            <View style={styles.pointContainer}>
              <Image source={ICON_POINT} style={styles.point_icon} />
              <Text style={styles.point}>2.000</Text>
            </View>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            ref={this.mapRef}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onMapReady={this.onMapReady}
            region={this.state.currentLocation}
            style={styles.map}
          />
          <View style={styles.mapOverlay}>
            <Image source={ICON_MARKER} />
            <Text style={styles.address}>Jl. Kenangan Indah No. 1</Text>
          </View>
        </View>
        <Text style={styles.searchCaption}>Search by vendors, foods, or items</Text>
        <Button
          title={"Login"}
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  customerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: metrics.DEVICE_WIDTH * 0.9
  },

  greeting: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20
  },

  current_point: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "100",
    fontSize: 14
  },

  pointContainer: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  point: {
    fontFamily: "Helvetica",
    fontSize: 24,
    marginLeft: 5,
    color: "white"
  },

  point_icon: {
    marginTop: 5
  },

  mapContainer: {
    width: metrics.DEVICE_WIDTH * 0.9,
    height: metrics.DEVICE_HEIGHT * 0.4,
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
    fontWeight: "100",
    color: metrics.PRIMARY_COLOR,
    marginTop: 20,
    marginLeft: 25,
    alignSelf: "flex-start"
  }
})
