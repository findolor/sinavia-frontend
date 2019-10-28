import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export const getGameEnergyService = async (clientToken, clientId) => {
    return makeGetRequest(apiServicesTree.gameEnergyApi.getGameEnergy, {
        clientToken: clientToken,
        clientId: clientId
    })
}
