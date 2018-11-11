import { createContext } from "react"

let data: InboxContext = {
  inboxs: [],
  getInbox: () => {}
}

const InboxContext = createContext(data)
export default InboxContext
