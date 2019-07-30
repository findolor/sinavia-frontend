const config = {
    api: {
        host: 'http://localhost:4000/api/'
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
            gameStats: 'gameStats'
        },
        mainScreens: {
            main: 'main'
        }
    }
}

const API_ENDPOINT = config.api.host

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS }

export default config
