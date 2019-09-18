export const friendTypes = {
    SAVE_FRIEND_IDS: 'save_friend_ids',
    SAVE_FRIEND_REQUESTS: 'save_friend_requests',
    GET_FRIEND_REQUESTS: 'get_friend_requests',
    REMOVE_FROM_FRIEND_REQUESTS: 'remove_from_friend_requests'
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

removeFromFriendRequests = friendRequestIndex => {
    return {
        type: friendTypes.REMOVE_FROM_FRIEND_REQUESTS,
        payload: friendRequestIndex
    }
}

export const friendActions = {
    saveFriendIds: saveFriendIds,
    getFriendRequests: getFriendRequests,
    removeFromFriendRequests: removeFromFriendRequests
}
