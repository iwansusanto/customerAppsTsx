import { createContext } from "react"

let data: OrderContext = {
  order: {} as OrderResponse,
  orderDetail: {} as OrderDetailResponse,
  createOrder: () => Promise.resolve(false),
  getOrderDetail: () => Promise.resolve(false)
}

const OrderContext = createContext(data)
export default OrderContext
