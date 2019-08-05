import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { fetchUserToken } from './fetchUserToken'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    fetchUserToken: fetchUserToken,
    authenticateUser: authenticateUser,
    loginUser: loginUser
}
