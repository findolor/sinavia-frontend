import { INITIAL_STATE } from './initialState'
import { gameContentTypes } from './actions'
// TODO THINK ABOUT CONTETT LATER IMPORTRRANT
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
        case gameContentTypes.SAVE_EXAM_ID_TO_IDS:
            state.gameContentIds.examId = action.payload
            return {
                ...state,
                gameContentIds: state.gameContentIds
            }
        case gameContentTypes.SAVE_COURSE_ID_TO_IDS:
            state.gameContentIds.courseId = action.payload
            return {
                ...state,
                gameContentIds: state.gameContentIds
            }
        case gameContentTypes.SAVE_SUBJECT_ID_TO_IDS:
            state.gameContentIds.subjectId = action.payload
            return {
                ...state,
                gameContentIds: state.gameContentIds
            }
        case gameContentTypes.SAVE_GAME_CONTENT_MAP:
            return {
                ...state,
                gameContentMap: action.payload
            }
        default:
            return state
    }
}
