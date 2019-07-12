import { takeLatest, all } from 'redux-saga/effects'
import { exampleTypes } from 'App/Stores/Example/Actions'
import { exampleSaga } from './exampleSaga'

export default function* root() {
    yield all([
        takeLatest(exampleTypes.SOME_TYPE, exampleSaga)
        // We fill this function with all of our sagas
    ])
}
