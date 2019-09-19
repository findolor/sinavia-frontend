export const opponentTypes = {
    GET_OPPONENT_FULL_INFORMATION: 'get_opponent_full_information',
    SAVE_OPPONENT_INFORMATION: 'save_opponent_information',
    SAVE_TOTAL_PLAYED_GAMES: 'save_total_played_games',
    SAVE_GAMES_WON: 'save_games_won',
    SAVE_GAMES_LOST: 'save_games_lost',
    SAVE_GAMES_DRAW: 'save_games_draw',
    SAVE_IS_FRIENDS: 'save_is_friends',
    SAVE_IS_REQUESTING: 'save_is_requesting',
    SAVE_IS_REQUESTED: 'save_is_requested',
    SAVE_TOTAL_FRIEND_GAMES: 'save_total_friend_games',
    SAVE_OPPONENT_WIN_COUNT: 'save_opponent_win_count',
    SAVE_CLIENT_WIN_COUNT: 'save_client_win_count',
    SAVE_WIN_PERCENTAGE: 'save_win_percentage',
    SAVE_FRIENDS_LIST: 'save_friends_list',
    SAVE_TOTAL_POINTS: 'save_total_points',
    SUBTRACT_FROM_FRIENDS_LIST: 'subtract_from_friends_list',
    ADD_TO_FRIENDS_LIST: 'add_to_friends_list'
}

const getOpponentFullInformation = (
    opponentInformation,
    clientId,
    clientToken,
    isWithSearchBar
) => {
    return {
        type: opponentTypes.GET_OPPONENT_FULL_INFORMATION,
        opponentInformation: opponentInformation,
        clientId: clientId,
        clientToken: clientToken,
        isWithSearchBar: isWithSearchBar
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
