export default {
  login: {
    users: {}
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
  cart: {
    id: 0,
    customer_id: 0,
    merchant_id: 0,
    product_data: [],
    updated_at: "",
    created_at: "",
    total: "",
    status: false
  },
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
  search: {}
}
