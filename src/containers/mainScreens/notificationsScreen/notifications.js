import React from 'react'
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Image, TextInput
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import { navigationPop } from '../../../services/navigationService'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import ACCEPT_BUTTON from  '../../../assets/gameScreens/correct.png'
import REJECT_BUTTON from '../../../assets/gameScreens/incorrect.png'
import Home from '../main'
import * as courses from '../../../components/mainScreen/carousel/static/courses'

const friendsRequestsList = [
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan'
    }
]

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
            friendsRequestsList: friendsRequestsList,
            generalNotificationsList: generalNotificationsList,
            selectedNotificationsMode: 'generalNotifications',
            generalNotificationsButtonBackgroundColor: '#FF9900',
            generalNotificationsButtonTextColor: '#FFFFFF',
            friendsRequestsButtonBackgroundColor: '#FFFFFF',
            friendsRequestsButtonTextColor: '#2E313C',
        }
    }

    updateNotificationsCategoryButtonUI = notificationsMode => {
        switch (notificationsMode) {
            case 'generalNotifications':
                if (this.state.selectedNotificationsMode === notificationsMode) return
                this.setState({
                    selectedNotificationsMode: 'generalNotifications',
                    generalNotificationsButtonBackgroundColor: '#FF9900',
                    generalNotificationsButtonTextColor: '#FFFFFF',
                    friendsRequestsButtonBackgroundColor: '#FFFFFF',
                    friendsRequestsButtonTextColor: '#2E313C'
                })
                return
            case 'friendsRequests':
                if (this.state.selectedNotificationsMode === notificationsMode) return
                this.setState({
                    selectedNotificationsMode: 'friendsRequests',
                    generalNotificationsButtonBackgroundColor: '#FFFFFF',
                    generalNotificationsButtonTextColor: '#2E313C',
                    friendsRequestsButtonBackgroundColor: '#FF9900',
                    friendsRequestsButtonTextColor: '#FFFFFF'
                })
                this.setState({ selectedGameMode: notificationsMode })
                return
        }
    }

    notificationsCategoryButtonOnPress = selectedNotificationsMode => {
        this.updateNotificationsCategoryButtonUI(selectedNotificationsMode)
        this.setState({selectedNotificationsMode: selectedNotificationsMode})
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    notificationsListRender({item}) {
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
                                <Text style={styles.notificationRowsText}>{item.friendsName} arkadaşlık isteğini kabul etti.</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )
                    break
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
                                <Text style={styles.gameContentText}>{item.examName}</Text>
                                <Text style={styles.gameContentText}>{item.courseName}</Text>
                                <Text style={styles.gameContentText}>{item.subjectName}</Text>
                            </View>
                            <View style={styles.gameRequestContainer}>
                                <View style={styles.gameRequestTextContainer}>
                                    <Text style={styles.gameRequestText}>{item.friendsName} oyun isteği gönderdi.</Text>
                                </View>
                                <View style={styles.gameRequestButtonsContainer}>
                                    <TouchableOpacity>
                                    <View style={styles.acceptButton}><Text style={styles.gameRequestsButtonText}>Kabul Et</Text></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                    <View style={styles.rejectButton}><Text style={styles.gameRequestsButtonText}>Reddet</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                    break
                case 'yourOrder':
                    return (
                        <View style={styles.userRow}>
                            <Text style={styles.notificationRowsText}>Geçen {item.timePeriod} Türkiye siralaman <Text style={{color: '#FF9900'}}>{item.order}</Text>. Başarılı bir hafta dileriz.</Text>
                        </View>
                    )
                    break
                case 'yourSinaviaScore':
                    return (
                        <View style={styles.userRow}>
                            <Text style={styles.notificationRowsText}>
                                Önceki {item.timePeriod}, {item.examName}-{item.courseName} kategorisinde
                                <Text style={{color: '#FF9900'}}> {item.sinaviaScore} Sınavia Puanı </Text>topladın.
                            </Text>
                        </View>
                    )
                    break
                case 'yourSuccessPercentage':
                    return (
                        <View style={styles.userRow}>
                            <Text style={styles.notificationRowsText}>{item.examName}-{item.courseName} dersinin <Text style={{color: '#00D9EF'}}>{item.subjectName}</Text> konusundaki başarı oranın <Text style={{color: '#FF9900'}}>{item.successPercentage}%</Text>. Biraz daha çalışmalısın.</Text>
                        </View>
                    )
                    break
                case 'yourStatistics':
                    return (
                        <TouchableOpacity>
                            <View style={styles.userRow}>
                                <Text style={styles.notificationRowsText}>Geçen {item.timePeriod} istatistiklerini görmek için <Text style={{color: '#00D9EF'}}>TIKLA!</Text> </Text>

                            </View>
                        </TouchableOpacity>
                    )
                    break
                default:
                    break
            }
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
                    <TouchableOpacity onPress={() =>
                        this.notificationsCategoryButtonOnPress(
                            'generalNotifications'
                        )
                    }>
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
                    <TouchableOpacity onPress={() =>
                        this.notificationsCategoryButtonOnPress(
                            'friendsRequests'
                        )
                    }>
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
                {this.state.selectedNotificationsMode === 'generalNotifications' && <FlatList
                    data={this.state.generalNotificationsList}
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.notificationsListRender}
                    keyExtractor={(item, index) => index}
                />}
                {this.state.selectedNotificationsMode === 'friendsRequests' && <FlatList
                    data={this.state.friendsRequestsList}
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.userRow}>
                                <View
                                    style={
                                        styles.userPicContainerInRow
                                    }
                                >
                                    <Image
                                        source={item.userPic}
                                        style={styles.userPic}
                                    />
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameText}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.friendshipButtonsContainer}>
                                    <TouchableOpacity>
                                        <Image
                                            source={ACCEPT_BUTTON}
                                            style={styles.friendshipButtons}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={REJECT_BUTTON}
                                            style={styles.friendshipButtons}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />}
            </View>
        )
    }
}

export default Notifications
