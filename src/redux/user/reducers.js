import { INITIAL_STATE } from './initialState'
import { userTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                temp: action.payload
            }
        case userTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                temp: action.payload
            }
        case userTypes.GET_USER_TOKEN_SUCCESS:
            return {
                ...state,
                userToken: action.payload,
                temp: {
                    token: action.payload
                }
            }
        default:
            return state
    }
}
