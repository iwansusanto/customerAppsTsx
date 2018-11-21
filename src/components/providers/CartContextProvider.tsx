import React, { Component } from "react"

import CartContext from "../../contexts/CartContext"
import api from "../../api"

export default class CartContextProvider extends Component<{}, CartResponse> {
  state = {
    id: 0,
    customer_id: 0,
    merchant_id: 0,
    product_data: [],
    updated_at: "",
    created_at: "",
    total: "",
    status: false
  }

  deleteCart = async (id: number) => {
    try {
      const { data } = await api.client.delete("/cart", {
        data: {
          id
        }
      })
      console.log(id, data)

      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  updateCart = async (id: number, quantity: number) => {
    try {
      const { data } = await api.client.patch("/cart", {
        quantity,
        id
      })
      console.log(data)

      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  addToCart = async (
    quantity: number,
    id: number,
    additional: number[] | null,
    notes: string
  ) => {
    try {
      const { data } = await api.client.post<AddToCartResponse>("/cart", {
        quantity,
        id,
        additional,
        notes
      })
      console.log(data)

      return true
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  getCart = async () => {
    try {
      const { data } = await api.client.get<CartResponse>("/cart")
      console.log(data)
      if (!data.status) {
        this.setState({
          id: 0,
          customer_id: 0,
          merchant_id: 0,
          product_data: [],
          updated_at: "",
          created_at: "",
          total: "",
          status: false
        })
      } else {
        const result = data as CartResponse
        this.setState(result)
      }
      // if (data === []) {
      //   return this.setState({ total: "", product_data: [] })
      // }
    } catch (err) {
      console.log(err.response.data)
      return false
    }
  }

  public render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state,
          getCart: this.getCart,
          addToCart: this.addToCart,
          deleteCart: this.deleteCart,
          updateCart: this.updateCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
