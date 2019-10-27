import { apiServicesTree, makeDeleteRequest } from '../../services/apiServices'

export const rejectOngoingMatchService = async (
    clientToken,
    ongoingMatchId
) => {
    return makeDeleteRequest(
        apiServicesTree.notificationApi.rejectOngoingMatch,
        {
            ongoingMatchId: ongoingMatchId,
            clientToken: clientToken
        }
    )
}
