import React from 'react'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import {
    navigationPop,
    navigationReplace,
    navigationReset
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { friendActions } from '../../../redux/friends/actions'
import { appActions } from '../../../redux/app/actions'
import { opponentActions } from '../../../redux/opponents/actions'
import { getUserService } from '../../../sagas/user/fetchUser'
import { apiServices } from '../../../sagas/api'
import { notificationServices } from '../../../sagas/notification/'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import ACCEPT_BUTTON from '../../../assets/gameScreens/correct.png'
import REJECT_BUTTON from '../../../assets/gameScreens/incorrect.png'

// Colyseus imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
import { GAME_ENGINE_ENDPOINT, SCENE_KEYS } from '../../../config'

const generalNotificationsList = [
    {
        generalNotificationType: 'friendshipAccepted',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz'
    },
    {
        generalNotificationType: 'gameRequest',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam'
    },
    {
        generalNotificationType: 'nationalPlace',
        timePeriod: 'haftaki',
        order: '2789'
    },
    {
        generalNotificationType: 'earnedScore',
        timePeriod: 'hafta',
        examName: 'YKS',
        courseName: 'Türkçe',
        sinaviaScore: 12500
    },
    {
        generalNotificationType: 'successPercentage',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam',
        successPercentage: 33
    },
    {
        generalNotificationType: 'statistics',
        timePeriod: 'haftaki'
    },
    {
        generalNotificationType: 'friendshipAccepted',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz'
    },
    {
        generalNotificationType: 'gameRequest',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam'
    },
    {
        generalNotificationType: 'nationalPlace',
        timePeriod: 'haftaki',
        order: '2789'
    },
    {
        generalNotificationType: 'earnedScore',
        timePeriod: 'hafta',
        examName: 'YKS',
        courseName: 'Türkçe',
        sinaviaScore: 12500
    },
    {
        generalNotificationType: 'successPercentage',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam',
        successPercentage: 33
    },
    {
        generalNotificationType: 'statistics',
        timePeriod: 'haftaki'
    },
    {
        generalNotificationType: 'friendshipAccepted',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz'
    },
    {
        generalNotificationType: 'gameRequest',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam'
    },
    {
        generalNotificationType: 'nationalPlace',
        timePeriod: 'haftaki',
        order: '2789'
    },
    {
        generalNotificationType: 'earnedScore',
        timePeriod: 'hafta',
        examName: 'YKS',
        courseName: 'Türkçe',
        sinaviaScore: 12500
    },
    {
        generalNotificationType: 'successPercentage',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam',
        successPercentage: 33
    },
    {
        generalNotificationType: 'statistics',
        timePeriod: 'haftaki'
    }
]

class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedNotificationsMode: 'generalNotifications',
            generalNotificationsButtonBackgroundColor: '#FF9900',
            generalNotificationsButtonTextColor: '#FFFFFF',
            friendsRequestsButtonBackgroundColor: '#FFFFFF',
            friendsRequestsButtonTextColor: '#2E313C',
            refreshFlatlist: false
        }
    }

    componentDidMount() {
        if (this.props.shouldGoToFriendRequests) this.friendsRequestsOnPress()
        else this.loadNotifications()
    }

    updateNotificationsCategoryButtonUI = notificationsMode => {
        switch (notificationsMode) {
            case 'generalNotifications':
                if (this.state.selectedNotificationsMode === notificationsMode)
                    return
                this.notificationsOnPress()
                return
            case 'friendsRequests':
                if (this.state.selectedNotificationsMode === notificationsMode)
                    return
                this.friendsRequestsOnPress()
                return
        }
    }

    notificationsCategoryButtonOnPress = selectedNotificationsMode => {
        this.updateNotificationsCategoryButtonUI(selectedNotificationsMode)
        this.setState({ selectedNotificationsMode: selectedNotificationsMode })
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    friendsRequestsOnPress = () => {
        this.setState({
            selectedNotificationsMode: 'friendsRequests',
            generalNotificationsButtonBackgroundColor: '#FFFFFF',
            generalNotificationsButtonTextColor: '#2E313C',
            friendsRequestsButtonBackgroundColor: '#FF9900',
            friendsRequestsButtonTextColor: '#FFFFFF'
        })

        this.loadFriendRequests()
    }

    notificationsOnPress = () => {
        this.setState({
            selectedNotificationsMode: 'generalNotifications',
            generalNotificationsButtonBackgroundColor: '#FF9900',
            generalNotificationsButtonTextColor: '#FFFFFF',
            friendsRequestsButtonBackgroundColor: '#FFFFFF',
            friendsRequestsButtonTextColor: '#2E313C'
        })

        this.loadNotifications()
    }

    loadFriendRequests = () => {
        this.props.getFriendRequests(
            this.props.clientToken,
            this.props.clientDBId
        )
    }

    loadNotifications = () => {
        this.props.getNotifications(
            this.props.clientToken,
            this.props.clientDBId
        )
    }

    notificationsListRender({ item, index }) {
        switch (item.notificationType) {
            case 'friendshipAccepted':
                return (
                    <TouchableOpacity
                        onPress={() =>
                            this.friendshipAcceptedOnPress(
                                item.notificationData.userId
                            )
                        }
                    >
                        <View style={styles.userRow}>
                            <View style={styles.userPicContainerInRow}>
                                <Image
                                    source={{
                                        uri:
                                            item.notificationData.profilePicture
                                    }}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.textsinRowWithPic}>
                                <Text style={styles.notificationRowsText}>
                                    {item.notificationData.message}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            case 'gameRequest':
                return (
                    <View style={[styles.userRow, { height: hp(12) }]}>
                        <View style={styles.userPicContainerInRow}>
                            <Image
                                source={{
                                    uri: item.notificationData.profilePicture
                                }}
                                style={styles.userPic}
                            />
                        </View>
                        <View
                            style={[
                                styles.gameContentsContainer,
                                { height: hp(12) }
                            ]}
                        >
                            <Text style={styles.gameContentText}>
                                {item.notificationData.examName}
                            </Text>
                            <Text style={styles.gameContentText}>
                                {item.notificationData.courseName}
                            </Text>
                            <Text style={styles.gameContentText}>
                                {item.notificationData.subjectName}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.gameRequestContainer,
                                { height: hp(12) }
                            ]}
                        >
                            <Text style={styles.gameRequestText}>
                                {item.notificationData.message}
                            </Text>
                            <View style={styles.gameRequestButtonsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        apiServices
                                            .checkOnline()
                                            .then(() => {
                                                this.setState({
                                                    refreshFlatlist: !this.state
                                                        .refreshFlatlist
                                                })
                                                this.acceptGameRequestOnPress(
                                                    item,
                                                    index
                                                )
                                            })
                                            .catch(error => {})
                                    }}
                                >
                                    <View style={styles.acceptButton}>
                                        <Text
                                            style={
                                                styles.gameRequestsButtonText
                                            }
                                        >
                                            Kabul Et
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        apiServices
                                            .checkOnline()
                                            .then(() => {
                                                this.setState({
                                                    refreshFlatlist: !this.state
                                                        .refreshFlatlist
                                                })
                                                this.rejectGameRequestOnPress(
                                                    item,
                                                    index
                                                )
                                            })
                                            .catch(error => {})
                                    }}
                                >
                                    <View style={styles.rejectButton}>
                                        <Text
                                            style={
                                                styles.gameRequestsButtonText
                                            }
                                        >
                                            Reddet
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            case 'friendMatchResult':
                return (
                    <TouchableOpacity
                        onPress={() =>
                            this.friendMatchResultsOnPress(item, index)
                        }
                    >
                        <View style={styles.userRow}>
                            <View style={styles.userPicContainerInRow}>
                                <Image
                                    source={{
                                        uri:
                                            item.notificationData
                                                .friendProfilePicture
                                    }}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.textsinRowWithPic}>
                                <Text style={styles.notificationRowsText}>
                                    {item.notificationData.message}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            case 'nationalPlace':
                return (
                    <View style={styles.userRow}>
                        <Text style={styles.notificationRowsText}>
                            Geçen {item.timePeriod} Türkiye siralaman{' '}
                            <Text style={{ color: '#FF9900' }}>
                                {item.order}
                            </Text>
                            . Başarılı bir hafta dileriz.
                        </Text>
                    </View>
                )
            case 'earnedScore':
                return (
                    <View style={styles.userRow}>
                        <Text style={styles.notificationRowsText}>
                            Önceki {item.timePeriod}, {item.examName}-
                            {item.courseName} kategorisinde
                            <Text style={{ color: '#FF9900' }}>
                                {' '}
                                {item.sinaviaScore} Sınavia Puanı{' '}
                            </Text>
                            topladın.
                        </Text>
                    </View>
                )
            case 'successPercentage':
                return (
                    <View style={styles.userRow}>
                        <Text style={styles.notificationRowsText}>
                            {item.examName}-{item.courseName} dersinin{' '}
                            <Text style={{ color: '#00D9EF' }}>
                                {item.subjectName}
                            </Text>{' '}
                            konusundaki başarı oranın{' '}
                            <Text style={{ color: '#FF9900' }}>
                                {item.successPercentage}%
                            </Text>
                            . Biraz daha çalışmalısın.
                        </Text>
                    </View>
                )
            case 'statistics':
                return (
                    <TouchableOpacity>
                        <View style={styles.userRow}>
                            <Text style={styles.notificationRowsText}>
                                Geçen {item.timePeriod} istatistiklerini görmek
                                için{' '}
                                <Text style={{ color: '#00D9EF' }}>TIKLA!</Text>{' '}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            default:
                break
        }
    }

    friendshipAcceptedOnPress = userId => {
        getUserService(this.props.clientToken, userId).then(userInformation => {
            this.props.getOpponentFullInformation(
                userInformation,
                this.props.clientDBId,
                this.props.clientToken,
                false
            )
        })
    }

    acceptGameRequestOnPress = (notification, notificationIndex) => {
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            // ids will come from the notification
            // or we can put it inside the model???
            this.room = this.client.join('friendSoloRoom', {
                databaseId: this.props.clientDBId,
                ongoingMatchId: notification.notificationData.ongoingMatchId,
                examId: notification.notificationData.examId,
                courseId: notification.notificationData.courseId,
                subjectId: notification.notificationData.subjectId
            })

            this.room.onJoin.add(() => {
                notification.read = true
                notification.notificationData = JSON.stringify(
                    notification.notificationData
                )

                notificationServices.markNotificationRead(
                    this.props.clientToken,
                    notification
                )
                this.props.removeFromNotifications(notificationIndex)

                this.room.removeAllListeners()
                navigationReset('game', { isHardReset: true })
                navigationReplace(SCENE_KEYS.gameScreens.soloFriendGameScreen, {
                    client: this.client,
                    room: this.room,
                    playerUsername: this.props.clientInformation.username,
                    playerProfilePicture: this.props.clientInformation
                        .profilePicture
                })
            })
        })
    }

    rejectGameRequestOnPress = (notification, notificationIndex) => {
        notificationServices
            .rejectOngingMatch(
                this.props.clientToken,
                notification.notificationData.ongoingMatchId
            )
            .then(() => {
                notification.read = true
                notification.notificationData = JSON.stringify(
                    notification.notificationData
                )

                notificationServices
                    .markNotificationRead(this.props.clientToken, notification)
                    .then(() => {
                        this.props.removeFromNotifications(notificationIndex)
                        this.setState({
                            refreshFlatlist: !this.state.refreshFlatlist
                        })
                    })
            })
    }

    acceptFriendRequestOnPress = (friendId, index) => {
        this.props.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            friendId,
            this.props.clientInformation.username,
            this.props.friendIds,
            this.props.clientInformation.profilePicture
        )
        // If we do this step inside the saga it wont refresh
        this.props.removeFromFriendRequests(index)
        this.setState({
            refreshFlatlist: !this.state.refreshFlatlist
        })
    }

    rejectFriendRequestOnPress = (friendId, index) => {
        this.props.rejectFriendshipRequest(
            this.props.clientToken,
            friendId,
            this.props.clientDBId,
            this.props.friendRequests
        )
        this.props.removeFromFriendRequests(index)
        this.setState({
            refreshFlatlist: !this.state.refreshFlatlist
        })
    }

    friendMatchResultsOnPress = (item, index) => {
        navigationReset('game', { isHardReset: true })
        navigationReplace(SCENE_KEYS.gameScreens.soloFriendGameStatsScreen, {
            clientStatistics: item.notificationData.userStatistics,
            friendStatistics: item.notificationData.friendStatistics,
            friendUsername: item.notificationData.friendUsername,
            friendProfilePicture: item.notificationData.friendProfilePicture,
            friendMatches: item.notificationData.friendMatches,
            userAnswers: item.notificationData.userAnswers,
            questionList: item.notificationData.questionList,
            isFromNotification: true
        })

        item.read = true
        item.notificationData = JSON.stringify(item.notificationData)

        notificationServices.markNotificationRead(this.props.clientToken, item)
        this.props.removeFromNotifications(index)
    }

    renderEmptyFriendRequests = () => {
        return (
            <View style={styles.emptyFlatListContainer}>
                <Text style={styles.emptyFlatListText}>
                    Henüz arkadaşlık isteğin yok!
                </Text>
            </View>
        )
    }

    renderEmptyNotifications = () => {
        return (
            <View style={styles.emptyFlatListContainer}>
                <Text style={styles.emptyFlatListText}>
                    Henüz bir bildirimin yok!
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.tabbarContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            this.notificationsCategoryButtonOnPress(
                                'generalNotifications'
                            )
                        }
                    >
                        <View
                            style={[
                                styles.generalNotificationsContainer,
                                {
                                    backgroundColor: this.state
                                        .generalNotificationsButtonBackgroundColor
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabbarGeneralNotificationsText,
                                    {
                                        color: this.state
                                            .generalNotificationsButtonTextColor
                                    }
                                ]}
                            >
                                Bildirimler
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.notificationsCategoryButtonOnPress(
                                'friendsRequests'
                            )
                        }
                    >
                        <View
                            style={[
                                styles.friendsRequestsContainer,
                                {
                                    backgroundColor: this.state
                                        .friendsRequestsButtonBackgroundColor
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabbarFriendsRequestsText,
                                    {
                                        color: this.state
                                            .friendsRequestsButtonTextColor
                                    }
                                ]}
                            >
                                Arkadaşlık İstekleri
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.selectedNotificationsMode ===
                    'generalNotifications' && (
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={this.props.userNotificationList}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                this.notificationsListRender({ item, index })
                            }
                            extraData={this.state.refreshFlatlist}
                            ListEmptyComponent={this.renderEmptyNotifications}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                {this.state.selectedNotificationsMode === 'friendsRequests' && (
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={this.props.friendRequests}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state.refreshFlatlist}
                            ListEmptyComponent={this.renderEmptyFriendRequests}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.userRow}>
                                        <View
                                            style={styles.userPicContainerInRow}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.profilePicture
                                                }}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.name +
                                                    ' ' +
                                                    item.lastname}
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.friendshipButtonsContainer
                                            }
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        refreshFlatlist: !this
                                                            .state
                                                            .refreshFlatlist
                                                    })
                                                    this.acceptFriendRequestOnPress(
                                                        item.id,
                                                        index
                                                    )
                                                }}
                                            >
                                                <Image
                                                    source={ACCEPT_BUTTON}
                                                    style={
                                                        styles.friendshipButtons
                                                    }
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.rejectFriendRequestOnPress(
                                                        item.id,
                                                        index
                                                    )
                                                }}
                                            >
                                                <Image
                                                    source={REJECT_BUTTON}
                                                    style={
                                                        styles.friendshipButtons
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    friendIds: state.friends.friendIds,
    clientInformation: state.client.clientInformation,
    friendRequests: state.friends.friendRequests,
    userNotificationList: state.app.userNotificationList
})

const mapDispatchToProps = dispatch => ({
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList)),
    getFriendRequests: (clientToken, clientId) =>
        dispatch(friendActions.getFriendRequests(clientToken, clientId)),
    removeFromFriendRequests: index =>
        dispatch(friendActions.removeFromFriendRequests(index)),
    acceptFriendshipRequest: (
        clientToken,
        clientId,
        opponentId,
        clientUsername,
        friendIdList,
        profilePicture
    ) =>
        dispatch(
            friendActions.acceptFriendRequest(
                clientToken,
                clientId,
                opponentId,
                clientUsername,
                friendIdList,
                profilePicture
            )
        ),
    rejectFriendshipRequest: (clientToken, userId, friendId, friendRequests) =>
        dispatch(
            friendActions.rejectFriendshipRequest(
                clientToken,
                userId,
                friendId,
                friendRequests
            )
        ),
    getNotifications: (clientToken, clientId) =>
        dispatch(appActions.getNotifications(clientToken, clientId)),
    removeFromNotifications: index =>
        dispatch(appActions.removeFromNotifications(index)),
    getOpponentFullInformation: (
        opponentInformation,
        clientId,
        clientToken,
        isWithSearchBar
    ) =>
        dispatch(
            opponentActions.getOpponentFullInformation(
                opponentInformation,
                clientId,
                clientToken,
                isWithSearchBar
            )
        )
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
