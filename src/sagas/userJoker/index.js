import { rewardAllUserJokerSaga } from './rewardAllUserJoker'
import { purchaseAllJokersSaga } from './purchaseAllJokers'
import { rewardUserJokerSaga } from './rewardUserJoker'

export const userJokerSagas = {
    rewardAllUserJoker: rewardAllUserJokerSaga,
    rewardUserJoker: rewardUserJokerSaga,
    purchaseAllJokers: purchaseAllJokersSaga
}
