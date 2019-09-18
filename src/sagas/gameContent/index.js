import { getFullExamInformationSaga } from './getFullExamInformation'
import { getAllContentSaga } from './getAllContent'

export const gameContentSagas = {
    getFullExamInformation: getFullExamInformationSaga,
    getAllContent: getAllContentSaga
}
