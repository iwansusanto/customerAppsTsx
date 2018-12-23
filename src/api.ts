import axios, { AxiosInstance } from "axios"
import { lang } from "moment";

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
  changeLanguage(language: string) {
    console.log('language', language)
    this.client.defaults.headers.common['Language'] = language
  }

}

const api = new API()

export default api
