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
