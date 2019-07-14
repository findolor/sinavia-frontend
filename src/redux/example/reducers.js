import { INITIAL_STATE } from './initialState'
import { exampleTypes } from './actions'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case exampleTypes.SOME_TYPE_SUCCESS:
            return {
                ...state,
                temp4: action.payload
            }
        default:
            return state
    }
}
