import { createContext } from "react"

let data: PickCategoriesContext = {
  pickcategories: [],
  searchPickCategories: () => {}
}

const PickCategoriesContext = createContext(data)
export default PickCategoriesContext
