import { makePostRequest, apiServicesTree } from '../../services/apiServices'

export async function reportUserService(
    clientToken,
    reportingUserId,
    reportedUserId,
    params
) {
    return makePostRequest(apiServicesTree.userReportingApi.reportUser, {
        ...params,
        reportedUserId: reportedUserId,
        reportingUserId: reportingUserId,
        clientToken: clientToken
    })
}
