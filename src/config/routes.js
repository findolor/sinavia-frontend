import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { authScreens, gameScreens, mainScreens } from './containers'
import { SCENE_KEYS } from './index'

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="auth" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.mainScreens.settings}
                        component={mainScreens.settings}
                    />
                    <Scene
                        key={SCENE_KEYS.authScreens.opening}
                        component={authScreens.opening}
                    />
                    <Scene
                        key={SCENE_KEYS.authScreens.login}
                        component={authScreens.login}
                    />
                    <Scene
                        key={SCENE_KEYS.authScreens.register}
                        component={authScreens.register}
                    />
                    <Scene
                        key={SCENE_KEYS.authScreens.resetPassword}
                        component={authScreens.resetPassword}
                    />
                </Scene>
                <Scene key="main" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.mainScreens.main}
                        component={mainScreens.main}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.profile}
                        component={mainScreens.profile}
                    />
                </Scene>
                <Scene key="game" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.gameScreens.loading}
                        component={gameScreens.loading}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.rankedGame}
                        component={gameScreens.rankedGame}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.gameStats}
                        component={gameScreens.gameStats}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp }
