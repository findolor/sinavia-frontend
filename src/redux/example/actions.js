export const exampleTypes = {
    SOME_TYPE: 'some_type'
}

export const someAction = () => {
    return {
        type: exampleTypes.SOME_TYPE,
        payload: 'Some return value'
    }
}
