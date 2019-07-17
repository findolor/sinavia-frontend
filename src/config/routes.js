import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Opening } from './containers'
import { Login } from './containers'
import { Register } from './containers'
import { ResetPassword } from './containers'

const sceneKeys = {
    opening: 'opening',
    login: 'login',
    register: 'register',
    resetPassword: 'resetPassword'
}

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key={sceneKeys.opening}  component={Opening} />
                <Scene key={sceneKeys.login} component={Login} />
                <Scene key={sceneKeys.register} component={Register} />
                <Scene key={sceneKeys.resetPassword} component={ResetPassword} />
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
