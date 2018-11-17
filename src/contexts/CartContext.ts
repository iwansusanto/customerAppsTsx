import { createContext } from "react"

let data: CartContext = {
  cart: {} as CartResponse,
  getCart: () => {},
  addToCart: () => Promise.resolve(false),
  deleteCart: () => Promise.resolve(false),
  updateCart: () => Promise.resolve(false)
}

const CartContext = createContext(data)
export default CartContext
