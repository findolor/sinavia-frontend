import { getUserGoalsService } from './getUserGoals'
import { postUserGoalService } from './postUserGoal'
import { deleteUserGoalService } from './deleteUserGoal'

export const userGoalsServices = {
    getUserGoals: getUserGoalsService,
    postUserGoal: postUserGoalService,
    deleteUserGoal: deleteUserGoalService
}
