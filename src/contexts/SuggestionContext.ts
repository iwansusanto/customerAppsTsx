import { createContext } from "react"

let data: SuggestionContext = {
  suggestions: [],
  getSuggestions: () => {}
}

const SuggestionContext = createContext(data)
export default SuggestionContext
