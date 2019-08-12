import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { searchUsers } from '../../services/apiServices/user/searchUsers'
import { deviceStorage } from '../../services/deviceStorage'

async function getFromStorage(key) {
    const item = await deviceStorage.getItemFromStorage(key)
    return item
}

export function* findUsers(action) {
    const userToken = yield call(getFromStorage, 'JWT')

    const res = yield call(searchUsers, userToken, action.payload)

    let returnedSearchList = []

    res.forEach(user => {
        returnedSearchList.push({
            profilePicture: user.profilePicture,
            name: user.name + ' ' + user.lastname,
            username: user.username,
            userId: user.id
        })
    })

    yield put({
        type: userTypes.SEARCH_USERS_SUCCESS,
        payload: returnedSearchList
    })
}
