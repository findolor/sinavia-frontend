const config = {
    api: {
        host: 'http://localhost:4000/api/',
        gameEngine: 'http://localhost:5000'
    },
    scene_keys: {
        authScreens: {
            opening: 'opening',
            login: 'login',
            register: 'register',
            resetPassword: 'resetPassword'
        },
        gameScreens: {
            rankedGame: 'rankedGame',
            loading: 'loading',
            gameStats: 'gameStats',
            rankedMatchingScreen: 'rankedMatchingScreen',
            friendMatchingScreen: 'friendMatchingScreen',
            matchIntro: 'matchIntro',
            groupGame: 'groupGame',
            groupGameStats: 'groupGameStats'
        },
        mainScreens: {
            main: 'main',
            profile: 'profile',
            settings: 'settings',
            changePassword: 'changePassword',
            favorites: 'favorites',
            friendsList: 'friendsList',
            profileSearch: 'profileSearch',
            createGroupRoom: 'createGroupRoom',
            joinGroupRoom: 'joinGroupRoom',
            opponentsProfile: 'opponentsProfile',
            notifications: 'notifications',
            statistics: 'statistics'
        },
        splashScreen: 'splash'
    }
}

const API_ENDPOINT = config.api.host
const GAME_ENGINE_ENDPOINT = config.api.gameEngine

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }

export default config
