export const clientTypes = {
    CREATE_USER: 'create_user',
    FETCH_USER: 'fetch_user',
    FETCH_USER_SUCCESS: 'fetch_user_success',
    GET_USER_TOKEN: 'get_user_token',
    CHECK_USER_TOKEN: 'check_user_token',
    LOGIN_USER: 'login_user',
    SAVE_CHOOSEN_EXAM: 'save_choosen_exam',
    SEARCH_USERS: 'search_users',
    SEARCH_USERS_SUCCESS: 'search_users_success',
    SAVE_CLIENT_INFORMATION: 'save_client_information',
    SAVE_CLIENT_CREDENTIALS: 'save_client_credentials',
    SAVE_API_TOKEN: 'save_api_token',
    SAVE_CLIENT_DB_ID: 'save_client_db_id',
    FAVOURITE_QUESTION: 'favourite_question',
    UNFAVOURITE_QUESTION: 'unfavourite_question',
    SAVE_FAVOURITE_QUESTIONS: 'save_favourite_questions'
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

const saveChoosenExam = choosenExam => {
    return {
        type: clientTypes.SAVE_CHOOSEN_EXAM,
        payload: choosenExam
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

export const clientActions = {
    createUser: createUser,
    fetchUser: fetchUser,
    checkUserToken: checkUserToken,
    loginUser: loginUser,
    saveChoosenExam: saveChoosenExam,
    searchUsers: searchUsers,
    favouriteQuestion: favouriteQuestion,
    unfavouriteQuestion: unfavouriteQuestion
}
