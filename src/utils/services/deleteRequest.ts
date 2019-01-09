import api from "../api"

export const deleteCart = id => {
  return api.client.delete("/cart", { data: { id } })
}
