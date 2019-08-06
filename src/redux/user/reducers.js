import { INITIAL_STATE } from './initialState'
import { userTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                temp: action.payload
            }
        case userTypes.CHECK_USER_TOKEN_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state
    }
}
