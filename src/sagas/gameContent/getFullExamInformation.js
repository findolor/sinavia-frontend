import { getFullExamInformation } from '../../services/apiServices/gameContent/getFullExamInformation'
import { put, call } from 'redux-saga/effects'
import { gameContentTypes } from '../../redux/gameContent/actions'
import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export function* getFullExamInformationSaga(action) {
    const allContent = yield call(
        makeGetRequest,
        apiServicesTree.gameContentApi.getFullExamInformation,
        {
            clientToken: action.clientToken,
            examId: action.examId
        }
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
