import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { authenticateUser } from './authenticateUser'
import { loginUser } from './loginUser'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser
}
