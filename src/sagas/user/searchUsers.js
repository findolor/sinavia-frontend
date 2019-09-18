import { searchUsers } from '../../services/apiServices/user/searchUsers'

export async function searchUsersService(clientToken, clientDBId, keyword) {
    const res = searchUsers(clientToken, keyword, clientDBId)

    return res
}
