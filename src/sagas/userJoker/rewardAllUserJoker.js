import { makePutRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'

export function* rewardAllUserJokerSaga(action) {
    let response
    try {
        response = yield call(
            makePutRequest,
            apiServicesTree.userJokerApi.rewardAllUserJokers,
            {
                userId: action.clientId,
                clientToken: action.clientToken
            }
        )
    } catch (err) {
        return
    }

    yield put({
        type: clientTypes.SAVE_USER_JOKERS,
        payload: response
    })
}
