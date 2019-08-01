import {
    Opening,
    Login,
    Register,
    ResetPassword
} from '../containers/authScreens'

import { Main, Profile, ChangePassword} from '../containers/mainScreens'

import {
    RankedGame,
    LoadingScreen,
    GameStatsScreen
} from '../containers/gameScreens'

export const authScreens = {
    opening: Opening,
    login: Login,
    register: Register,
    resetPassword: ResetPassword
}

export const mainScreens = {
    main: Main,
    profile: Profile,
    changePassword: ChangePassword
}

export const gameScreens = {
    rankedGame: RankedGame,
    loading: LoadingScreen,
    gameStats: GameStatsScreen
}
