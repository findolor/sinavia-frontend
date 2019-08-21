import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'
import { getUsersService } from './getUsers'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser
}

export const userServices = {
    getUsers: getUsersService
}
