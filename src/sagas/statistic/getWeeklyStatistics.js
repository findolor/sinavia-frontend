import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getWeeklyStatisticsService(
    clientToken,
    clientId,
    params
) {
    return makeGetRequest(apiServicesTree.statisticApi.getWeeklyStatistics, {
        clientToken: clientToken,
        userId: clientId,
        params: params
    })
}
