import { getWeeklyStatistics } from '../../services/apiServices/statistic/getWeeklyStatistics'

export async function getWeeklyStatisticsService(
    clientToken,
    clientId,
    params
) {
    const res = getWeeklyStatistics(clientToken, clientId, params)

    return res
}
