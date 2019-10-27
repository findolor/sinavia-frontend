import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getStatisticsService(clientToken, friendId) {
    return makeGetRequest(apiServicesTree.statisticApi.getStatistics, {
        clientToken: clientToken,
        userId: friendId
    })
}
