import {
    favouriteQuestion,
    getFavouriteQuestions,
    unfavouriteQuestion
} from './favouriteQuestion'
import { updateFCMToken } from './fcmToken'
import { sendGameRequest, checkOngoingMatch } from './friendGame'
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
    updateUser,
    checkUserWithEmail,
    checkUserWithIdentityToken,
    purchasePremium
} from './user'
import {
    getUserJokers,
    rewardAllUserJokers,
    rewardUserJoker,
    purchaseAllJokers
} from './userJoker'
import { getUserScore } from './userScore'
import { checkOnline } from './api'
import { getUserGoals, postUserGoal, deleteUserGoal } from './userGoal'
import { sendReceipt } from './purchaseReceipt'
import { getInviteCode } from './inviteCode'
import { reportQuestion } from './questionReporting'
import { reportUser } from './userReporting'
import getAgreement from './agreement/getAgreement'
import { getPrices } from './productPrice/getPrices'

export const apiServicesTree = {
    api: {
        checkOnline: 'checkOnline'
    },
    favouriteQuestionApi: {
        favouriteQuestion: 'favouriteQuestion',
        getFavouriteQuestions: 'getFavouriteQuestions',
        unfavouriteQuestion: 'unfavouriteQuestion'
    },
    fcmTokenApi: {
        updateFCMToken: 'updateFCMToken'
    },
    friendGameApi: {
        sendGameRequest: 'sendGameRequest',
        checkOngoingMatch: 'checkOngoingMatch'
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
        updateUser: 'updateUser',
        checkUserWithEmail: 'checkUserWithEmail',
        checkUserWithIdentityToken: 'checkUserWithIdentityToken',
        purchasePremium: 'purchasePremium'
    },
    userJokerApi: {
        getUserJokers: 'getUserJokers',
        rewardAllUserJokers: 'rewardAllUserJokers',
        rewardUserJoker: 'rewardUserJoker',
        purchaseAllJokers: 'purchaseAllJokers'
    },
    userScoreApi: {
        getUserScore: 'getUserScore'
    },
    userGoalApi: {
        getUserGoals: 'getUserGoals',
        postUserGoal: 'postUserGoal',
        deleteUserGoal: 'deleteUserGoal'
    },
    purchaseReceiptApi: {
        sendReceipt: 'sendReceipt'
    },
    inviteCodeApi: {
        getInviteCode: 'getInviteCode'
    },
    questionReportingApi: {
        reportQuestion: 'reportQuestion'
    },
    userReportingApi: {
        reportUser: 'reportUser'
    },
    agreementApi: {
        getAgreement: 'getAgreement'
    },
    productPriceApi: {
        getPrices: 'getPrices'
    }
}

const headers = {
    Authorization: null
}

export const getRequest = async (functionName, params) => {
    switch (functionName) {
        // API
        case 'checkOnline':
            return checkOnline()
        // FAVOURITE QUESTIONS
        case 'getFavouriteQuestions':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFavouriteQuestions(headers, params)
        //FRIENDSHIP
        case 'getFriendMatches':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFriendMatches(headers, params)
        case 'getFriendRequests':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFriendRequests(headers, params)
        case 'getFriends':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFriends(headers, params)
        case 'getFriendship':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFriendship(headers, params)
        // GAME CONTENT
        case 'getAllContent':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getAllContent(headers, params)
        case 'getExamList':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getExamList(headers, params)
        case 'getFullExamInformation':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getFullExamInformation(headers, params)
        // GAME ENERGY
        case 'getGameEnergy':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getGameEnergy(headers, params)
        // LEADERBOARD
        case 'getLeaderboard':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getLeaderboard(headers, params)
        case 'getUserScores':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUserScores(headers, params)
        // NOTIFICATION
        case 'getNotifications':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getNotifications(headers, params)
        //STATISTIC
        case 'getLastSixMonthsStatistics':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getLastSixMonthsStatistics(headers, params)
        case 'getMonthlyStatistics':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getMonthlyStatistics(headers, params)
        case 'getStatistics':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getStatistics(headers, params)
        case 'getWeeklyStatistics':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getWeeklyStatistics(headers, params)
        // TOKEN
        case 'checkToken':
            headers.Authorization = 'Bearer ' + params.clientToken
            return checkToken(headers, params)
        // USER
        case 'getOpponentFullInformation':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getOpponentFullInformation(headers, params)
        case 'getUser':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUser(headers, params)
        case 'getUsers':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUsers(headers, params)
        case 'searchUsers':
            headers.Authorization = 'Bearer ' + params.clientToken
            return searchUsers(headers, params)
        case 'checkUserWithEmail':
            return checkUserWithEmail(params)
        case 'checkUserWithIdentityToken':
            return checkUserWithIdentityToken(params)
        // USER JOKER
        case 'getUserJokers':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUserJokers(headers, params)
        // USER SCORE
        case 'getUserScore':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUserScore(headers, params)
        // FRIEND GAME
        case 'checkOngoingMatch':
            headers.Authorization = 'Bearer ' + params.clientToken
            return checkOngoingMatch(headers, params)
        // USER GOAL
        case 'getUserGoals':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getUserGoals(headers, params)
        // INVITE CODE
        case 'getInviteCode':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getInviteCode(headers, params)
        // AGREEMENT
        case 'getAgreement':
            return getAgreement()
        // PRODUCT PRICES
        case 'getPrices':
            headers.Authorization = 'Bearer ' + params.clientToken
            return getPrices(headers)
    }
}

export const postRequest = async (functionName, params) => {
    switch (functionName) {
        // FAVOURITE QUESTIONS
        case 'favouriteQuestion':
            headers.Authorization = 'Bearer ' + params.clientToken
            return favouriteQuestion(headers, params)
        // FRIEND GAME
        case 'sendGameRequest':
            headers.Authorization = 'Bearer ' + params.clientToken
            return sendGameRequest(headers, params)
        // FRIENDSHIP
        case 'sendFriendshipRequest':
            headers.Authorization = 'Bearer ' + params.clientToken
            return sendFriendshipRequest(headers, params)
        // TOKEN
        case 'getToken':
            return getToken(params)
        case 'renewToken':
            return renewToken()
        // USER
        case 'postUser':
            return postUser(params)
        case 'forgotPassword':
            return forgotPassword(params)
        // USER GOALS
        case 'postUserGoal':
            headers.Authorization = 'Bearer ' + params.clientToken
            return postUserGoal(headers, params)
        // PURCHASE RECEIPT
        case 'sendReceipt':
            headers.Authorization = 'Bearer ' + params.clientToken
            return sendReceipt(headers, params)
        // QUESTION REPORTING
        case 'reportQuestion':
            headers.Authorization = 'Bearer ' + params.clientToken
            return reportQuestion(headers, params)
        // USER REPORTING
        case 'reportUser':
            headers.Authorization = 'Bearer ' + params.clientToken
            return reportUser(headers, params)
    }
}

export const putRequest = async (functionName, params) => {
    switch (functionName) {
        // FCM TOKEN
        case 'updateFCMToken':
            headers.Authorization = 'Bearer ' + params.clientToken
            return updateFCMToken(headers, params)
        // FRIENDSHIP
        case 'acceptFriendshipRequest':
            headers.Authorization = 'Bearer ' + params.clientToken
            return acceptFriendshipRequest(headers, params)
        // GAME ENERGY
        case 'subtractGameEnergy':
            headers.Authorization = 'Bearer ' + params.clientToken
            return subtractGameEnergy(headers, params)
        // NOTIFICATION
        case 'markNotificationRead':
            headers.Authorization = 'Bearer ' + params.clientToken
            return markNotificationRead(headers, params)
        // USER
        case 'updateUser':
            headers.Authorization = 'Bearer ' + params.clientToken
            return updateUser(headers, params)
        case 'purchasePremium':
            headers.Authorization = 'Bearer ' + params.clientToken
            return purchasePremium(headers, params)
        // USER JOKER
        case 'rewardAllUserJokers':
            headers.Authorization = 'Bearer ' + params.clientToken
            return rewardAllUserJokers(headers, params)
        case 'rewardUserJoker':
            headers.Authorization = 'Bearer ' + params.clientToken
            return rewardUserJoker(headers, params)
        case 'purchaseAllJokers':
            headers.Authorization = 'Bearer ' + params.clientToken
            return purchaseAllJokers(headers, params)
    }
}

export const deleteRequest = async (functionName, params) => {
    switch (functionName) {
        // FAVOURITE QUESTIONS
        case 'unfavouriteQuestion':
            headers.Authorization = 'Bearer ' + params.clientToken
            return unfavouriteQuestion(headers, params)
        // FRIENDSHIP
        case 'deleteFriendship':
            headers.Authorization = 'Bearer ' + params.clientToken
            return deleteFriendship(headers, params)
        case 'rejectFriendshipRequest':
            headers.Authorization = 'Bearer ' + params.clientToken
            return rejectFriendshipRequest(headers, params)
        // NOTIFICATION
        case 'rejectOngoingMatch':
            headers.Authorization = 'Bearer ' + params.clientToken
            return rejectOngoingMatch(headers, params)
        // USER GOALS
        case 'deleteUserGoal':
            headers.Authorization = 'Bearer ' + params.clientToken
            return deleteUserGoal(headers, params)
    }
}
