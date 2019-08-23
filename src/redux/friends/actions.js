export const friendTypes = {
    SAVE_FRIEND_IDS: 'save_friend_ids'
}

const saveFriendIds = friendIds => {
    return {
        type: friendTypes.SAVE_FRIEND_IDS,
        payload: friendIds
    }
}

export const friendActions = {
    saveFriendIds: saveFriendIds
}
