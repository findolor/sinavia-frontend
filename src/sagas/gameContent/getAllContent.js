import { getAllContent } from '../../services/apiServices/gameContent/getAllContent'
import { put, call } from 'redux-saga/effects'
import { gameContentTypes } from '../../redux/gameContent/actions'

export function* getAllContentSaga(action) {
    const allContent = yield call(getAllContent, action.clientToken)
    const examList = []

    allContent.forEach(examEntity => {
        examList.push(examEntity)
    })

    yield put({
        type: gameContentTypes.SAVE_EXAM_LIST,
        payload: examList
    })
}
