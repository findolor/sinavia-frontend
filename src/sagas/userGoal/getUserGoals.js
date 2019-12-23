import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getUserGoalsService(clientToken, userId) {
    return makeGetRequest(apiServicesTree.userGoalApi.getUserGoals, {
        clientToken: clientToken,
        userId: userId
    })
}
