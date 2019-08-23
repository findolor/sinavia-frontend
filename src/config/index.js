const api = {
    host: 'http://localhost:4000/api/',
    hostAWS: 'http://sinavia-test.eu-central-1.elasticbeanstalk.com/api/',
    gameEngine: 'http://localhost:5000',
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
        rankedMatchingScreen: 'rankedMatchingScreen',
        friendMatchingScreen: 'friendMatchingScreen',
        matchIntro: 'matchIntro',
        groupGame: 'groupGame',
        groupGameStats: 'groupGameStats',
        friendGame: 'friendGame',
        friendGameStats: 'friendGameStats'
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

const API_ENDPOINT = api.host
//const API_ENDPOINT = config.api.hostAWS
const GAME_ENGINE_ENDPOINT = api.gameEngine
//const GAME_ENGINE_ENDPOINT = config.api.gameEngineAWS

const SCENE_KEYS = scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }
