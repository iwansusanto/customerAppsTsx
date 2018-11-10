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
