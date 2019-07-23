import {
    Opening,
    Login,
    Register,
    ResetPassword
} from '../containers/authScreens'

import { RankedGame, LoadingScreen } from '../containers/gameScreens'

export const authScreens = {
    opening: Opening,
    login: Login,
    register: Register,
    resetPassword: ResetPassword
}

export const gameScreens = {
    rankedGame: RankedGame,
    loading: LoadingScreen
}
