import { getGameEnergy } from '../../services/apiServices/gameEnergy/getGameEnergy'

export const getGameEnergyService = async (clientToken, clientId) => {
    return getGameEnergy(clientToken, clientId)
}
