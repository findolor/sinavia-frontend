import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { authScreens } from './containers'

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
                <Scene key="auth" hideNavBar={true}>
                    <Scene
                        key={sceneKeys.opening}
                        component={authScreens.opening}
                    />
                    <Scene
                        key={sceneKeys.login}
                        component={authScreens.login}
                    />
                    <Scene
                        key={sceneKeys.register}
                        component={authScreens.register}
                    />
                    <Scene
                        key={sceneKeys.resetPassword}
                        component={authScreens.resetPassword}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
