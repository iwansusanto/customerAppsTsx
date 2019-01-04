import api from '../api'

const fetchBanner = (params) => {
    console.log('api', api)
    return api.client.post('/categories',params)

}

export default fetchBanner