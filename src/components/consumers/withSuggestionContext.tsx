import React from "react"
import SuggestionContext from "../../contexts/SuggestionContext"
import hoist from "hoist-non-react-statics"

const withSuggestionContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <SuggestionContext.Consumer>
        {context => <Component {...props} suggestion={context} />}
      </SuggestionContext.Consumer>
    ),
    Component
  )

export default withSuggestionContext
