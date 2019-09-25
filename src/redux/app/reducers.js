import { INITIAL_STATE } from './initialState'
import { appTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appTypes.SET_NETWORK_CONNECTION_INFO:
            return {
                ...state,
                isNetworkConnected: action.payload
            }
        default:
            return state
    }
}
