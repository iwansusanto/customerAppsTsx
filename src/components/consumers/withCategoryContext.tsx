import React from "react"
import CategoryContext from "../../contexts/CategoryContext"
import hoist from "hoist-non-react-statics"

const withCategoryContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <CategoryContext.Consumer>
        {context => <Component {...props} category={context} />}
      </CategoryContext.Consumer>
    ),
    Component
  )

export default withCategoryContext
