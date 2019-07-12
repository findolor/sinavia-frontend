import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from 'src/sagas'
import { reducer as exampleReducer } from './example/reducers'

export default () => {
    const rootReducer = combineReducers({
        example: exampleReducer
    })

    return configureStore(rootReducer, rootSaga)
}
