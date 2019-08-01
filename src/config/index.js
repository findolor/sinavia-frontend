import env from 'react-native-config'

const config = {
    api: {
        host: env.SERVER_ENDPOINT
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
            main: 'main',
            profile: 'profile',
            settings: 'settings'
        }
    }
}

const API_ENDPOINT = config.api.host

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS }

export default config
