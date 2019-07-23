import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { authScreens, gameScreens } from './containers'
import { SCENE_KEYS } from './index'

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="auth" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.rankedGame}
                        component={gameScreens.rankedGame}
                    />
                    <Scene
                        key={SCENE_KEYS.opening}
                        component={authScreens.opening}
                    />
                    <Scene
                        key={SCENE_KEYS.login}
                        component={authScreens.login}
                    />
                    <Scene
                        key={SCENE_KEYS.register}
                        component={authScreens.register}
                    />
                    <Scene
                        key={SCENE_KEYS.resetPassword}
                        component={authScreens.resetPassword}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp }
