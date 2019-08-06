import { INITIAL_STATE } from './initialState'
import { userTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                name: action.payload.name,
                lastname: action.payload.lastname,
                profilePicture: action.payload.profilePicture,
                coverPicture: action.payload.coverPicture
            }
        case userTypes.AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                name: action.payload.name,
                lastname: action.payload.lastname,
                profilePicture: action.payload.profilePicture,
                coverPicture: action.payload.coverPicture
            }
        case userTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                name: action.payload.name,
                lastname: action.payload.lastname,
                profilePicture: action.payload.profilePicture,
                coverPicture: action.payload.coverPicture
            }
        case userTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                temp: action.payload
            }
        case userTypes.SAVE_CHOOSEN_EXAM:
            return {
                ...state,
                choosenExam: action.payload
            }
        default:
            return state
    }
}
