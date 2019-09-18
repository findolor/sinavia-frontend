import { getAllContent } from '../../services/apiServices/gameContent/getAllContent'
import { put, call } from 'redux-saga/effects'
import { gameContentTypes } from '../../redux/gameContent/actions'

export function* getAllContentSaga(action) {
    const response = yield call(getAllContent, action.clientToken)

    console.log(response)
    const examList = []

    // TODO THINK ABOUT CONTETT LATER IMPORTRRANT
    response.data.forEach(examEntity => {
        examList.push(examEntity)
    })

    yield put({
        type: gameContentTypes.SAVE_EXAM_LIST,
        payload: examList
    })

    yield put({
        type: gameContentTypes.SAVE_GAME_CONTENT_MAP,
        payload: response.gameContentMap
    })
}
