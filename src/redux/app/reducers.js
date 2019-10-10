import { INITIAL_STATE } from './initialState'
import { appTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appTypes.SET_NETWORK_CONNECTION_INFO:
            return {
                ...state,
                isNetworkConnected: action.payload
            }
        case appTypes.GET_LEADERBOARD_SUCCESS:
            return {
                ...state,
                leaderboardUserList: action.payload
            }
        case appTypes.SAVE_CLIENT_RANKING:
            return {
                ...state,
                clientRanking: action.payload
            }
        case appTypes.SAVE_NOTIFICATIONS:
            return {
                ...state,
                userNotificationList: action.payload
            }
        case appTypes.REMOVE_FROM_NOTIFICATIONS:
            state.userNotificationList.splice(action.payload, 1)
            return {
                ...state,
                userNotificationList: state.userNotificationList
            }
        default:
            return state
    }
}
