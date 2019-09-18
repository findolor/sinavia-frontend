import { INITIAL_STATE } from './initialState'
import { friendTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case friendTypes.SAVE_FRIEND_IDS:
            return {
                ...state,
                friendIds: action.payload
            }
        case friendTypes.SAVE_FRIEND_REQUESTS:
            return {
                ...state,
                friendRequests: action.payload
            }
        case friendTypes.REMOVE_FROM_FRIEND_REQUESTS:
            state.friendRequests.splice(action.payload, 1)
            return {
                ...state,
                friendRequests: state.friendRequests
            }
        default:
            return state
    }
}
