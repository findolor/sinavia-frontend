import { sendFriendGameRequestService } from './sendFriendGameRequest'
import { checkOngoingMatchService } from './checkOngoingMatch'

export const friendGameServices = {
    sendFriendGameRequest: sendFriendGameRequestService,
    checkOngoingMatch: checkOngoingMatchService
}
