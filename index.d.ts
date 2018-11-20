interface User {
  id: number
  name: string
  phone: string
  email: string
  city_id: number
  total_point: string
  is_new: number
  pin: string
  created_at: string
  updated_at: string
}

interface LoginResponse {
  success: boolean
  message: string
  token: string
  customer: User
}

interface UserContext extends LoginResponse {
  changeUser: Function
  login: Function
  otp: Function
  register: Function
}

interface RegisterResponse {
  success: boolean
  errors: string
}

interface Inbox {
  id: number
  customer_id: number
  subject: string
  message: string
  description: string
  is_read: boolean
  created_at: string
  updated_at: string
}

interface InboxContext {
  inboxs: Inbox[]
  getInbox: Function
}

interface InboxResponse {
  success: boolean
  message: string
  inbox: Inbox[]
}

interface Category {
  id: number
  name: string
  _lft: number
  _rgt: number
  parent_id: number
  suggest_id: string
  city_id: number
  merchant_id: number
  created_at: string
  updated_at: string
  has_children: number
  image_url: string
}

interface CategoryResponse {
  type: []
  data: Category[]
}

interface CategoryContext {
  categories: Category[]
  getCategories: Function
}

interface Suggestion {
  id: number
  name: string
  _lft: number
  _rgt: number
  parent_id: number
  suggest_id: string
  city_id: number
  merchant_id: number
  created_at: string
  updated_at: string
  has_children: number
  image_url: string
}

interface SuggestionContext {
  suggestions: Category[]
  getSuggestions: Function
}

interface Merchant {
  id: number
  name: string
  lat: number
  lng: number
  image: string
  sort: number
  category_id: number
  city_id: number
  close: string
  open: string
  created_at: string
  updated_at: string
  menu_id: number
  address: string
  phone: string
  image_url: string
}

interface Product {
  id: number
  name: string
  description: string
  price: string
  price_old: string
  category_id: number
  menu_id: number
  tax_group_id: number
  type: string
  created_at: string
  updated_at: string
  images: string[]
  tax_value: number
  city_id: number
  additional: [
    {
      id: number
      label: string
      name: string
      data: string
    }
  ]
  merchant: Merchant
  merchant_id: number
  formatted_price: string
  formatted_old_price: string
  product_images: [
    {
      id: number
      image: string
      product_id: number
      created_at: string
      updated_at: string
    }
  ]
  tax_group: string
  category: Category
  product_additional: [
    {
      id: number
      product_id: number
      label: string
      name: string
      price: string
      created_at: string
      updated_at: string
    }
  ]
}

interface SearchResponse {
  success: boolean
  product_found: number
  merchant_found: number
  product_data: Product[]
  merchant_data: Merchant[]
}

interface SearchContext extends SearchResponse {
  resto: SearchRestoResponse
  result: SearchResponse
  search: (type: number) => Promise<boolean>
  searchBySuggestion: (parentId: number) => Promise<boolean>
  searchRestoDetail: (menuId: number) => Promise<boolean>
  searchByName: (name: string) => Promise<boolean>
}

interface Food {
  id: number
  name: string
  description: string
  price: string
  price_old: string
  category_id: number
  menu_id: number
  tax_group_id: number
  type: string
  created_at: string
  updated_at: string
  images: string[]
  tax_value: number
  city_id: number
  additional: [
    {
      id: number
      label: string
      name: string
      data: string
    }
  ]
  merchant: Merchant
  merchant_id: number
  formatted_price: string
  formatted_old_price: string
  product_images: [
    {
      id: number
      image: string
      product_id: number
      created_at: string
      updated_at: string
    }
  ]
  tax_group: string
  category: Category
  product_additional: [
    {
      id: number
      product_id: number
      label: string
      name: string
      price: string
      created_at: string
      updated_at: string
    }
  ]
}

interface MenuData {
  id: number
  name: string
  data: Food[]
}

interface SearchRestoResponse {
  success: boolean
  merchant: Merchant
  menu_data: MenuData[]
}

interface CartAdditional {
  name: string
  price: string
}

interface CartItem {
  additional: CartAdditional[]
  id: number
  name: string
  price: string
  quantity: number
  notes: string
}

interface CartResponse {
  id: number
  customer_id: number
  merchant_id: number
  product_data: CartItem[]
  updated_at: string
  created_at: string
  total: string
}

interface CartContext {
  cart: CartResponse
  getCart: Function
  addToCart: (
    quantity: number,
    id: number,
    additional: number[] | null,
    notes: string
  ) => Promise<boolean>
  deleteCart: (id: number) => Promise<boolean>
  updateCart: (quantity: number, id: number) => Promise<boolean>
}

interface AddToCartResponse {
  success: boolean
  message: string
}

interface UserAddress {
  id: number
  customer_id: number
  label: string
  address: string
  lat: string
  lng: string
  created_at: string
  updated_at: string
  phone: string
  fullname: string
}

interface AddressResponse {
  success: boolean
  message: string
  address_data: UserAddress[]
}

interface ShippingResponse {
  distance: string
  delivery_price: string
}

interface OrderedProduct {
  id: number
  product_id: number
  order_id: number
  price: string
  quantity: number
  product_data: string
  created_at: string
  updated_at: string
  name: string
  description: string
}

interface DriverData {
  id: number
  name: string
  email: string
  phone: string
  status: number
  remark: string
  created_at: string
  updated_at: string
  driver_image: null
  driver_data: {
    id: number
    driver_id: string
    address: string
    resident_id: string
    resident_image: string
    license_image: string
    driver_image: string
    created_at: null
    updated_at: null
  }
  driver_location: {
    id: number
    driver_id: string
    lat: string
    lng: string
    created_at: string
    updated_at: string
    active_order: null
  }
  driver_balance: number
}

interface Order {
  id: number
  name: string
  address: string
  phone: string
  lat: string
  lng: string
  total: string
  delivery_area_id: number
  delivery_price: string
  promo_code: null
  promo_discount: string
  promo_code_id: null
  payment_method: string
  is_paid: boolean
  tax: string
  total_with_tax: string
  city_id: number
  merchant_id: number
  customer_id: number
  driver_id: number | null
  order_status_id: number
  comment: string
  ordered_at: string
  created_at: string
  updated_at: string
  driver_message: string | null
  merchant_data: Merchant
  display_price: string
  status_text: string
  driver_data: DriverData | null
  order_status: {
    id: number
    name: string
    sort: number
    is_default: boolean
    available_to_driver: string
    created_at: string
    updated_at: string
    label: string
  }
}

interface OrderResponseDetail extends Order {
  ordered_products: OrderedProduct[]
}

interface OrderResponse {
  success: boolean
  order: OrderResponseDetail
}

interface OrderDetailResponse extends Order {
  product_data: OrderedProduct[]
}

interface OrderAdditional {
  data: string
  notes: string
}

interface OrderContext {
  order: OrderResponse
  orderDetail: OrderDetailResponse
  createOrder: (
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
    type: "now" | "scheduled",
    orderedAt: string,
    cartId: number
  ) => Promise<boolean>
  getOrderDetail: () => Promise<boolean>
}
