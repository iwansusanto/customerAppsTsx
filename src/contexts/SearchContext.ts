import { createContext } from "react"

let data: SearchContext = {
  success: false,
  product_found: 0,
  merchant_found: 0,
  product_data: [],
  merchant_data: [],
  search: () => {}
}

const SearchContext = createContext(data)
export default SearchContext
