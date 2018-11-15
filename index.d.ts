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
  tax_group_id: null
  type: string
  created_at: string
  updated_at: string
  images: string[]
  tax_value: number
  city_id: number
  additional: {
    topping: [
      {
        id: number
        label: string
        name: string
        data: string
      }
    ]
  }
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
  category: {
    id: number
    name: string
    _lft: number
    _rgt: number
    parent_id: string
    suggest_id: string
    city_id: number
    merchant_id: number
    created_at: string
    updated_at: string
    has_children: number
    image_url: string
  }
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
  search: (query: string, categoryId: number) => boolean
}