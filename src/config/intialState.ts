export default {
  user: {
    users: {
      customer: {
        name: '',
        email: '',
        phone: ''
      }
    },
    register: {},
    otp: {},
    language: 'en'
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
