import { INITIAL_STATE } from './initialState'
import { opponentTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case opponentTypes.SAVE_OPPONENT_INFORMATION:
            return {
                ...state,
                opponentInformation: action.payload
            }
        case opponentTypes.SAVE_TOTAL_PLAYED_GAMES:
            return {
                ...state,
                totalPlayedGames: action.payload
            }
        case opponentTypes.SAVE_GAMES_WON:
            return {
                ...state,
                gamesWon: action.payload
            }
        case opponentTypes.SAVE_GAMES_LOST:
            return {
                ...state,
                gamesLost: action.payload
            }
        case opponentTypes.SAVE_GAMES_DRAW:
            return {
                ...state,
                gamesDraw: action.payload
            }
        case opponentTypes.SAVE_IS_FRIENDS:
            return {
                ...state,
                isFriends: action.payload
            }
        case opponentTypes.SAVE_IS_REQUESTING:
            return {
                ...state,
                isRequesting: action.payload
            }
        case opponentTypes.SAVE_IS_REQUESTED:
            return {
                ...state,
                isRequested: action.payload
            }
        case opponentTypes.SAVE_TOTAL_FRIEND_GAMES:
            return {
                ...state,
                totalFriendGames: action.payload
            }
        case opponentTypes.SAVE_OPPONENT_WIN_COUNT:
            return {
                ...state,
                opponentWinCount: action.payload
            }
        case opponentTypes.SAVE_CLIENT_WIN_COUNT:
            return {
                ...state,
                clientWinCount: action.payload
            }
        case opponentTypes.SAVE_WIN_PERCENTAGE:
            return {
                ...state,
                winPercentage: action.payload
            }
        case opponentTypes.SAVE_FRIENDS_LIST:
            return {
                ...state,
                friendsList: action.payload
            }
        default:
            return state
    }
}
