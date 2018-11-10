import React from "react"
import UserContext from "../../contexts/UserContext"

const withUserContext = <P extends object>(Component: React.ComponentType<P>) => (props: any) => (
  <UserContext.Consumer>
    {context => <Component {...props} user={context} />}
  </UserContext.Consumer>
)

export default withUserContext