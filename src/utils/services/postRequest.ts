import api  from '../api'

export const login = (params) => { 
    return api.client.post('/login', params);
}

export const getCategories = () => { 
    return api.client.post('/categories');
  }