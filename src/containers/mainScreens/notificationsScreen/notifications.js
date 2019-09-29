import React from 'react'
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import {
    navigationPop,
    navigationRefresh
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { friendActions } from '../../../redux/friends/actions'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import ACCEPT_BUTTON from '../../../assets/gameScreens/correct.png'
import REJECT_BUTTON from '../../../assets/gameScreens/incorrect.png'

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
            generalNotificationsList: generalNotificationsList,
            selectedNotificationsMode: 'generalNotifications',
            generalNotificationsButtonBackgroundColor: '#FF9900',
            generalNotificationsButtonTextColor: '#FFFFFF',
            friendsRequestsButtonBackgroundColor: '#FFFFFF',
            friendsRequestsButtonTextColor: '#2E313C',
            refreshFlatlist: false
        }
    }

    updateNotificationsCategoryButtonUI = notificationsMode => {
        switch (notificationsMode) {
            case 'generalNotifications':
                if (this.state.selectedNotificationsMode === notificationsMode)
                    return
                this.setState({
                    selectedNotificationsMode: 'generalNotifications',
                    generalNotificationsButtonBackgroundColor: '#FF9900',
                    generalNotificationsButtonTextColor: '#FFFFFF',
                    friendsRequestsButtonBackgroundColor: '#FFFFFF',
                    friendsRequestsButtonTextColor: '#2E313C'
                })
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

    loadFriendRequests = () => {
        this.props.getFriendRequests(
            this.props.clientToken,
            this.props.clientDBId
        )
    }

    notificationsListRender({ item }) {
        switch (item.generalNotificationType) {
            case 'friendshipAccepted':
                return (
                    <TouchableOpacity>
                        <View style={styles.userRow}>
                            <View style={styles.userPicContainerInRow}>
                                <Image
                                    source={item.userPic}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.textsinRowWithPic}>
                                <Text style={styles.notificationRowsText}>
                                    {item.friendsName} arkadaşlık isteğini kabul
                                    etti.
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            case 'gameRequest':
                return (
                    <View style={styles.userRow}>
                        <View style={styles.userPicContainerInRow}>
                            <Image
                                source={item.userPic}
                                style={styles.userPic}
                            />
                        </View>
                        <View style={styles.gameContentsContainer}>
                            <Text style={styles.gameContentText}>
                                {item.examName}
                            </Text>
                            <Text style={styles.gameContentText}>
                                {item.courseName}
                            </Text>
                            <Text style={styles.gameContentText}>
                                {item.subjectName}
                            </Text>
                        </View>
                        <View style={styles.gameRequestContainer}>
                            <View style={styles.gameRequestTextContainer}>
                                <Text style={styles.gameRequestText}>
                                    {item.friendsName} oyun isteği gönderdi.
                                </Text>
                            </View>
                            <View style={styles.gameRequestButtonsContainer}>
                                <TouchableOpacity>
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
                                <TouchableOpacity>
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

    acceptFriendRequestOnPress = (friendId, index) => {
        this.props.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            friendId,
            this.props.clientInformation.username,
            this.props.friendIds
        )
        // If we do this step inside the saga it wont refresh
        this.props.removeFromFriendRequests(index)
    }

    rejectFriendRequestOnPress = (friendId, index) => {
        this.props.rejectFriendshipRequest(
            this.props.clientToken,
            friendId,
            this.props.clientDBId,
            this.props.friendRequests
        )
        this.props.removeFromFriendRequests(index)
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
                            data={this.state.generalNotificationsList}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.notificationsListRender}
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
                                                    this.setState({
                                                        refreshFlatlist: !this
                                                            .state
                                                            .refreshFlatlist
                                                    })
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
    friendRequests: state.friends.friendRequests
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
        friendIdList
    ) =>
        dispatch(
            friendActions.acceptFriendRequest(
                clientToken,
                clientId,
                opponentId,
                clientUsername,
                friendIdList
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
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications)
