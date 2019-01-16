import api from "../api"

export const updateCart = (id : any, quantity : any) => {
    return api.client.patch("/cart", {
        quantity,
        id
    })
  }