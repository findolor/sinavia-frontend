import { put, call } from 'redux-saga/effects'
import { exampleTypes, someAction } from 'src/redux/example/actions'
import { exampleService } from 'src/services/apiServices/exampleService'

export function* exampleSaga() {
    yield put(exampleTypes.SOME_TYPE, someAction) // This is a redux action. We use put function

    yield call(exampleService) // This is an API call. We use call function
}
