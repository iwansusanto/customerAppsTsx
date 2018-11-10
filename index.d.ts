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

interface UserContext {
  user: User
  changeUser: Function
  login: Function
  otp: Function
  register: Function
}

interface LoginResponse {
  success: string
  message: string
  token: string
  customer: User
}

interface RegisterResponse {
  success: boolean,
  errors: string
}