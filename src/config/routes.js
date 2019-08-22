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
                <Scene
                    key={SCENE_KEYS.gameScreens.friendGameStats}
                    component={gameScreens.friendGameStats}
                />
                <Scene key="splash" hideNavBar={true}>
                    <Scene
                        key={SCENE_KEYS.splashScreen}
                        component={splashScreen}
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
                    <Scene
                        key={SCENE_KEYS.mainScreens.profileSearch}
                        component={mainScreens.profileSearch}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.opponentsProfile}
                        component={mainScreens.opponentsProfile}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.settings}
                        component={mainScreens.settings}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.changePassword}
                        component={mainScreens.changePassword}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.favorites}
                        component={mainScreens.favorites}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.friendsList}
                        component={mainScreens.friendsList}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.createGroupRoom}
                        component={mainScreens.createGroupRoom}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.joinGroupRoom}
                        component={mainScreens.joinGroupRoom}
                    />
                    <Scene
                        key={SCENE_KEYS.mainScreens.notifications}
                        component={mainScreens.notifications}
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
                </Scene>
            </Scene>
        </Router>
    )
}

export { RouterComp }
