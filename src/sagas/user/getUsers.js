import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export async function getUsersService(clientToken, idList) {
    return makeGetRequest(apiServicesTree.userApi.getUsers, {
        idList: idList,
        clientToken: clientToken
    })
}
