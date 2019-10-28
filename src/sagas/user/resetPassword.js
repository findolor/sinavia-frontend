import { apiServicesTree, makePostRequest } from '../../services/apiServices'

export async function resetPassword(email) {
    return makePostRequest(apiServicesTree.userApi.forgotPassword, {
        email: email
    })
}
