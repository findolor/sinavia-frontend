const config = {
    api: {
        host: 'http://localhost:4000/api/v1/',
        gameEngine: 'http://localhost:5000'
        //gameEngine: 'https://sinavia-test.herokuapp.com/'
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
            matchIntro: 'matchIntro',
            groupGame: 'groupGame',
            groupGameStats: 'groupGameStats'
        },
        mainScreens: {
            main: 'main',
            profile: 'profile',
            settings: 'settings',
            changePassword: 'changePassword',
            favorites: 'favorites'
        },
        splashScreen: 'splash'
    }
}

const API_ENDPOINT = config.api.host
const GAME_ENGINE_ENDPOINT = config.api.gameEngine

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }

export default config
