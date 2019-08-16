import { getStatistics } from '../../services/apiServices/statistic/getStatistics'
import { deviceStorage } from '../../services/deviceStorage'

export async function getStatisticsService(friendId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')

    const res = getStatistics(userToken, friendId)

    return res
}
