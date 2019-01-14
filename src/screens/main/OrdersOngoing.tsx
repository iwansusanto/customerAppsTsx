import React from "react"
import { View, StyleSheet, Image, FlatList } from "react-native"
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

interface State {
  isDataLoading: boolean
  data: Array<any>
}

export default class Orders extends React.Component<any, State> {
  state = {
    isDataLoading: true,
    data: [
      {'id': 1, 'name': 'Home', 'ordered_at': '2019-01-07 07:03:57', 'status_text': 'ONGOING'},
      {
        'id': 2, 
        'name': 'Hotel',
        'phone': '6287888111778', 
        'ordered_at': '2018-12-07 08:03:57', 
        'status_text': 'SCHEDULED',
        'payment_method': 'cash',
        'display_price': 'QR1.2',
        'comment': 'Much topping strawberry',
        'product_data': [
          {
            "id": 967,
            "product_id": 837,
            "order_id": 1687,
            "price": "5",
            "quantity": 1,
            "product_data": "",
            "created_at": "2019-01-07 07:03:57",
            "updated_at": "2019-01-07 07:03:57",
            "name": "Cheeseburger",
            "description": "Cheeseburger Desc"
        },
        {
          "id": 1067,
          "product_id": 8370,
          "order_id": 16871,
          "price": "5",
          "quantity": 10,
          "product_data": "",
          "created_at": "2019-01-07 07:03:57",
          "updated_at": "2019-01-07 07:03:57",
          "name": "Fried Rice",
          "description": "No salad please"
      }
        ]},
      {
        'id': 3, 
        'name': 'Villa', 
        'phone': '6287888111778',
        'ordered_at': '2018-11-07 14:03:57', 
        'status_text': 'SCHEDULED',
        'payment_method': 'cash',
        'display_price': 'QR5.0',
        'comment': 'Call me before deliver my order',
        'product_data': [
          {
              "id": 965,
              "product_id": 411,
              "order_id": 1685,
              "price": "20",
              "quantity": 1,
              "product_data": "",
              "created_at": "2019-01-02 06:37:57",
              "updated_at": "2019-01-02 06:37:57",
              "name": "Lemon and Lentil Soup",
              "description": "Lemon and Lentil Soup Desc"
          }
      ],}
    ]
  }

  async componentDidMount() {
    // this.setState({ isDataLoading: true })
    // const { data } = await api.client.get<any>("/orders")
    // console.log(data)
    // this.setState({ data: data, isDataLoading: false })
    this.setState({ isDataLoading: false })
  }
  _onSetLanguage = async () => {
    const languageStore = await getData(keys.language)
    return await strings.setLanguage(languageStore)
  }

  componentWillMount = () => {
    this._onSetLanguage()
  }

  render() {
    console.log("data", this.state.data)
    return (
      <View style={styles.container}>
        {this.state.data.length === 0 && (
          <Lang
            styleLang={styles.subtitle}
            language="ordersEmpty"
          />
        )}
        
        <FlatList
          data={this.state.data}
          renderItem={({ item }: { item: any }) => {
            // console.log('item.product_data : ', item.product_data)
            return (
              <OrderOngoingItem
                id={item.id}
                name={item.name}
                date={item.ordered_at}
                statusText={item.status_text}
                paymentMethod={item.payment_method}
                displayPrice={item.display_price}
                comment={item.comment}
                productData={item.product_data}
                phone={item.phone}
              />
            )
          }}
          style={styles.list}
          refreshing={this.state.isDataLoading}
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
  }
})
