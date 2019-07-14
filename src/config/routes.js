import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Example as ExampleScreen } from './containers'
import { User as UserScreen } from './containers'

const sceneKeys = {
    example: 'example',
    user: 'user'
}

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="example" component={ExampleScreen} />
                <Scene key="user" component={UserScreen} />
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
