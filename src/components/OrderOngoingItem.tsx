import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageStyle
} from "react-native"
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native"
import moment from "moment"
import metrics from "../config/metrics"

import Text from "../components/CustomText"

const PICTURE = require("../../assets/dummy_order.png")
const ICON_PHONE = require("../../assets/ic_phone_fill.png")
const ICON_MESSAGE = require("../../assets/ic_message.png")
const ICON_ARROW = require("../../assets/ic_arrow_blue.png")
const ICON_CANCEL = require("../../assets/ic_cancel.png")
const ICON_WALLET = require("../../assets/ic_wallet.png")

interface Props extends TouchableOpacityProps {
  name: string
  statusText: string
  date: string
  paymentMethod: string
  displayPrice: string
}

interface State {
  collapsed: boolean
}

export default class Orders extends React.Component<Props, State> {  
  constructor(props){
    super(props);
    this.state = {
      collapsed:false,//do not show the body by default
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} {...this.props}>
        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
          <Image source={PICTURE} style={styles.image as ImageStyle} />
          <View style={styles.detailContainer}>
            <View style={styles.titleCard}>
              <Text style={styles.title}>{this.props.name}</Text>
              {this.props.statusText === 'SCHEDULED' && (
                <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({collapsed:!this.state.collapsed})}>
                    <Image source={ICON_ARROW} style={styles.image as ImageStyle} />  
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.status}>{this.props.statusText}</Text>
            <Text style={styles.date}>{moment(this.props.date).format("DD MMM, hh:mm a")}</Text>
          </View>
          {this.props.statusText !== 'SCHEDULED' && (
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Image source={ICON_PHONE} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={ICON_MESSAGE} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{flex: 1}}>
          <Collapse
            isCollapsed={this.state.collapsed}
            onToggle={(isCollapsed) => this.setState({ collapsed: isCollapsed })}
          >
            <CollapseHeader></CollapseHeader>
            <CollapseBody>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20}}>
                <View style={{flex: 1}}></View>                
                <View style={{flex: 9, marginLeft: 8}}>
                  <Text style={styles.deliveryTitle}>Delivery note</Text>
                  <Text style={styles.deliveryDesc}>
                    just claps three times once arrived in front of my door. the bell is broken btw.
                  </Text>
                </View>
              </View>
              <View style={styles.stroke}></View>
              <View style={{flexDirection: 'row', flex: 1, paddingHorizontal: 20}}>
                <Text style={styles.paymentTitle}>Payment method</Text>
                <View style={{flexDirection: 'row', flex: 2}}>
                  <Text>{this.props.paymentMethod}</Text>
                  <Image source={ICON_WALLET} style={styles.imageWallet as ImageStyle} />
                </View>
              </View>
              <View style={{flexDirection: 'row', flex: 1, paddingHorizontal: 20, paddingVertical: 10}}>
                <Text style={styles.paymentTitle}>Total</Text>
                <View style={{flexDirection: 'row', flex: 2}}>
                  <Text style={styles.totalLabel}>{this.props.displayPrice}</Text>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
    
        {this.props.statusText === 'SCHEDULED' && (
          <View style={styles.bottomEdgeContainer}>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: 10, height: 10, borderRadius: 10, backgroundColor: metrics.DANGER_COLOR}}></View>
            </View>
            <View style={{flex: 7}}>
              <Text style={styles.scheduleDay}>Tomorrow, Jan 15</Text>
              <Text style={styles.scheduleTime}>10:15 - 10:45</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => alert('Click')}>
                <Image source={ICON_CANCEL} style={styles.image as ImageStyle} />  
              </TouchableOpacity>
            </View>
          </View>
        )}  
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.9,
    borderRadius: 5,
    backgroundColor: "white",
    // flexDirection: "row",
    // padding: 20,
    marginVertical: 5,
    shadowColor: metrics.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },
  bottomEdgeContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    paddingBottom: 10, 
    paddingTop: 5,
    backgroundColor: metrics.BACKGROUND_GRAY, 
    borderBottomRightRadius: 5, 
    borderBottomLeftRadius: 5
  },
  scheduleDay: {
    fontSize: 12,
    color: metrics.INACTIVE_COLOR
  },
  scheduleTime: {
    fontSize: 11,
    color: metrics.INACTIVE_COLOR
  },
  deliveryTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  deliveryDesc: {
    fontSize: 12,
    color: metrics.INACTIVE_COLOR,
    paddingTop: 3,
  },
  stroke: {
    borderWidth: 0.5, 
    borderColor: metrics.SHADOW_COLOR,
    marginVertical: 6,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 8
  },
  totalLabel: {
    fontSize: 12
  },
  titleCard: {
    flex: 1, 
    flexDirection: 'row'
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 5
  },

  title: {
    fontWeight: "bold",
    fontSize: 13,
    flex: 9
  },

  status: {
    color: "#7ED321",
    fontSize: 11,
    fontWeight: "bold",
    marginVertical: 5
  },

  date: {
    fontSize: 10
  },

  image: {
    alignSelf: "center"
  },
  imageWallet:{
    alignSelf: "center",
    marginLeft: 15,
    width: 11,
    height: 11
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2,
    paddingHorizontal: 10
  }
})
