import { INITIAL_STATE } from './initialState'
import { exampleTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case exampleTypes.SOME_TYPE:
            return {
                ...state
            }
        default:
            return state
    }
}
