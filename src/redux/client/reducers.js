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
        case clientTypes.SAVE_USER_JOKERS:
            return {
                ...state,
                userJokers: action.payload
            }
        case clientTypes.SUBTRACT_JOKER:
            let userJokers = state.userJokers
            let index = userJokers.findIndex(x => x.jokerId === action.jokerId)
            userJokers[index].amount--
            return {
                ...state,
                userJokers: userJokers
            }
        case clientTypes.UPDATE_TOTAL_POINTS:
            const clientInformation = state.clientInformation
            clientInformation.totalPoints += action.totalEarnedPoints
            return {
                ...state,
                clientInformation: clientInformation
            }
        case clientTypes.SAVE_ONE_JOKER:
            userJokers = state.userJokers
            index = userJokers.findIndex(
                x => x.jokerId === action.joker.jokerId
            )
            userJokers[index] = action.joker
            return {
                ...state,
                userJokers: userJokers
            }
        default:
            return state
    }
}
