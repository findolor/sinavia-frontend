import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas'
import clientReducer from './client/reducers'
import friendsReducer from './friends/reducers'
import opponentsReducer from './opponents/reducers'
import gameContentReducer from './gameContent/reducers'
import appReducer from './app/reducers'

export default () => {
    const rootReducer = combineReducers({
        client: clientReducer,
        friends: friendsReducer,
        opponent: opponentsReducer,
        gameContent: gameContentReducer,
        app: appReducer
    })

    return configureStore(rootReducer, rootSaga)
}
