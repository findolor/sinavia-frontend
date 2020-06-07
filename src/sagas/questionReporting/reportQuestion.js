import { makePostRequest, apiServicesTree } from '../../services/apiServices'

export async function reportQuestionService(
    clientToken,
    userId,
    questionId,
    params
) {
    return makePostRequest(
        apiServicesTree.questionReportingApi.reportQuestion,
        {
            ...params,
            questionId: questionId,
            userId: userId,
            clientToken: clientToken
        }
    )
}
