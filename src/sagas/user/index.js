import { createUser } from './createUser'
import { fetchUser } from './fetchUser'
import { fetchUserToken } from './fetchUserToken'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    fetchUserToken: fetchUserToken
}
