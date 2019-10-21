export const opponentTypes = {
    GET_OPPONENT_FULL_INFORMATION: 'get_opponent_full_information',
    SAVE_OPPONENT_INFORMATION: 'save_opponent_information',
    SAVE_TOTAL_RANKED_WIN: 'save_total_ranked_win',
    SAVE_TOTAL_RANKED_LOSE: 'save_total_ranked_lose',
    SAVE_TOTAL_RANKED_DRAW: 'save_total_ranked_draw',
    SAVE_TOTAL_FRIEND_WIN: 'save_total_friend_win',
    SAVE_TOTAL_FRIEND_LOSE: 'save_total_friend_lose',
    SAVE_TOTAL_FRIEND_DRAW: 'save_total_friend_draw',
    SAVE_TOTAL_RANKED_GAMES: 'save_total_ranked_games',
    SAVE_TOTAL_FRIEND_GAMES: 'save_total_friend_games',
    SAVE_RANKED_WIN_PERCENTAGE: 'save_ranked_win_percentage',
    SAVE_FRIEND_WIN_PERCENTAGE: 'save_friend_win_percentage',
    SAVE_IS_FRIENDS: 'save_is_friends',
    SAVE_IS_REQUESTING: 'save_is_requesting',
    SAVE_IS_REQUESTED: 'save_is_requested',
    SAVE_TOTAL_FRIEND_MATCHES_COUNT: 'save_total_friend_matches_count',
    SAVE_OPPONENT_WIN_COUNT: 'save_opponent_win_count',
    SAVE_CLIENT_WIN_COUNT: 'save_client_win_count',
    SAVE_FRIENDS_LIST: 'save_friends_list',
    SUBTRACT_FROM_FRIENDS_LIST: 'subtract_from_friends_list',
    ADD_TO_FRIENDS_LIST: 'add_to_friends_list'
}

const getOpponentFullInformation = (
    opponentInformation,
    clientId,
    clientToken,
    isWithSearchBar,
    isFromOpponentScreen
) => {
    return {
        type: opponentTypes.GET_OPPONENT_FULL_INFORMATION,
        opponentInformation: opponentInformation,
        clientId: clientId,
        clientToken: clientToken,
        isWithSearchBar: isWithSearchBar,
        isFromOpponentScreen: isFromOpponentScreen
    }
}

const subtractFromFriendsList = opponentInformation => {
    return {
        type: opponentTypes.SUBTRACT_FROM_FRIENDS_LIST,
        payload: opponentInformation
    }
}

const addToFriendsList = opponentInformation => {
    return {
        type: opponentTypes.ADD_TO_FRIENDS_LIST,
        payload: opponentInformation
    }
}

export const opponentActions = {
    getOpponentFullInformation: getOpponentFullInformation,
    subtractFromFriendsList: subtractFromFriendsList,
    addToFriendsList: addToFriendsList
}
