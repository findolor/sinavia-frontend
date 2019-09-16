import { getFullExamInformation } from '../../services/apiServices/gameContent/getFullExamInformation'
import { put, call } from 'redux-saga/effects'
import { gameContentTypes } from '../../redux/gameContent/actions'

export function* getFullExamInformationSaga(action) {
    const allContent = yield call(
        getFullExamInformation,
        action.clientToken,
        action.examId
    )

    const courseList = []

    allContent.courseEntities.forEach(courseEntity => {
        courseList.push(courseEntity)
    })

    yield put({
        type: gameContentTypes.SAVE_COURSE_LIST,
        payload: courseList
    })
}
