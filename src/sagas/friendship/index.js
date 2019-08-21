import { getFriendshipService } from './getFriendship'
import { getFriendsService } from './getFriends'
import { getFriendMatchesService } from './getFriendMatches'
import { sendFriendshipRequestService } from './sendFriendshipRequest'
import { acceptFriendshipRequestService } from './acceptFriendshipRequest'
import { deleteFriendshipService } from './deleteFriendship'
import { getFriendRequestsService } from './getFriendRequests'

export const friendshipServices = {
    getFriendship: getFriendshipService,
    getFriends: getFriendsService,
    getFriendMatches: getFriendMatchesService,
    sendFriendshipRequest: sendFriendshipRequestService,
    acceptFriendshipRequest: acceptFriendshipRequestService,
    deleteFriendship: deleteFriendshipService,
    getFriendRequests: getFriendRequestsService
}
