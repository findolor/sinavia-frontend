import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'
import { makePutRequest, apiServicesTree } from '../../services/apiServices'

export function* purchasePremium(action) {
    try {
        const response = yield call(
            makePutRequest,
            apiServicesTree.userApi.purchasePremium,
            {
                clientToken: action.clientToken,
                id: action.id,
                premiumTime: action.premiumTime
            }
        )

        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: response
        })
    } catch (error) {
        console.log(error)
    }
}
