import api  from '../api'

export const orderOnGoing = () => { 
    return api.client.get('/v2/orders/ongoing');
}

export const orderHistory = () => { 
    return api.client.get('/v2/orders/history');
}

