const config = {
    api: {
        host: 'http://10.253.12.219:4000/api/v1/',
        gameEngine: 'http://10.253.12.219:5000'
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
            groupGameStats: 'groupGameStats',
            matchIntro: 'matchIntro'
        },
        mainScreens: {
            main: 'main',
            profile: 'profile',
            settings: 'settings',
            changePassword: 'changePassword',
            favorites: 'favorites',
            profileSearch: 'profileSearch',
            opponentsProfile: 'opponentsProfile'
        },
        splashScreen: 'splash'
    }
}

const API_ENDPOINT = config.api.host
const GAME_ENGINE_ENDPOINT = config.api.gameEngine

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }

export default config
