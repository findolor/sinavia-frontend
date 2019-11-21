import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export async function checkOnlineService() {
    return makeGetRequest(apiServicesTree.api.checkOnline)
}
