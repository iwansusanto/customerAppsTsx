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
        // config.data = {...config.data, lang: 'ar'}
        const storage = await AsyncStorage.getItem('language')
        console.log('tes oke',storage)
        client.defaults.headers.common['lang'] = storage
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

}

const api = new API()

export default api
