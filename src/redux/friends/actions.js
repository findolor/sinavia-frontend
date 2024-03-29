export const friendTypes = {
    SAVE_FRIEND_IDS: 'save_friend_ids',
    SAVE_FRIEND_REQUESTS: 'save_friend_requests',
    GET_FRIEND_REQUESTS: 'get_friend_requests',
    REMOVE_FROM_FRIEND_REQUESTS: 'remove_from_friend_requests',
    ACCEPT_FRIENDSHIP_REQUEST: 'accept_friendship_request',
    SEND_FRIENDSHIP_REQUEST: 'send_friendship_request',
    DELETE_FRIENDSHIP_REQUEST: 'delete_friendship_request',
    CHANGE_IS_FRIEND_REQUEST_SENT: 'change_is_friend_request_sent',
    REJECT_FRIENDSHIP_REQUEST: 'reject_friendship_request'
}

const saveFriendIds = friendIds => {
    return {
        type: friendTypes.SAVE_FRIEND_IDS,
        payload: friendIds
    }
}

const getFriendRequests = (clientToken, clientId) => {
    return {
        type: friendTypes.GET_FRIEND_REQUESTS,
        clientToken: clientToken,
        clientId: clientId
    }
}

const removeFromFriendRequests = friendRequestIndex => {
    return {
        type: friendTypes.REMOVE_FROM_FRIEND_REQUESTS,
        payload: friendRequestIndex
    }
}

const sendFriendRequest = (clientToken, clientId, friendId, clientUsername) => {
    return {
        type: friendTypes.SEND_FRIENDSHIP_REQUEST,
        clientToken: clientToken,
        clientDBId: clientId,
        friendId: friendId,
        clientUsername: clientUsername
    }
}

const acceptFriendRequest = (
    clientToken,
    clientId,
    friendId,
    clientUsername,
    friendIds,
    profilePicture
) => {
    return {
        type: friendTypes.ACCEPT_FRIENDSHIP_REQUEST,
        clientToken: clientToken,
        clientDBId: clientId,
        friendId: friendId,
        clientUsername: clientUsername,
        friendIds: friendIds,
        profilePicture: profilePicture
    }
}

const deleteFriendRequest = (
    clientToken,
    clientId,
    friendId,
    isClientUser,
    friendIds
) => {
    return {
        type: friendTypes.DELETE_FRIENDSHIP_REQUEST,
        clientToken: clientToken,
        clientDBId: clientId,
        friendId: friendId,
        isClientUser: isClientUser,
        friendIds: friendIds
    }
}

const rejectFriendshipRequest = (
    clientToken,
    userId,
    friendId,
    friendshipRequests
) => {
    return {
        type: friendTypes.REJECT_FRIENDSHIP_REQUEST,
        clientToken: clientToken,
        userId: userId,
        friendId: friendId,
        friendshipRequests: friendshipRequests
    }
}

export const friendActions = {
    saveFriendIds: saveFriendIds,
    getFriendRequests: getFriendRequests,
    removeFromFriendRequests: removeFromFriendRequests,
    sendFriendRequest: sendFriendRequest,
    acceptFriendRequest: acceptFriendRequest,
    deleteFriendRequest: deleteFriendRequest,
    rejectFriendshipRequest: rejectFriendshipRequest
}
