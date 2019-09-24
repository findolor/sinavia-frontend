import NetInfo from '@react-native-community/netinfo'

export const fetchNetwokInfo = () => {
    return NetInfo.fetch()
}

export const subscribeNetworkInfo = () => {
    return NetInfo.addEventListener
}
