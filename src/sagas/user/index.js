import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'
import { findUsers } from './findUsers'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser,
    findUsers: findUsers
}
