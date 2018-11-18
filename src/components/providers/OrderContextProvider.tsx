import React, { Component } from "react"

import OrderContext from "../../contexts/OrderContext"
import api from "../../api"

interface State {
  order: OrderResponse
  orderDetail: OrderDetailResponse
}

export default class CategoryContextProvider extends Component<{}, State> {
  state = {
    order: {} as OrderResponse,
    orderDetail: {} as OrderDetailResponse
  }

  createOrder = async (
    name: string,
    address: string,
    phone: string,
    lat: string,
    lng: string,
    paymentMethod: string,
    deliveryAreaId: string,
    cityId: string,
    merchantId: string,
    comment: string,
    type: 'now' | 'scheduled',
    orderedAt: string,
    cartId: number
  ) => {
    try {
      const { data } = await api.client.post<OrderResponse>("/orders", {
        name,
        address,
        phone,
        lat,
        lng,
        payment_method: paymentMethod,
        delivery_area_id: deliveryAreaId,
        city_id: cityId,
        merchant_id: merchantId,
        comment,
        type,
        ordered_at: orderedAt,
        products: cartId
      })
      console.log(data)
      this.setState({ order: data })

      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  getOrderDetail = async () => {
    try {
      const { data } = await api.client.get<OrderDetailResponse>(`/order/${this.state.order.order.id}`)
      console.log(data)
      this.setState({ orderDetail: data })

      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <OrderContext.Provider
        value={{
          ...this.state,
          createOrder: this.createOrder,
          getOrderDetail: this.getOrderDetail
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    )
  }
}
