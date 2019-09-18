import { createUser } from './createUser'
import { fetchUser, getUserService } from './fetchUser'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'
import { getUsersService } from './getUsers'
import { searchUsersService } from './searchUsers'
import {
    getOpponentFullInformationService,
    getOpponentFullInformationSaga
} from './getOpponentFullInformation'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser,
    getOpponentFullInformation: getOpponentFullInformationSaga
}

export const userServices = {
    getUsers: getUsersService,
    getUser: getUserService,
    searchUsers: searchUsersService,
    getOpponentFullInformation: getOpponentFullInformationService
}
