const local = true

const api = {
    host:
        local === true
            ? 'http://localhost:4000/api/'
            : 'http://10.253.86.16:9090/api/',
    hostAWS: 'http://sinavia-test.eu-central-1.elasticbeanstalk.com:8080/api/',
    gameEngine:
        local === true ? 'http://localhost:5000' : 'http://10.253.86.16:8080',
    gameEngineAWS: 'http://sinavia-test.eu-central-1.elasticbeanstalk.com:5000'
}

const scene_keys = {
    authScreens: {
        opening: 'opening',
        login: 'login',
        register: 'register',
        resetPassword: 'resetPassword',
        getInfo: 'getInfo'
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
        friendGameStats: 'friendGameStats',
        soloGameScreen: 'soloGameScreen'
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
//const API_ENDPOINT = api.hostAWS
const GAME_ENGINE_ENDPOINT = api.gameEngine
//const GAME_ENGINE_ENDPOINT = api.gameEngineAWS

const SCENE_KEYS = scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }
