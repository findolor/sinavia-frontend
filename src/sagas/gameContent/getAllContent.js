import { put, call } from 'redux-saga/effects'
import { gameContentTypes } from '../../redux/gameContent/actions'
import { navigationReset } from '../../services/navigationService'
import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export function* getAllContentSaga(action) {
    let response
    try {
        response = yield call(
            makeGetRequest,
            apiServicesTree.gameContentApi.getAllContent,
            { clientToken: action.clientToken }
        )
    } catch (err) {
        return
    }

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

    // This is the last step in creating a use
    // We navigate to the main screen
    navigationReset('main')
}
