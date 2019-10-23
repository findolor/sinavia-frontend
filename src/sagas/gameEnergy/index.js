import { getGameEnergyService } from './getGameEnergy'
import { subtractGameEnergyService } from './subtractGameEnergy'

export const gameEnergyServices = {
    getGameEnergy: getGameEnergyService,
    subtractGameEnergy: subtractGameEnergyService
}
