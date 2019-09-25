export const appTypes = {
    SET_NETWORK_CONNECTION_INFO: 'set_network_connection_info'
}

const setNetworkConnectionInfo = isNetworkConnected => {
    return {
        type: appTypes.SET_NETWORK_CONNECTION_INFO,
        payload: isNetworkConnected
    }
}

export const appActions = {
    setNetworkConnectionInfo: setNetworkConnectionInfo
}
