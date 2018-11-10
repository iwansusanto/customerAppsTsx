import React from "react"
import InboxContext from "../../contexts/InboxContext"
import hoist from "hoist-non-react-statics"

const withInboxContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <InboxContext.Consumer>
        {context => <Component {...props} inbox={context} />}
      </InboxContext.Consumer>
    ),
    Component
  )

export default withInboxContext
