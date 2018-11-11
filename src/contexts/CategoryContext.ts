import { createContext } from "react"

let data: CategoryContext = {
  categories: [],
  getCategories: () => {}
}

const CategoryContext = createContext(data)
export default CategoryContext
