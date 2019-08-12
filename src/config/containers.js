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
    OpponentsProfile
} from '../containers/mainScreens'

import {
    RankedGame,
    LoadingScreen,
    GameStatsScreen,
    GroupGameStatsScreen,
    MatchIntroScreen
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
    opponentsProfile: OpponentsProfile
}

export const gameScreens = {
    rankedGame: RankedGame,
    loading: LoadingScreen,
    gameStats: GameStatsScreen,
    groupGameStats: GroupGameStatsScreen,
    matchIntro: MatchIntroScreen
}

export const splashScreen = SplashScreen
