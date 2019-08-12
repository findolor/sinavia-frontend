import React from 'react'
import {
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import {
    SCENE_KEYS,
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import NotchView from '../../../components/notchView'
import nebula from '../../../assets/cover.jpg'
import returnLogo from '../../../assets/return.png'
import searchlogo from '../../../assets/search.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import ADD_FRIEND from '../../../assets/mainScreens/addFriend.png'
import ADD_FRIEND_REQUESTED from '../../../assets/mainScreens/addFriendRequested.png'
import ALREADY_FRIEND from '../../../assets/mainScreens/alreadyFriend.png'

class OpponentsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendshipStatus: 'addFriend'
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    friendshipStatusOnPress = friendshipStatusMode => {
        {
            switch (friendshipStatusMode) {
                case 'addFriend':
                    this.setState({ friendshipStatus: 'friendRequestSent' })
                    return
                case 'friendRequestSent':
                    this.setState({ friendshipStatus: 'alreadyFriend' })
                    return
                case 'alreadyFriend':
                    this.setState({ friendshipStatus: 'addFriend' })
                    return
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.searchBarText}
                                placeholder="Kullanıcı ara..."
                                placeholderTextColor={'#7B7B7B'}
                            />
                        </View>
                        <TouchableOpacity onPress={this.profileSearchOnPress}>
                            <Image
                                source={searchlogo}
                                style={styles.searchBarLogo}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={ nebula }
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.profilePicView}>
                            <Image
                                source={ PROFILE_PIC }
                                style={styles.profilePic}
                            />
                        </View>
                        <View style={styles.nameView}>
                            <View style={styles.nameSurnameContainer}>
                                <Text style={styles.nameSurnameText}>
                                    Hakan Yılmaz
                                </Text>
                            </View>
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>
                                    @haqotherage
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView
                    style={styles.boxesScrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.friendsBoxes}>
                        <View style={styles.opponentsFriendsBox}>
                            <View style={styles.opponentsFriendsTextView}>
                                <Text style={styles.opponentsFriendsText}>
                                    Arkadaşlar
                                </Text>
                            </View>
                            <View style={styles.opponentsFriendsCounterView}>
                                <Text style={styles.opponentsFriendsCounter}>
                                    28
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() =>
                            this.friendshipStatusOnPress(
                                this.state.friendshipStatus
                            )
                        }>
                        <View style={styles.yourFriendshipStatusBox}>
                            {this.state.friendshipStatus === 'addFriend' &&
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.friendshipLogoContainer}>
                                    <Image
                                        source={ADD_FRIEND}
                                        style={styles.friendshipLogo}
                                    />
                                </View>
                                <View style={styles.friendshipStatusInfoContainer}>
                                    <Text style={styles.addFriendText}>Arkadaş</Text>
                                    <Text style={styles.addFriendText}>olarak ekle</Text>
                                </View>
                            </View>
                            }
                            {this.state.friendshipStatus === 'friendRequestSent' &&
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.friendshipLogoContainer}>
                                    <Image
                                        source={ADD_FRIEND_REQUESTED}
                                        style={styles.friendshipLogo}
                                    />
                                </View>
                                <View style={styles.friendshipStatusInfoContainer}>
                                    <Text style={styles.addFriendRequestedText}>Arkadaşlık isteği</Text>
                                    <Text style={styles.addFriendRequestedText}>gönderildi</Text>
                                </View>
                            </View>
                            }
                            {this.state.friendshipStatus === 'alreadyFriend' &&
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.friendshipLogoContainer}>
                                    <Image
                                        source={ALREADY_FRIEND}
                                        style={styles.friendshipLogo}
                                    />
                                </View>
                                <View style={styles.friendshipStatusInfoContainer}>
                                    <Text style={styles.alreadyFriendText}>Arkadaşın</Text>
                                </View>
                            </View>
                            }
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.totalGameStatsBox}>
                        <View style={styles.totalGameStatsInfosContainer}>
                            <Text style={styles.totalGameStatsText}>Oyun İstatistikleri</Text>
                            <Text style={styles.totalGamesPlayedCounter}>200</Text>
                            <Text style={styles.totalGamesPlayedText}>Oynadığı Oyun</Text>
                            <Text style={styles.wonText}>Kazandığı: 150</Text>
                            <Text style={styles.drawText}>Beraberlik: 10</Text>
                            <Text style={styles.lostText}>Kaybettiği: 40</Text>
                        </View>
                        <View style={styles.chartContainer}>

                        </View>
                    </View>
                    <View style={styles.versusGameStatsBox}>

                    </View>
                    <View style={styles.badgesBox}>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default OpponentsProfile
