import {
    Opening,
    Login,
    Register,
    ResetPassword,
    GetInfo
} from '../containers/authScreens'

import {
    Main,
    Profile,
    Settings,
    ChangePassword,
    Favorites,
    FriendsList,
    ProfileSearch,
    CreateGroupRoom,
    JoinGroupRoom,
    OpponentsProfile,
    Notifications,
    Statistics
} from '../containers/mainScreens'

import {
    RankedGame,
    LoadingScreen,
    GameStatsScreen,
    RankedMatchingScreen,
    FriendMatchingScreen,
    FriendGameStatsScreen,
    GroupGame,
    GroupGameStatsScreen,
    FriendGame,
    SoloFriendGameScreen,
    SoloModeLoadingScreen,
    SoloModeGameScreen,
    SoloFriendGameStatsScreen
} from '../containers/gameScreens'

import { SplashScreen } from '../containers/splashScreen'

export const authScreens = {
    opening: Opening,
    login: Login,
    register: Register,
    resetPassword: ResetPassword,
    getInfo: GetInfo
}

export const mainScreens = {
    main: Main,
    profile: Profile,
    settings: Settings,
    changePassword: ChangePassword,
    favorites: Favorites,
    friendsList: FriendsList,
    profileSearch: ProfileSearch,
    createGroupRoom: CreateGroupRoom,
    joinGroupRoom: JoinGroupRoom,
    opponentsProfile: OpponentsProfile,
    notifications: Notifications,
    statistics: Statistics
}

export const gameScreens = {
    rankedGame: RankedGame,
    loading: LoadingScreen,
    gameStats: GameStatsScreen,
    rankedMatchingScreen: RankedMatchingScreen,
    friendMatchingScreen: FriendMatchingScreen,
    groupGame: GroupGame,
    groupGameStats: GroupGameStatsScreen,
    friendGame: FriendGame,
    friendGameStats: FriendGameStatsScreen,
    soloFriendGameScreen: SoloFriendGameScreen,
    soloModeLoadingScreen: SoloModeLoadingScreen,
    soloModeGameScreen: SoloModeGameScreen,
    soloFriendGameStatsScreen: SoloFriendGameStatsScreen
}

export const splashScreen = SplashScreen
