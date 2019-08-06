export const userTypes = {
    CREATE_USER: 'create_user',
    CREATE_USER_SUCCESS: 'create_user_success',
    FETCH_USER: 'fetch_user',
    FETCH_USER_SUCCESS: 'fetch_user_success',
    GET_USER_TOKEN: 'get_user_token',
    CHECK_USER_TOKEN: 'check_user_token',
    AUTHENTICATE_USER_SUCCESS: 'authenticate_user_success',
    LOGIN_USER: 'login_user',
    LOGIN_USER_SUCCESS: 'login_user_success'
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
    checkUserToken: checkUserToken,
    loginUser: loginUser
}
