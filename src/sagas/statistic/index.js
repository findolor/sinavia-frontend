import { getStatisticsService } from './getStatistics'
import { getWeeklyStatisticsService } from './getWeeklyStatistics'
import { getLastSixMonthsStatisticsService } from './getLastSixMonthsStatistics'
import { getMonthlyStatisticsService } from './getMonthlyStatistics'

export const statisticsServices = {
    getStatistics: getStatisticsService,
    getWeeklyStatistics: getWeeklyStatisticsService,
    getMonthlyStatistics: getMonthlyStatisticsService,
    getLastSixMonthsStatistics: getLastSixMonthsStatisticsService
}
