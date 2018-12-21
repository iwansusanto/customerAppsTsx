import React from "react"
import UserContext from "../../contexts/UserContext"
import hoist from "hoist-non-react-statics"

const withUserContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <UserContext.Consumer>
        {context => <Component {...props} user={context}/>}
      </UserContext.Consumer>
    ),
    Component
  )

export default withUserContext
