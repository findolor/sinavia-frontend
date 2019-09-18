import { favouriteQuestionSaga } from './favouriteQuestion'
import { unfavouriteQuestionSaga } from './unfavouriteQuestion'

export const questionSagas = {
    favouriteQuestion: favouriteQuestionSaga,
    unfavouriteQuestion: unfavouriteQuestionSaga
}
