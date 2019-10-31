import { apiServicesTree, makePutRequest } from '../../services/apiServices'

export const subtractGameEnergyService = async (clientToken, clientId) => {
    return makePutRequest(apiServicesTree.gameEnergyApi.subtractGameEnergy, {
        clientToken: clientToken,
        clientId: clientId
    })
}
