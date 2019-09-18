import { favouriteQuestion } from '../../services/apiServices/favouriteQuestion/favouriteQuestion'
import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'

export function* favouriteQuestionSaga(action) {
    const response = yield call(
        favouriteQuestion,
        action.clientToken,
        action.clientId,
        action.question.id
    )

    const favedQuestionList = action.favedQuestionList
    favedQuestionList.push(response)

    yield put({
        type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
        payload: favedQuestionList
    })

    deviceStorage.saveItemToStorage(
        'favouriteQuestions',
        JSON.stringify(favedQuestionList)
    )
}
