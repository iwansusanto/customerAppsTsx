import React from "react"
import PickCategoriesContext from "../../contexts/PickCategoriesContext"
import hoist from "hoist-non-react-statics"

const withPickCategoriesContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <PickCategoriesContext.Consumer>
        {context => <Component {...props} pickcategories={context} />}
      </PickCategoriesContext.Consumer>
    ),
    Component
  )

export default withPickCategoriesContext
