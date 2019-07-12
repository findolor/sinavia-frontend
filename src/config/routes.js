import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Example as ExampleScreen } from './containers'

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="example" component={ExampleScreen} />
            </Scene>
        </Router>
    )
}

export default RouterComp
