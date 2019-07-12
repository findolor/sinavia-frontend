export const exampleTypes = {
    SOME_TYPE_REQUEST: 'some_type',
    SOME_TYPE_SUCCESS: 'some_type_success'
}

export const someAction = message => {
    return {
        type: exampleTypes.SOME_TYPE_REQUEST,
        payload: message
    }
}
