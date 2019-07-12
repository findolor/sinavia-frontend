import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import mainScreen from "./containers"

const RouterComp = () => {
    return (
        <Router>
            <Scene key='main'
                   component={mainScreen}
                   title='Ana Sayfa'
            />
        </Router>
    )
}

export default RouterComp
