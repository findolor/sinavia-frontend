import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

export default (rootReducer, rootSaga) => {
    // Connect the sagas to the redux store
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

    // Kick off the root saga
    sagaMiddleware.run(rootSaga)

    return { store }
}
