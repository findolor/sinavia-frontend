import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getUserScoreService(
    clientToken,
    clientId,
    examId,
    courseId,
    subjectId
) {
    return makeGetRequest(apiServicesTree.userScoreApi.getUserScore, {
        clientToken: clientToken,
        clientId: clientId,
        examId: examId,
        courseId: courseId,
        subjectId: subjectId
    })
}
