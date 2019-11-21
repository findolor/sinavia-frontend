import { apiServicesTree, makePostRequest } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'

export function* favouriteQuestionSaga(action) {
    let response
    try {
        response = yield call(
            makePostRequest,
            apiServicesTree.favouriteQuestionApi.favouriteQuestion,
            {
                userId: action.clientId,
                questionId: action.question.id,
                clientToken: action.clientToken
            }
        )
    } catch (err) {
        return
    }

    const favedQuestionList = action.favedQuestionList
    favedQuestionList.push(response)

    yield put({
        type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
        payload: favedQuestionList
    })

    deviceStorage.saveItemToStorage('favouriteQuestions', favedQuestionList)
}
