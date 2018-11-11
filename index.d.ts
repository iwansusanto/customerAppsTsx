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
