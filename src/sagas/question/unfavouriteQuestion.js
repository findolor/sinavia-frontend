import { apiServicesTree, makeDeleteRequest } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'

export function* unfavouriteQuestionSaga(action) {
    try {
        yield call(
            makeDeleteRequest,
            apiServicesTree.favouriteQuestionApi.unfavouriteQuestion,
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
    const index = favedQuestionList.findIndex(
        x => x.questionId === action.question.id
    )

    favedQuestionList.splice(index, 1)

    yield put({
        type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
        payload: favedQuestionList
    })

    deviceStorage.saveItemToStorage('favouriteQuestions', favedQuestionList)
}
