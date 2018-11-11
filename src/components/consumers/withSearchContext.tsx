import React from "react"
import SearchContext from "../../contexts/SearchContext"
import hoist from "hoist-non-react-statics"

const withSearchContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <SearchContext.Consumer>
        {context => <Component {...props} search={context} />}
      </SearchContext.Consumer>
    ),
    Component
  )

export default withSearchContext
