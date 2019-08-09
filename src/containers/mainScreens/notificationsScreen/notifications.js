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

class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendsRequestsList: friendsRequestsList,
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
                {this.state.selectedNotificationsMode === 'generalNotifications' && <Text>Genel Bildirimler</Text>}
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
