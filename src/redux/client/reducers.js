import { INITIAL_STATE } from './initialState'
import { clientTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case clientTypes.SAVE_CLIENT_CREDENTIALS:
            return {
                ...state,
                clientCredentials: action.payload
            }
        case clientTypes.SAVE_CLIENT_INFORMATION:
            return {
                ...state,
                clientInformation: action.payload
            }
        case clientTypes.SAVE_API_TOKEN:
            return {
                ...state,
                clientToken: action.payload
            }
        case clientTypes.SAVE_CLIENT_DB_ID:
            return {
                ...state,
                clientDBId: action.payload
            }
        case clientTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                temp: action.payload
            }
        case clientTypes.SAVE_CHOOSEN_EXAM:
            return {
                ...state,
                choosenExam: action.payload
            }
        case clientTypes.SEARCH_USERS_SUCCESS:
            return {
                ...state,
                returnedSearchList: action.payload
            }
        case clientTypes.SAVE_FAVOURITE_QUESTIONS:
            return {
                ...state,
                favouriteQuestions: action.payload
            }
        default:
            return state
    }
}
