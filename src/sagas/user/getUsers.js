import { getUsers } from '../../services/apiServices/user/getUsers'

export async function getUsersService(clientToken, idList) {
    const res = getUsers(clientToken, idList)

    return res
}
