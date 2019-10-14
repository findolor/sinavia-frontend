export const clientTypes = {
    USER_SIGN_UP: 'user_sign_up',
    FETCH_USER: 'fetch_user',
    FETCH_USER_SUCCESS: 'fetch_user_success',
    GET_USER_TOKEN: 'get_user_token',
    CHECK_USER_TOKEN: 'check_user_token',
    LOGIN_USER: 'login_user',
    SEARCH_USERS: 'search_users',
    SEARCH_USERS_SUCCESS: 'search_users_success',
    SAVE_CLIENT_INFORMATION: 'save_client_information',
    SAVE_CLIENT_CREDENTIALS: 'save_client_credentials',
    SAVE_API_TOKEN: 'save_api_token',
    SAVE_CLIENT_DB_ID: 'save_client_db_id',
    FAVOURITE_QUESTION: 'favourite_question',
    UNFAVOURITE_QUESTION: 'unfavourite_question',
    SAVE_FAVOURITE_QUESTIONS: 'save_favourite_questions',
    SAVE_USER_JOKERS: 'save_user_jokers',
    SUBTRACT_JOKER: 'subtract_joker',
    UPDATE_USER: 'update_user',
    CREATE_USER: 'create_user'
}

const userSignUp = userInformation => {
    return {
        type: clientTypes.USER_SIGN_UP,
        payload: userInformation
    }
}

const createUser = userInformation => {
    return {
        type: clientTypes.CREATE_USER,
        payload: userInformation
    }
}

const fetchUser = userToken => {
    return {
        type: clientTypes.FETCH_USER,
        payload: userToken
    }
}

const checkUserToken = userToken => {
    return {
        type: clientTypes.CHECK_USER_TOKEN,
        payload: userToken
    }
}

const loginUser = userCredentials => {
    return {
        type: clientTypes.LOGIN_USER,
        payload: userCredentials
    }
}

const searchUsers = searchedKeyword => {
    return {
        type: clientTypes.SEARCH_USERS,
        payload: searchedKeyword
    }
}

const favouriteQuestion = (
    clientToken,
    clientId,
    question,
    favedQuestionList
) => {
    return {
        type: clientTypes.FAVOURITE_QUESTION,
        clientToken: clientToken,
        clientId: clientId,
        question: question,
        favedQuestionList: favedQuestionList
    }
}

const unfavouriteQuestion = (
    clientToken,
    clientId,
    question,
    favedQuestionList
) => {
    return {
        type: clientTypes.UNFAVOURITE_QUESTION,
        clientToken: clientToken,
        clientId: clientId,
        question: question,
        favedQuestionList: favedQuestionList
    }
}

subtractJoker = jokerId => {
    return {
        type: clientTypes.SUBTRACT_JOKER,
        jokerId: jokerId
    }
}

updateUser = (clientToken, clientId, clientInformation, isPasswordChange) => {
    return {
        type: clientTypes.UPDATE_USER,
        clientToken: clientToken,
        clientId: clientId,
        clientInformation: clientInformation,
        isPasswordChange: isPasswordChange
    }
}

export const clientActions = {
    userSignUp: userSignUp,
    fetchUser: fetchUser,
    checkUserToken: checkUserToken,
    loginUser: loginUser,
    searchUsers: searchUsers,
    favouriteQuestion: favouriteQuestion,
    unfavouriteQuestion: unfavouriteQuestion,
    subtractJoker: subtractJoker,
    updateUser: updateUser,
    createUser: createUser
}
