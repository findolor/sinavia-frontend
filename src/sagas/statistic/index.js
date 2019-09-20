import { getStatisticsService } from './getStatistics'
import { getWeeklyStatisticsService } from './getWeeklyStatistics'
import { getLastThreeMonthsStatisticsService } from './getLastThreeMonthsStatistics'
import { getLastSixMonthsStatisticsService } from './getLastSixMonthsStatistics'
import { getMonthlyStatisticsService } from './getMonthlyStatistics'

export const statisticsServices = {
    getStatistics: getStatisticsService,
    getWeeklyStatistics: getWeeklyStatisticsService,
    getMonthlyStatistics: getMonthlyStatisticsService,
    getLastThreeMonthsStatistics: getLastThreeMonthsStatisticsService,
    getLastSixMonthsStatistics: getLastSixMonthsStatisticsService
}
