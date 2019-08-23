import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas'
import clientReducer from './client/reducers'
import friendsReducer from './friends/reducers'

export default () => {
    const rootReducer = combineReducers({
        client: clientReducer,
        friends: friendsReducer
    })

    return configureStore(rootReducer, rootSaga)
}
