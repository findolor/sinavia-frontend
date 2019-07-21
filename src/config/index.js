import env from 'react-native-config'

const config = {
    api: {
        host: env.SERVER_ENDPOINT
    }
}

const API_ENDPOINT = config.api.host

export { API_ENDPOINT }

export default config
