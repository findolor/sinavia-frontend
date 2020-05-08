import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export default getAgreement = () =>
    makeGetRequest(apiServicesTree.agreementApi.getAgreement)
