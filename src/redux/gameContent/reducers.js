import { INITIAL_STATE } from './initialState'
import { gameContentTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case gameContentTypes.SAVE_CHOOSEN_EXAM:
            return {
                ...state,
                choosenExam: action.payload
            }
        case gameContentTypes.SAVE_EXAM_LIST:
            return {
                ...state,
                examList: action.payload
            }
        default:
            return state
    }
}
