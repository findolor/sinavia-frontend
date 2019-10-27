import {
    favouriteQuestion,
    getFavouriteQuestions,
    unfavouriteQuestion
} from './favouriteQuestion'
import { updateFCMToken } from './fcmToken'
import { sendGameRequest } from './friendGame'
import {
    acceptFriendshipRequest,
    deleteFriendship,
    getFriendMatches,
    getFriendRequests,
    getFriends,
    getFriendship,
    rejectFriendshipRequest,
    sendFriendshipRequest
} from './friendship'
import {
    getAllContent,
    getExamList,
    getFullExamInformation
} from './gameContent'
import { getGameEnergy, subtractGameEnergy } from './gameEnergy'
import { getLeaderboard, getUserScores } from './leaderboard'
import {
    getNotifications,
    markNotificationRead,
    rejectOngoingMatch
} from './notification'
import {
    getLastSixMonthsStatistics,
    getMonthlyStatistics,
    getStatistics,
    getWeeklyStatistics
} from './statistic'
import { checkToken, getToken, renewToken } from './token'
import {
    getOpponentFullInformation,
    getUser,
    getUsers,
    forgotPassword,
    postUser,
    searchUsers,
    updateUser
} from './user'
import { getUserJokers } from './userJoker'

export const apiServicesTree = {
    favouriteQuestionApi: {
        favouriteQuestion: 'favouriteQuestion',
        getFavouriteQuestions: 'getFavouriteQuestions',
        unfavouriteQuestion: 'unfavouriteQuestion'
    },
    fcmTokenApi: {
        postFCMToken: 'postFCMToken'
    },
    friendGameApi: {
        sendGameRequest: 'sendGameRequest'
    },
    friendshipApi: {
        acceptFriendshipRequest: 'acceptFriendshipRequest',
        deleteFriendship: 'deleteFriendship',
        getFriendMatches: 'getFriendMatches',
        getFriendRequests: 'getFriendRequests',
        getFriends: 'getFriends',
        getFriendship: 'getFriendship',
        rejectFriendshipRequest: 'rejectFriendshipRequest',
        sendFriendshipRequest: 'sendFriendshipRequest'
    },
    gameContentApi: {
        getAllContent: 'getAllContent',
        getExamList: 'getExamList',
        getFullExamInformation: 'getFullExamInformation'
    },
    gameEnergyApi: {
        getGameEnergy: 'getGameEnergy',
        subtractGameEnergy: 'subtractGameEnergy'
    },
    leaderboardApi: {
        getLeaderboard: 'getLeaderboard',
        getUserScores: 'getUserScores'
    },
    notificationApi: {
        getNotifications: 'getNotifications',
        markNotificationRead: 'markNotificationRead',
        rejectOngoingMatch: 'rejectOngoingMatch'
    },
    statisticApi: {
        getLastSixMonthsStatistics: 'getLastSixMonthsStatistics',
        getMonthlyStatistics: 'getMonthlyStatistics',
        getStatistics: 'getStatistics',
        getWeeklyStatistics: 'getWeeklyStatistics'
    },
    tokenApi: {
        checkToken: 'checkToken',
        getToken: 'getToken',
        renewToken: 'renewToken'
    },
    userApi: {
        forgotPassword: 'forgotPassword',
        getUsers: 'getUsers',
        getUser: 'getUser',
        getOpponentFullInformation: 'getOpponentFullInformation',
        postUser: 'postUser',
        searchUsers: 'searchUsers',
        updateUser: 'updateUser'
    },
    userJokerApi: {
        getUserJokers: 'getUserJokers'
    }
}

const headers = {
    Authorization: 'Bearer'
}

export const getRequest = async (functionName, params) => {
    switch (functionName) {
        // FAVOURITE QUESTIONS
        case 'getFavouriteQuestions':
            headers.Authorization += params.clientToken
            return getFavouriteQuestions(headers, params)
        //FRIENDSHIP
        case 'getFriendMatches':
            headers.Authorization += params.clientToken
            return getFriendMatches(headers, params)
        case 'getFriendRequests':
            headers.Authorization += params.clientToken
            return getFriendRequests(headers, params)
        case 'getFriends':
            headers.Authorization += params.clientToken
            return getFriends(headers, params)
        case 'getFriendship':
            headers.Authorization += params.clientToken
            return getFriendship(headers, params)
        // GAME CONTENT
        case 'getAllContent':
            headers.Authorization += params.clientToken
            return getAllContent(headers, params)
        case 'getExamList':
            headers.Authorization += params.clientToken
            return getExamList(headers, params)
        case 'getFullExamInformation':
            headers.Authorization += params.clientToken
            return getFullExamInformation(headers, params)
        // GAME ENERGY
        case 'getGameEnergy':
            headers.Authorization += params.clientToken
            return getGameEnergy(headers, params)
        // LEADERBOARD
        case 'getLeaderboard':
            headers.Authorization += params.clientToken
            return getLeaderboard(headers, params)
        case 'getUserScores':
            headers.Authorization += params.clientToken
            return getUserScores(headers, params)
        // NOTIFICATION
        case 'getNotifications':
            headers.Authorization += params.clientToken
            return getNotifications(headers, params)
        //STATISTIC
        case 'getLastSixMonthsStatistics':
            headers.Authorization += params.clientToken
            return getLastSixMonthsStatistics(headers, params)
        case 'getMonthlyStatistics':
            headers.Authorization += params.clientToken
            return getMonthlyStatistics(headers, params)
        case 'getStatistics':
            headers.Authorization += params.clientToken
            return getStatistics(headers, params)
        case 'getWeeklyStatistics':
            headers.Authorization += params.clientToken
            return getWeeklyStatistics(headers, params)
        // TOKEN
        case 'checkToken':
            headers.Authorization += params.clientToken
            return checkToken(headers, params)
        // USER
        case 'getOpponentFullInformation':
            headers.Authorization += params.clientToken
            return getOpponentFullInformation(headers, params)
        case 'getUser':
            headers.Authorization += params.clientToken
            return getUser(headers, params)
        case 'getUsers':
            headers.Authorization += params.clientToken
            return getUsers(headers, params)
        case 'searchUsers':
            headers.Authorization += params.clientToken
            return searchUsers(headers, params)
        // USER JOKER
        case 'getUserJokers':
            headers.Authorization += params.clientToken
            return getUserJokers(headers, params)
    }
}

export const postRequest = async (functionName, params) => {
    switch (functionName) {
        // FAVOURITE QUESTIONS
        case 'favouriteQuestion':
            headers.Authorization += params.clientToken
            return favouriteQuestion(headers, params)
        // FRIEND GAME
        case 'sendGameRequest':
            headers.Authorization += params.clientToken
            return sendGameRequest(headers, params)
        // FRIENDSHIP
        case 'sendFriendshipRequest':
            headers.Authorization += params.clientToken
            return sendFriendshipRequest(headers, params)
        // TOKEN
        case 'getToken':
            return getToken(params)
        case 'renewToken':
            return renewToken()
        // USER
        case 'postUser':
            headers.Authorization += params.clientToken
            return postUser(headers, params)
        case 'forgotPassword':
            headers.Authorization += params.clientToken
            return forgotPassword(headers, params)
    }
}

export const putRequest = async (functionName, params) => {
    switch (functionName) {
        // FCM TOKEN
        case 'updateFCMToken':
            headers.Authorization += params.clientToken
            return updateFCMToken(headers, params)
        // FRIENDSHIP
        case 'acceptFriendshipRequest':
            headers.Authorization += params.clientToken
            return acceptFriendshipRequest(headers, params)
        // GAME ENERGY
        case 'subtractGameEnergy':
            headers.Authorization += params.clientToken
            return subtractGameEnergy(headers, params)
        // NOTIFICATION
        case 'markNotificationRead':
            headers.Authorization += params.clientToken
            return markNotificationRead(headers, params)
        // USER
        case 'updateUser':
            headers.Authorization += params.clientToken
            return updateUser(headers, params)
    }
}

export const deleteRequest = async (functionName, params) => {
    switch (functionName) {
        // FAVOURITE QUESTIONS
        case 'unfavouriteQuestion':
            headers.Authorization += params.clientToken
            return unfavouriteQuestion(headers, params)
        // FRIENDSHIP
        case 'deleteFriendship':
            headers.Authorization += params.clientToken
            return deleteFriendship(headers, params)
        case 'rejectFriendshipRequest':
            headers.Authorization += params.clientToken
            return rejectFriendshipRequest(headers, params)
        // NOTIFICATION
        case 'rejectOngoingMatch':
            headers.Authorization += params.clientToken
            return rejectOngoingMatch(headers, params)
    }
}
