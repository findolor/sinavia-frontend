import { makePutRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'

export function* purchaseAllJokersSaga(action) {
    let response
    try {
        response = yield call(
            makePutRequest,
            apiServicesTree.userJokerApi.rewardUserJoker,
            {
                userId: action.clientId,
                clientToken: action.clientToken,
                jokerAmount: action.jokerAmount
            }
        )
    } catch (err) {
        return
    }

    yield put({
        type: clientTypes.SAVE_USER_JOKERS,
        joker: response
    })
}
