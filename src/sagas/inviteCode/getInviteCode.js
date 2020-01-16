import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export const getInviteCodeService = async (clientToken, clientId) => {
    return makeGetRequest(apiServicesTree.inviteCodeApi.getInviteCode, {
        clientToken: clientToken,
        clientId: clientId
    })
}
