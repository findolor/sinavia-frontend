import {
    ENV_API_ENDPOINT,
    ENV_API_ENDPOINT_LOCAL,
    ENV_GAME_ENGINE_ENDPOINT,
    ENV_GAME_ENGINE_ENDPOINT_LOCAL,
    ENV_APP_VERSION,
    ENV_BUGSNAG_API_KEY
} from 'react-native-dotenv'

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
        soloModeGameScreen: 'soloModeGameScreen',
        soloFriendGameStatsScreen: 'soloFriendGameStatsScreen',
        groupLoading: 'groupLoading',
        soloModeGameStats: 'soloModeGameStats',
        unsolvedModeLoadingScreen: 'unsolvedModeLoadingScreen',
        unsolvedModeGameScreen: 'unsolvedModeGameScreen',
        unsolvedModeGameStatsScreen: 'unsolvedModeGameStatsScreen'
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
        statistics: 'statistics',
        goals: 'goals',
        jokerReward: 'jokerReward',
        video: 'video'
    },
    splashScreen: 'splash',
    tutorialScreen: 'tutorial'
}

const API_ENDPOINT = ENV_API_ENDPOINT_LOCAL
const GAME_ENGINE_ENDPOINT = ENV_GAME_ENGINE_ENDPOINT_LOCAL
const APP_VERSION = ENV_APP_VERSION
const SCENE_KEYS = scene_keys
const BUGSNAG_API_KEY = ENV_BUGSNAG_API_KEY

//console.log(API_ENDPOINT, GAME_ENGINE_ENDPOINT)
console.log(API_ENDPOINT, GAME_ENGINE_ENDPOINT)

// sas
// sas
export {
    API_ENDPOINT,
    SCENE_KEYS,
    GAME_ENGINE_ENDPOINT,
    APP_VERSION,
    BUGSNAG_API_KEY
}
