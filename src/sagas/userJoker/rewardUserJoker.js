import { makePutRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'

export function* rewardUserJokerSaga(action) {
    let response
    try {
        response = yield call(
            makePutRequest,
            apiServicesTree.userJokerApi.rewardUserJoker,
            {
                userId: action.clientId,
                clientToken: action.clientToken,
                jokerId: action.jokerId,
                jokerAmount: action.jokerAmount
            }
        )
    } catch (err) {
        return
    }

    yield put({
        type: clientTypes.SAVE_ONE_JOKER,
        joker: response
    })
    yield put({
        type: clientTypes.SAVE_JOKER_UPDATE,
        payload: action.jokerUpdate + 1
    })
}
