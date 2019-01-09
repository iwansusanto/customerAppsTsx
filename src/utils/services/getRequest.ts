import api  from '../api'


export const getCart = () => { 
    return api.client.get('/cart');
  }