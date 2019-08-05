import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { fetchUserToken } from './fetchUserToken'
import { loginUser } from './loginUser'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    fetchUserToken: fetchUserToken,
    loginUser: loginUser
}
