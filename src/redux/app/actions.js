export const appTypes = {
    SET_NETWORK_CONNECTION_INFO: 'set_network_connection_info',
    GET_LEADERBOARD: 'get_leaderboard',
    GET_LEADERBOARD_SUCCESS: 'get_leaderboard_success',
    SAVE_CLIENT_RANKING: 'save_client_ranking',
    GET_NOTIFICATIONS: 'get_notifications',
    SAVE_NOTIFICATIONS: 'save_notifications',
    REMOVE_FROM_NOTIFICATIONS: 'remove_from_notifications',
    /* REMOVE_ONE_ENERGY: 'remove_one_energy',
    SAVE_ENERGY_AMOUNT: 'save_energy_amount', */
    LOCK_UNLOCK_BUTTON: 'lock_unlock_button',
    SAVE_NOTIFICATION_OPEN: 'save_notification_open',
    SET_CONNECTION_ERROR_MESSAGE: 'set_connection_error_message',
    INCREASE_FEATURE_PRESS_COUNT: 'increase_feature_press_count'
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

/* const removeOneEnergy = () => {
    return {
        type: appTypes.REMOVE_ONE_ENERGY
    }
} */

const lockUnlockButton = () => {
    return {
        type: appTypes.LOCK_UNLOCK_BUTTON
    }
}

const saveNotificationOpen = notificationOpen => {
    return {
        type: appTypes.SAVE_NOTIFICATION_OPEN,
        payload: notificationOpen
    }
}

const setConnectionErrorMessage = message => {
    return {
        type: appTypes.SET_CONNECTION_ERROR_MESSAGE,
        payload: message
    }
}

const increaseFeaturePressCount = () => {
    return {
        type: appTypes.INCREASE_FEATURE_PRESS_COUNT
    }
}

export const appActions = {
    setNetworkConnectionInfo: setNetworkConnectionInfo,
    getLeaderboard: getLeaderboard,
    getNotifications: getNotifications,
    removeFromNotifications: removeFromNotifications,
    //removeOneEnergy: removeOneEnergy,
    lockUnlockButton: lockUnlockButton,
    saveNotificationOpen: saveNotificationOpen,
    setConnectionErrorMessage: setConnectionErrorMessage,
    increaseFeaturePressCount: increaseFeaturePressCount
}
