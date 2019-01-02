import axios, { AxiosInstance } from "axios"
import { lang } from "moment";
import { AsyncStorage } from "react-native";

class API {
  client: AxiosInstance

  constructor() {
    let client = axios.create({
      baseURL: "https://admin.mshwarapp.com/api",
      headers: { "Content-Type": "application/json" }
    })

    client.interceptors.request.use(async function(config) {
      if(config.method === 'post' || config.method === 'get') {
        const lang = await AsyncStorage.getItem('language')
        // client.defaults.headers.common['lang'] = lang
        // config.data = {...config.data, lang}
        config.headers = {...config.headers, lang}
      }
      console.log('config interceptor :', config)
      
      return Promise.resolve(config)
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

}

const api = new API()

export default api
