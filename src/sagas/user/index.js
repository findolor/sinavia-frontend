import { userSignUp } from './userSignUp'
import { fetchUser, getUserService } from './fetchUser'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'
import { getUsersService } from './getUsers'
import { searchUsersService } from './searchUsers'
import {
    getOpponentFullInformationService,
    getOpponentFullInformationSaga
} from './getOpponentFullInformation'
import { updateUserSaga } from './updateUser'
import { createUser } from './createUser'
import { resetPassword } from './resetPassword'
import { purchasePremium } from './purchasePremium'

export const userSagas = {
    userSignUp: userSignUp,
    fetchUser: fetchUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser,
    getOpponentFullInformation: getOpponentFullInformationSaga,
    updateUser: updateUserSaga,
    createUser: createUser,
    purchasePremium: purchasePremium
}

export const userServices = {
    getUsers: getUsersService,
    getUser: getUserService,
    searchUsers: searchUsersService,
    getOpponentFullInformation: getOpponentFullInformationService,
    resetPassword: resetPassword
}
