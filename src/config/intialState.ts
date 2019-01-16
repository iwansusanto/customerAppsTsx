export default {
  user: {
    users: {},
    language: 'en'
  },
  register: {
    userRegister: {}
  },
  forgotPassword: {
    email: "",
    loading: false
  },
  getCategories: {
    // payload: {},
    loading: false,
    error: "",
    banner: []
  },
  cart: {},
  suggestion: {
    suggestionsBanner: [],
    currentId: -1,
    loading: true,
    error: ""
  },
  pickCategories: {
    pickCategoriesBanner: [],
    loading: true,
    error: ""
  },
  search: {},
  orders: {
    loading: false,
    error: {},
    dataOnGoing: [],
    dataHistory: []
  }
}
