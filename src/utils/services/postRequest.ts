import api from "../api"

export const login = params => {
  console.log("Api login : ")
  return api.client.post("/login", params)
}

export const getCategories = () => {
  return api.client.post("/categories")
}

export const suggestion = params => {
  console.log(" Api suggest : ")
  return api.client.post("/v2/suggestion", { parent_id: params })
}

export const searchPickCategories = params => {
  return api.client.post("/categories", {
    parent_id: params
  })
}

export const search = (categoryId, type) => {
  return api.client.post("/search", {
    category_id: categoryId,
    type: type
  })
}

export const searchBySuggestion = params => {
  return api.client.post("/v2/searchfood", {
    category_id: params
  })
}

export const searchByName = params => {
  return api.client.post("/search", {
    name: params
  })
}

export const searchRestoDetail = params => {
  return api.client.post("/v2/searchmerchant", {
    merchant_id : params
  })
}


