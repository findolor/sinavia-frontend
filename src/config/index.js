import env from 'react-native-config'

const config = {
    api: {
        host: env.SERVER_ENDPOINT
    },
    scene_keys: {
        opening: 'opening',
        login: 'login',
        register: 'register',
        resetPassword: 'resetPassword',
        main: 'main'
    }
}

const API_ENDPOINT = config.api.host

const SCENE_KEYS = config.scene_keys

export { API_ENDPOINT, SCENE_KEYS }

export default config
