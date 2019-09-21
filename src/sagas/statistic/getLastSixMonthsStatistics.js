import { getLastSixMonthsStatistics } from '../../services/apiServices/statistic/getLastSixMonthsStatistics'

export async function getLastSixMonthsStatisticsService(
    clientToken,
    userId,
    params
) {
    const res = getLastSixMonthsStatistics(clientToken, userId, params)

    return res
}
