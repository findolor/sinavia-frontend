import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { postUser } from '../../services/apiServices/user/postUser'
import { deviceStorage } from '../../services/deviceStorage'

export function* createUser(action) {
    try {
        const res = yield call(postUser, action.payload)
        console.log(res)
        deviceStorage.saveItemToStorage('userInformation', JSON.stringify(res))

        //yield put({ type: userTypes.CREATE_USER_SUCCESS, payload: res })
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
