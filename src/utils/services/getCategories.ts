import api from '../api'



// const getCategories = async () => {
//   try {
//     const { data } = await api.client.post<CategoryResponse>("/categories")
//     console.log('coba get', data)
//     return data
    
//     // this.setState({ categories: data.data })
//   } catch (err) {
//     console.log(err.response.data)
//     return false
//   }
// }

// export default getCategories

export const getCategories = () => { 
  return api.client.post('/categories');
}
