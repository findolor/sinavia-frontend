import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getLastSixMonthsStatisticsService(
    clientToken,
    userId,
    params
) {
    return makeGetRequest(
        apiServicesTree.statisticApi.getLastSixMonthsStatistics,
        {
            clientToken: clientToken,
            userId: userId,
            params: params
        }
    )
}
