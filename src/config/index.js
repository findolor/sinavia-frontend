import { ENV_API_ENDPOINT, ENV_GAME_ENGINE_ENDPOINT } from 'react-native-dotenv'

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
        soloFriendGameScreen: 'soloFriendGameScreen',
        soloModeLoadingScreen: 'soloModeLoadingScreen',
        soloModeGameScreen: 'soloModeGameScreen'
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

const API_ENDPOINT = ENV_API_ENDPOINT
const GAME_ENGINE_ENDPOINT = ENV_GAME_ENGINE_ENDPOINT
const SCENE_KEYS = scene_keys

export { API_ENDPOINT, SCENE_KEYS, GAME_ENGINE_ENDPOINT }
