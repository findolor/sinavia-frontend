import { unfavouriteQuestion } from '../../services/apiServices/favouriteQuestion/unfavouriteQuestion'
import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'

export function* unfavouriteQuestionSaga(action) {
    yield call(
        unfavouriteQuestion,
        action.clientToken,
        action.clientId,
        action.question.id
    )

    const favedQuestionList = action.favedQuestionList
    const index = favedQuestionList.findIndex(x => x.id === action.question.id)

    favedQuestionList.splice(index, 1)

    yield put({
        type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
        payload: favedQuestionList
    })

    deviceStorage.saveItemToStorage('favouriteQuestions', favedQuestionList)
}
