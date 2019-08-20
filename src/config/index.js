const api = {
    host: 'http://10.253.12.217:4000/api/',
    hostAWS: 'http://sinavia-test.eu-central-1.elasticbeanstalk.com/api/',
    gameEngine: 'http://10.253.12.217:5000',
    gameEngineAWS: 'http://sinavia-test.eu-central-1.elasticbeanstalk.com:5000'
}

const scene_keys = {
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
        favorites: 'favorites',
        profileSearch: 'profileSearch',
        createGroupRoom: 'createGroupRoom',
        joinGroupRoom: 'joinGroupRoom',
        opponentsProfile: 'opponentsProfile',
        notifications: 'notifications'
    },
    splashScreen: 'splash'
}

const API_ENDPOINT = api.host
//const API_ENDPOINT = config.api.hostAWS
const GAME_ENGINE_ENDPOINT = api.gameEngine
//const GAME_ENGINE_ENDPOINT = config.api.gameEngineAWS

const SCENE_KEYS = scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }
