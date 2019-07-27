import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { authScreens, mainScreens } from './containers'

const sceneKeys = {
    opening: 'opening',
    login: 'login',
    register: 'register',
    resetPassword: 'resetPassword',
    main: 'main'
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
                    <Scene key={sceneKeys.main} component={mainScreens.main} />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp, sceneKeys }
