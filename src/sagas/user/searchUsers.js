import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export async function searchUsersService(clientToken, clientDBId, keyword) {
    return makeGetRequest(apiServicesTree.userApi.searchUsers, {
        clientToken: clientToken,
        keyword: keyword,
        userId: clientDBId
    })
}
