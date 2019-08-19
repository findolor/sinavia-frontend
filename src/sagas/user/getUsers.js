import { getUsers } from '../../services/apiServices/user/getUsers'
import { deviceStorage } from '../../services/deviceStorage'

export async function getUsersService(idList) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')

    const res = getUsers(userToken, idList)

    return res
}
