import {
    Opening,
    Login,
    Register,
    ResetPassword
} from '../containers/authScreens'

import {
    Main,
    Profile,
    Settings,
    ChangePassword,
    Favorites,
    ProfileSearch,
<<<<<<< HEAD
    CreateGroupRoom,
    JoinGroupRoom
=======
    OpponentsProfile
>>>>>>> opponentsProfile
} from '../containers/mainScreens'

import {
    RankedGame,
    LoadingScreen,
    GameStatsScreen,
    MatchIntroScreen,
    GroupGame,
    GroupGameStatsScreen
} from '../containers/gameScreens'

import { SplashScreen } from '../containers/splashScreen'

export const authScreens = {
    opening: Opening,
    login: Login,
    register: Register,
    resetPassword: ResetPassword
}

export const mainScreens = {
    main: Main,
    profile: Profile,
    settings: Settings,
    changePassword: ChangePassword,
    favorites: Favorites,
    profileSearch: ProfileSearch,
<<<<<<< HEAD
    createGroupRoom: CreateGroupRoom,
    joinGroupRoom: JoinGroupRoom
=======
    opponentsProfile: OpponentsProfile
>>>>>>> opponentsProfile
}

export const gameScreens = {
    rankedGame: RankedGame,
    loading: LoadingScreen,
    gameStats: GameStatsScreen,
    matchIntro: MatchIntroScreen,
    groupGame: GroupGame,
    groupGameStats: GroupGameStatsScreen
}

export const splashScreen = SplashScreen
