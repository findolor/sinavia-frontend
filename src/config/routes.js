import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import {
    authScreens,
    gameScreens,
    mainScreens,
    splashScreen
} from './containers'
import { SCENE_KEYS } from './index'

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="splash" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.splashScreen}
                        component={splashScreen}
                    />
                </Scene>
                <Scene key="auth" hideNavBar={true}>
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
                <Scene key="game" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.gameScreens.loading}
                        component={gameScreens.loading}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.matchIntro}
                        component={gameScreens.matchIntro}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.rankedGame}
                        component={gameScreens.rankedGame}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.groupGame}
                        component={gameScreens.groupGame}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.gameStats}
                        component={gameScreens.gameStats}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.groupGameStats}
                        component={gameScreens.groupGameStats}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.rankedMatchingScreen}
                        component={gameScreens.rankedMatchingScreen}
                    />
                    <Scene
                        key={SCENE_KEYS.gameScreens.friendMatchingScreen}
                        component={gameScreens.friendMatchingScreen}
                    />
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp }
