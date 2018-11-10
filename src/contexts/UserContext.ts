import { createContext } from "react";

let data: UserContext = {} as UserContext

const UserContext = createContext(data)
export default UserContext;