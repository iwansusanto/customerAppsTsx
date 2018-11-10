import { createContext } from "react";

let data: InboxContext = {
  inboxs: []
} 

const InboxContext = createContext(data)
export default InboxContext;