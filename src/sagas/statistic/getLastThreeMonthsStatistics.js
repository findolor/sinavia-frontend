import { getLastThreeMonthsStatistics } from '../../services/apiServices/statistic/getLastThreeMonthsStatistics'

export async function getLastThreeMonthsStatisticsService(
    clientToken,
    userId,
    params
) {
    const res = getLastThreeMonthsStatistics(clientToken, userId, params)

    return res
}
