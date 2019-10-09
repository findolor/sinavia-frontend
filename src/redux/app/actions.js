export const appTypes = {
    SET_NETWORK_CONNECTION_INFO: 'set_network_connection_info',
    GET_LEADERBOARD: 'get_leaderboard',
    GET_LEADERBOARD_SUCCESS: 'get_leaderboard_success',
    SAVE_CLIENT_RANKING: 'save_client_ranking',
    GET_NOTIFICATIONS: 'get_notifications',
    SAVE_NOTIFICATIONS: 'save_notifications',
    REMOVE_FROM_NOTIFICATIONS: 'remove_from_notifications'
}

const setNetworkConnectionInfo = isNetworkConnected => {
    return {
        type: appTypes.SET_NETWORK_CONNECTION_INFO,
        payload: isNetworkConnected
    }
}

const getLeaderboard = (clientToken, examId, courseId, subjectId) => {
    return {
        type: appTypes.GET_LEADERBOARD,
        clientToken: clientToken,
        examId: examId,
        courseId: courseId,
        subjectId: subjectId
    }
}

const getNotifications = (clientToken, clientId) => {
    return {
        type: appTypes.GET_NOTIFICATIONS,
        clientToken: clientToken,
        clientId: clientId
    }
}

const removeFromNotifications = index => {
    return {
        type: appTypes.REMOVE_FROM_NOTIFICATIONS,
        payload: index
    }
}

export const appActions = {
    setNetworkConnectionInfo: setNetworkConnectionInfo,
    getLeaderboard: getLeaderboard,
    getNotifications: getNotifications,
    removeFromNotifications: removeFromNotifications
}
