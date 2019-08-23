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
import { navigationPop } from '../../../services/navigationService'
import { friendshipServices } from '../../../sagas/friendship/'
import { userServices } from '../../../sagas/user'
import { connect } from 'react-redux'
import { friendActions } from '../../../redux/friends/actions'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import ACCEPT_BUTTON from '../../../assets/gameScreens/correct.png'
import REJECT_BUTTON from '../../../assets/gameScreens/incorrect.png'

const generalNotificationsList = [
    {
        generalNotificationType: 'acceptedFriendship',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz'
    },
    {
        generalNotificationType: 'requestedGame',
        userPic: PROFILE_PIC,
        friendsName: 'Hakan Yılmaz',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam'
    },
    {
        generalNotificationType: 'yourOrder',
        timePeriod: 'haftaki',
        order: '2789'
    },
    {
        generalNotificationType: 'yourSinaviaScore',
        timePeriod: 'hafta',
        examName: 'YKS',
        courseName: 'Türkçe',
        sinaviaScore: 12500
    },
    {
        generalNotificationType: 'yourSuccessPercentage',
        examName: 'YKS',
        courseName: 'Türkçe',
        subjectName: 'Paragrafta Anlam',
        successPercentage: 33
    },
    {
        generalNotificationType: 'yourStatistics',
        timePeriod: 'haftaki'
    }
]

class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendRequestsList: [],
            generalNotificationsList: generalNotificationsList,
            selectedNotificationsMode: 'generalNotifications',
            generalNotificationsButtonBackgroundColor: '#FF9900',
            generalNotificationsButtonTextColor: '#FFFFFF',
            friendsRequestsButtonBackgroundColor: '#FFFFFF',
            friendsRequestsButtonTextColor: '#2E313C'
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

    friendsRequestsOnPress = async () => {
        this.setState({
            selectedNotificationsMode: 'friendsRequests',
            generalNotificationsButtonBackgroundColor: '#FFFFFF',
            generalNotificationsButtonTextColor: '#2E313C',
            friendsRequestsButtonBackgroundColor: '#FF9900',
            friendsRequestsButtonTextColor: '#FFFFFF'
        })

        await this.loadFriendRequests()
    }

    loadFriendRequests = async () => {
        const friendRequests = await friendshipServices.getFriendRequests(
            this.props.clientToken,
            this.props.clientDBId
        )

        const userIdList = []

        friendRequests.forEach(request => {
            userIdList.push(request.userId)
        })

        if (Object.keys(userIdList).length === 0) {
            this.setState({ friendRequestsList: [] })
            return
        }

        await this.getUserInformations(userIdList)
    }

    getUserInformations = async idList => {
        const userInformations = await userServices.getUsers(
            this.props.clientToken,
            idList
        )

        this.setState({ friendRequestsList: userInformations })
    }

    notificationsListRender({ item }) {
        switch (item.generalNotificationType) {
            case 'acceptedFriendship':
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
            case 'requestedGame':
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
            case 'yourOrder':
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
            case 'yourSinaviaScore':
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
            case 'yourSuccessPercentage':
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
            case 'yourStatistics':
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

    addToFriendIds = id => {
        const friendList = this.props.friendIds
        friendList.push(id)

        this.props.saveFriendIdList(friendList)
    }

    // TODO List doen't refresh on its own fix it
    acceptFriendRequestOnPress = (friendId, index) => {
        this.addToFriendIds(friendId)

        friendshipServices.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            friendId,
            this.props.clientInformation.username
        )

        let friendRequestsList = this.state.friendRequestsList
        friendRequestsList.splice(index, 1)

        this.setState({
            friendRequestsList: friendRequestsList
        })
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
                    <FlatList
                        data={this.state.generalNotificationsList}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.notificationsListRender}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                {this.state.selectedNotificationsMode === 'friendsRequests' && (
                    <FlatList
                        data={this.state.friendRequestsList}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.userRow}>
                                    <View style={styles.userPicContainerInRow}>
                                        <Image
                                            source={{
                                                uri: item.profilePicture
                                            }}
                                            style={styles.userPic}
                                        />
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameText}>
                                            {item.name + ' ' + item.lastname}
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.friendshipButtonsContainer
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.acceptFriendRequestOnPress(
                                                    item.id,
                                                    index
                                                )
                                            }
                                        >
                                            <Image
                                                source={ACCEPT_BUTTON}
                                                style={styles.friendshipButtons}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={
                                                this.rejectFriendRequestOnPress
                                            }
                                        >
                                            <Image
                                                source={REJECT_BUTTON}
                                                style={styles.friendshipButtons}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    friendIds: state.friends.friendIds,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications)
