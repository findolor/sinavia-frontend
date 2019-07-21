export const userTypes = {
    CREATE_USER: 'create_user',
    CREATE_USER_SUCCESS: 'create_user_success',
    FETCH_USER: 'fetch_user',
    FETCH_USER_SUCCESS: 'fetch_user_success',
    GET_USER_TOKEN: 'get_user_token',
    GET_USER_TOKEN_SUCCESS: 'get_user_token_success'
}

export const userActions = {
    createUser: createUser,
    fetchUser: fetchUser,
    getUserToken: getUserToken
}

const createUser = userInformation => {
    return {
        type: userTypes.CREATE_USER,
        payload: userInformation
    }
}

const fetchUser = userToken => {
    return {
        type: userTypes.FETCH_USER,
        payload: userToken
    }
}

const getUserToken = userInformation => {
    return {
        type: userTypes.GET_USER_TOKEN,
        payload: userInformation
    }
}
