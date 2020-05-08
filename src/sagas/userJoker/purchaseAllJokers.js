import { makePutRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'

export function* purchaseAllJokersSaga(action) {
    let response
    try {
        response = yield call(
            makePutRequest,
            apiServicesTree.userJokerApi.purchaseAllJokers,
            {
                userId: action.clientId,
                clientToken: action.clientToken,
                jokerAmount: action.jokerAmount
            }
        )

        yield put({
            type: clientTypes.SAVE_USER_JOKERS,
            payload: response
        })
    } catch (err) {
        return
    }
}
