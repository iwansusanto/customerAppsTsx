import React from "react"
import OrderContext from "../../contexts/OrderContext"
import hoist from "hoist-non-react-statics"

const withOrderContext = <P extends object>(Component: React.ComponentType<P>) =>
  hoist(
    (props: any) => (
      <OrderContext.Consumer>
        {context => <Component {...props} order={context} />}
      </OrderContext.Consumer>
    ),
    Component
  )

export default withOrderContext
