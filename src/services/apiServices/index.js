import {
    apiServicesTree,
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
} from './requestService'

export { apiServicesTree }

export const makeGetRequest = async (apiFunctionName, params) => {
    return getRequest(apiFunctionName, params)
}

export const makePostRequest = async (apiFunctionName, params) => {
    return postRequest(apiFunctionName, params)
}

export const makePutRequest = async (apiFunctionName, params) => {
    return putRequest(apiFunctionName, params)
}

export const makeDeleteRequest = async (apiFunctionName, params) => {
    return deleteRequest(apiFunctionName, params)
}
