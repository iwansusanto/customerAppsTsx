import axios, { AxiosInstance } from "axios"
import { lang } from "moment";

class API {
  client: AxiosInstance

  constructor() {
    let client = axios.create({
      baseURL: "https://admin.mshwarapp.com/api",
      headers: { "Content-Type": "application/json" }
    })

    client.interceptors.request.use(function(config) {
      if(config.method === 'post') {
        // config.data = {...config.data, lang: 'ar'}  
        client.defaults.headers.common['lang'] = 'ar'
      }
      // console.log('config interceptor :', config)
      return config
    }, function(error) {
      // console.log('ERROR interceptor :', error)
      return Promise.reject(error);
    })

    this.client = client
  }

  changeToken(token: string) {
    console.log('token', token)
    this.client.defaults.headers.common['Token'] = token
  }
<<<<<<< HEAD
  changeLanguage(language: string) {
    console.log('language', language)
    this.client.defaults.headers.common['Language'] = language
  }
=======
>>>>>>> 9cdc674024aae1f09dc91f199956dec9de38d341

}

const api = new API()

export default api
