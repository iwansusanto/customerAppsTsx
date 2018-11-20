import { createContext } from "react"

let data: SearchContext = {
  success: false,
  product_found: 0,
  merchant_found: 0,
  product_data: [],
  merchant_data: [],
  resto: {} as SearchRestoResponse,
  result: {} as SearchResponse,
  search: (type: number) => Promise.resolve(false),
  searchByName: (name: string) => Promise.resolve(false),
  searchRestoDetail: (menuId: number) => Promise.resolve(false),
  searchBySuggestion: (categoryId: number) => Promise.resolve(false)
}

const SearchContext = createContext(data)
export default SearchContext
