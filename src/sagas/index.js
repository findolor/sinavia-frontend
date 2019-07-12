import { takeLatest, all } from 'redux-saga/effects'
import { exampleTypes } from '../redux/example/actions'
import { exampleSaga } from './exampleSaga'

export default function* root() {
    yield all([
        takeLatest(exampleTypes.SOME_TYPE_REQUEST, exampleSaga)
        // We fill this function with all of our sagas
    ])
}
