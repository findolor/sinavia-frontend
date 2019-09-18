import { INITIAL_STATE } from './initialState'
import { friendTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case friendTypes.SAVE_FRIEND_IDS:
            return {
                ...state,
                friendIds: action.payload
            }
        default:
            return state
    }
}
