import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import mainScreen, {Example as ExampleScreen} from "./containers"

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="main" component={mainScreen} />
            </Scene>
        </Router>
    )
}

export default RouterComp
