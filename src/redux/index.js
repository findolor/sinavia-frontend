import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas'
import userReducer from './user/reducers'

export default () => {
    const rootReducer = combineReducers({
        user: userReducer
    })

    return configureStore(rootReducer, rootSaga)
}
