import React from "react"
import CartContext from "../../contexts/CartContext"
import hoist from "hoist-non-react-statics"

const withCartContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <CartContext.Consumer>
        {context => <Component {...props} cart={context} />}
      </CartContext.Consumer>
    ),
    Component
  )

export default withCartContext
