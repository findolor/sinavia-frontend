import { put, call } from 'redux-saga/effects'
import { exampleTypes } from '../redux/example/actions'
import { connectToApi } from '../services/apiServices/exampleService'

export function* exampleSaga() {
    const res = yield call(connectToApi) // This is an API call. We use call function
    console.log(res)
    yield put({ type: exampleTypes.SOME_TYPE_SUCCESS, payload: res.status }) // This is a redux action. We use put function
}
