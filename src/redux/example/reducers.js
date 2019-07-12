import { INITIAL_STATE } from './initialState'
import { SAVE_TEXT } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_TEXT:
            return {
                ...state, text: action.payload
            }
        default:
            return state
    }
}
