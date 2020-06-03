import { makePostRequest, apiServicesTree } from '../../services/apiServices'

export async function reportQuestionService(
    clientToken,
    reportingUserId,
    reportedQuestionId,
    params
) {
    return makePostRequest(
        apiServicesTree.questionReportingApi.reportQuestion,
        {
            ...params,
            reportedQuestionId: reportedQuestionId,
            reportingUserId: reportingUserId,
            clientToken: clientToken
        }
    )
}
