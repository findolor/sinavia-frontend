export const appTypes = {
    SET_NETWORK_CONNECTION_INFO: 'set_network_connection_info',
    GET_LEADERBOARD: 'get_leaderboard',
    GET_LEADERBOARD_SUCCESS: 'get_leaderboard_success',
    SAVE_CLIENT_RANKING: 'save_client_ranking'
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

export const appActions = {
    setNetworkConnectionInfo: setNetworkConnectionInfo,
    getLeaderboard: getLeaderboard
}
