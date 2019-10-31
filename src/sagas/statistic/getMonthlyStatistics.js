import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getMonthlyStatisticsService(clientToken, userId, params) {
    return makeGetRequest(apiServicesTree.statisticApi.getMonthlyStatistics, {
        clientToken: clientToken,
        userId: userId,
        params: params
    })
}
