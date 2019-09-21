import { getMonthlyStatistics } from '../../services/apiServices/statistic/getMonthlyStatistics'

export async function getMonthlyStatisticsService(clientToken, userId, params) {
    const res = getMonthlyStatistics(clientToken, userId, params)

    return res
}
