import { subtractGameEnergy } from '../../services/apiServices/gameEnergy/subtractGameEnergy'

export const subtractGameEnergyService = async (clientToken, clientId) => {
    return subtractGameEnergy(clientToken, clientId)
}
