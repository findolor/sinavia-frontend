import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas'
import exampleReducer from './example/reducers'
import userReducer from './user/reducers'

export default () => {
    const rootReducer = combineReducers({
        example: exampleReducer,
        user: userReducer
    })

    return configureStore(rootReducer, rootSaga)
}
