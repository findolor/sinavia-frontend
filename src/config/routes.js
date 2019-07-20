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
                <Scene key="auth">
                    <Scene
                        key={sceneKeys.opening}
                        component={authScreens.Opening}
                    />
                    <Scene
                        key={sceneKeys.login}
                        component={authScreens.Login}
                    />
                    <Scene
                        key={sceneKeys.register}
                        component={authScreens.Register}
                    />
                    <Scene
                        key={sceneKeys.resetPassword}
                        component={authScreens.ResetPassword}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
