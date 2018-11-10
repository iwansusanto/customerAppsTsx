import axios, { AxiosInstance } from "axios"

class API {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: "https://admin.mshwarapp.com/api",
      headers: { "Content-Type": "application/json" }
    })
  }

  changeToken(token: string) {
    console.log('token', token)
    this.client.defaults.headers.common['Token'] = token
  }
}

const api = new API()

export default api
