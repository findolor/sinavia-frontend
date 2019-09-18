import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'

export function* saveFavouriteQuestionsSaga(action) {
    const favouriteQuestions = {}

    action.payload.forEach(question => {
        if (favouriteQuestions[question.question.examId] === undefined) {
            favouriteQuestions[question.question.examId] = {}
            if (
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ] === undefined
            ) {
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ] = []
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ].push(question)
            } else
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ].push(question)
        } else if (
            favouriteQuestions[question.question.examId][
                question.question.courseId
            ] === undefined
        ) {
            favouriteQuestions[question.question.examId][
                question.question.courseId
            ] = []
            favouriteQuestions[question.question.examId][
                question.question.courseId
            ].push(question)
        } else
            favouriteQuestions[question.question.examId][
                question.question.courseId
            ].push(question)
    })

    yield put({
        type: clientTypes.SAVE_FAVOURITE_QUESTIONS_SUCCESS,
        payload: favouriteQuestions
    })
}
