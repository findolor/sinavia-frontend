import { favouriteQuestionSaga } from './favouriteQuestion'
import { unfavouriteQuestionSaga } from './unfavouriteQuestion'
import { saveFavouriteQuestionsSaga } from './saveFavouriteQuestions'

export const questionSagas = {
    favouriteQuestion: favouriteQuestionSaga,
    unfavouriteQuestion: unfavouriteQuestionSaga,
    saveFavouriteQuestions: saveFavouriteQuestionsSaga
}
