import { getStatistics } from '../../services/apiServices/statistic/getStatistics'

export async function getStatisticsService(clientToken, friendId) {
    const res = getStatistics(clientToken, friendId)

    return res
}
