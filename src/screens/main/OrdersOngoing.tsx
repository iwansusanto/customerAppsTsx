import React from "react"
import { View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native"
import moment from "moment"

import Text from "../../components/CustomText"
import { NavigationTabScreenOptions } from "react-navigation"
import metrics from "../../config/metrics"
import OrderOngoingItem from "../../components/OrderOngoingItem"
import HeaderOverlay from "../../components/HeaderOverlay"
import api from "../../utils/api"
import strings from "../../components/language"
import Lang from "../../components/Lang"
import { keys } from '../../config/keys'
import { getData } from '../../utils/storage'

// Actions
import { bindActionCreators } from 'redux'
import * as ordersActions from '../../actions/ordersActions'
import { connect } from 'react-redux'

interface State {
  isDataLoading: boolean
  data: Array<any>
}

interface Props {
  orders: {
    fetchOrderOngoing: Function
  }
  dataOnGoing: Array<any>,
  loading: boolean
}

class Orders extends React.Component<Props, State> {
  state = {
    isDataLoading: true,
    data: [],
  }

  async componentDidMount() {
    await this.props.orders.fetchOrderOngoing()
    await this.setState({ 
      isDataLoading: this.props.loading,
      data: this.props.dataOnGoing })
  }
  _onSetLanguage = async () => {
    const languageStore = await getData(keys.language)
    return await strings.setLanguage(languageStore)
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  render() {
    // console.log('this.props.dataOnGoing : ', this.props.dataOnGoing.length)
    return (
      <View style={styles.container}>
        {this.props.dataOnGoing.length === 0 && (
          <Lang
            styleLang={styles.subtitle}
            language="ordersEmpty"
          />
        )}

        {this.props.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={metrics.PRIMARY_COLOR} />
          </View>
        )}

        <FlatList
          data={this.props.dataOnGoing}
          // extraData={this.props}
          renderItem={({ item }: { item: any }) => {
            return (
              <OrderOngoingItem
                id={item.id}
                name={item.name}
                date={item.ordered_at}
                dateCreated={item.created_at}
                statusText={item.status_text}
                paymentMethod={item.payment_method}
                displayPrice={item.display_price}
                comment={item.comment}
                productData={item.product_data}
                phone={item.phone}
                statusDisplay={item.status_display}
                // loading={this.props.loading}
              />
            )
          }}
          style={styles.list}
          refreshing={this.props.loading}
          onRefresh={() => this.componentDidMount()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  list: {
    paddingTop: 20
  },

  title: {
    fontSize: 23,
    color: "white",
    marginTop: 50,
    alignSelf: "flex-start",
    marginLeft: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "white",
    marginTop: 20
  },
  loading: {
    flex: 1,
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ orders }) => {
  const { dataOnGoing, loading, error } = orders;
  // console.log('dataOnGoing : ', dataOnGoing)
  return {
    dataOnGoing,
    loading,
    error
  }       
}

const mapDispatchToProps = (dispatch) => {
  return {
    orders: bindActionCreators(ordersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)