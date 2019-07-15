import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Opening  } from './containers'
import { Login  } from './containers'
import { Register  } from './containers'

const sceneKeys = {
    opening: 'opening',
    login: 'login',
    register: 'register'
}

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="opening" component={Opening} />
                <Scene key="login" component={Login} />
                <Scene key="register" component={Register} />
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
