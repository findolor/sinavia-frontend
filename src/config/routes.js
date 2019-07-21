import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { authScreens, mainScreens } from './containers'

const sceneKeys = {
    opening: 'opening',
    login: 'login',
    register: 'register',
    resetPassword: 'resetPassword',
    home: 'home'
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
                <Scene key="main" hideNavBar={true}>
                    <Scene
                        key={sceneKeys.home}
                        component={mainScreens.home}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
