import { makePostRequest, apiServicesTree } from '../../services/apiServices'

export async function postUserGoalService(
    clientToken,
    userId,
    goalAmount,
    subjectId,
    courseId
) {
    return makePostRequest(apiServicesTree.userGoalApi.postUserGoal, {
        clientToken: clientToken,
        userId: userId,
        goalAmount: goalAmount,
        subjectId: subjectId,
        courseId: courseId
    })
}
