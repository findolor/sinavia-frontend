export const userTypes = {
    CREATE_USER: 'create_user',
    FETCH_USER: 'fetch_user',
    FETCH_USER_SUCCESS: 'fetch_user_success',
    GET_USER_TOKEN: 'get_user_token',
    CHECK_USER_TOKEN: 'check_user_token',
    LOGIN_USER: 'login_user'
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

const checkUserToken = userToken => {
    return {
        type: userTypes.CHECK_USER_TOKEN,
        payload: userToken
    }
}

const loginUser = userCredentials => {
    return {
        type: userTypes.LOGIN_USER,
        payload: userCredentials
    }
}

export const userActions = {
    createUser: createUser,
    fetchUser: fetchUser,
    getUserToken: getUserToken,
    checkUserToken: checkUserToken,
    loginUser: loginUser
}
