import { createUser } from './postUser'
import { fetchUser } from './getUser'
import { fetchUserToken } from './getUserToken'

export const userSagas = {
    createUser: createUser,
    fetchUser: fetchUser,
    fetchUserToken: fetchUserToken
}
