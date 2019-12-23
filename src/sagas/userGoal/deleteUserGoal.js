import { makeDeleteRequest, apiServicesTree } from '../../services/apiServices'

export async function deleteUserGoalService(clientToken, userId, subjectId) {
    return makeDeleteRequest(apiServicesTree.userGoalApi.deleteUserGoal, {
        clientToken: clientToken,
        userId: userId,
        subjectId: subjectId
    })
}
