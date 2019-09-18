import React from 'react'
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import NotchView from '../../../components/notchView'
import SemiCircleProgress from '../../../components/semiCircleProgress'
import returnLogo from '../../../assets/return.png'
import searchlogo from '../../../assets/search.png'
import ADD_FRIEND from '../../../assets/mainScreens/addFriend.png'
import ADD_FRIEND_REQUESTED from '../../../assets/mainScreens/addFriendRequested.png'
import ALREADY_FRIEND from '../../../assets/mainScreens/alreadyFriend.png'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import { friendshipServices } from '../../../sagas/friendship/'
import { friendActions } from '../../../redux/friends/actions'

class OpponentsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendshipStatus: 'alreadyFriend',
            // Played games variables
            gamesPlayed: this.props.totalPlayedGames,
            wonGames: this.props.gamesWon,
            lostGames: this.props.gamesLost,
            drawGames: this.props.gamesDraw,

            semiCirclePercentage: this.props.winPercentage,
            totalFriends: Object.keys(this.props.friendsList).length,
            // is friend request sent or received?
            isFriendRequestSent: false,
            // Friend games that was played together
            totalFriendGamesPlayed: this.props.totalFriendGames,
            clientWinCount: this.props.clientWinCount,
            opponentWinCount: this.props.opponentWinCount,
            // We send back deleted friend index for refreshing friedns screen
            deletedFriendIndex: null
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (!this.props.isFriends) {
            if (this.props.isRequesting)
                this.setState({
                    friendshipStatus: 'friendRequestSent',
                    isFriendRequestSent: false
                })
            else {
                if (this.props.isRequested)
                    this.setState({
                        friendshipStatus: 'friendRequestSent',
                        isFriendRequestSent: true
                    })
                else this.setState({ friendshipStatus: 'addFriend' })
            }
        } else {
            if (this.props.isRequesting)
                this.setState({
                    isFriendRequestSent: false
                })
            else this.setState({ isFriendRequestSent: true })
        }
    }

    // TODO this doesn't refresh the screen upon popping
    backButtonOnPress = () => {
        if (
            !this.props.isWithSearchBar &&
            this.state.deletedFriendIndex !== null
        ) {
            const friendsList = this.props.friendsScreenFriendsList
            friendsList.splice(this.state.deletedFriendIndex, 1)

            navigationPop(true, {
                popScreen: SCENE_KEYS.mainScreens.friendsList,
                friendsList: friendsList
            })
        } else navigationPop()
    }

    sendFriendshipRequest = () => {
        friendshipServices.sendFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id,
            this.props.clientInformation.username
        )
        this.setState({
            friendshipStatus: 'friendRequestSent',
            isFriendRequestSent: true
        })
    }

    addToFriendIds = id => {
        const friendList = this.props.friendIds
        friendList.push(id)

        this.props.saveFriendIdList(friendList)
    }

    acceptFriendshipRequest = () => {
        this.addToFriendIds(this.props.opponentInformation.id)
        friendshipServices.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id,
            this.props.clientInformation.username
        )
        this.setState({
            friendshipStatus: 'alreadyFriend',
            totalFriends: this.state.totalFriends + 1
        })
    }

    removeFromFriendIds = id => {
        const friendList = this.props.friendIds
        const index = friendList.indexOf(id)

        friendList.splice(index, 1)

        this.props.saveFriendIdList(friendList)
    }

    deleteFriendship = () => {
        console.log(this.state.isFriendRequestSent)
        if (this.state.isFriendRequestSent) {
            friendshipServices.deleteFriendship(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.opponentInformation.id,
                true
            )
        } else {
            friendshipServices.deleteFriendship(
                this.props.clientToken,
                this.props.opponentInformation.id,
                this.props.clientDBId,
                false
            )
        }
        this.removeFromFriendIds(this.props.opponentInformation.id)

        let friendIndex

        if (this.props.friendsScreenFriendsList) {
            this.props.friendsScreenFriendsList.forEach((friend, index) => {
                if (this.props.opponentInformation.id === friend.id) {
                    friendIndex = index
                    return
                }
            })
        }
        this.setState({
            friendshipStatus: 'addFriend',
            totalFriends: this.state.totalFriends - 1,
            deletedFriendIndex: friendIndex
        })
    }

    friendshipStatusOnPress = () => {
        switch (this.state.friendshipStatus) {
            case 'addFriend':
                this.sendFriendshipRequest()
                return
            case 'friendRequestSent':
                if (!this.state.isFriendRequestSent)
                    this.acceptFriendshipRequest()
                return
            case 'alreadyFriend':
                this.deleteFriendship()
                return
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
                    {this.props.isWithSearchBar && (
                        <View style={styles.searchBar}>
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.searchBarText}
                                    placeholder="Kullanıcı ara..."
                                    placeholderTextColor={'#7B7B7B'}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={this.profileSearchOnPress}
                            >
                                <Image
                                    source={searchlogo}
                                    style={styles.searchBarLogo}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={{
                            uri: this.props.opponentInformation.coverPicture
                        }}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.profileContainerShadowView}>
                            <View style={styles.profilePicView}>
                                <Image
                                    source={{
                                        uri: this.props.opponentInformation
                                            .profilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                            </View>
                            <View style={styles.profileInfoView}>
                                <Text style={styles.nameSurnameText}>
                                    {this.props.opponentInformation.name}{' '}
                                    {this.props.opponentInformation.lastname}
                                </Text>
                                <Text style={styles.usernameText}>
                                    @{this.props.opponentInformation.username}
                                </Text>
                                <Text style={styles.sinaviaScoreText}>
                                    Sınavia Puanı: {this.props.totalPoints}
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.scrollViewContainer}>
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
                                <View
                                    style={styles.opponentsFriendsCounterView}
                                >
                                    <Text
                                        style={styles.opponentsFriendsCounter}
                                    >
                                        {this.state.totalFriends}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={this.friendshipStatusOnPress}
                            >
                                <View style={styles.yourFriendshipStatusBox}>
                                    {this.state.friendshipStatus ===
                                        'addFriend' && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={
                                                    styles.friendshipLogoContainer
                                                }
                                            >
                                                <Image
                                                    source={ADD_FRIEND}
                                                    style={
                                                        styles.friendshipLogo
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.friendshipStatusInfoContainer
                                                }
                                            >
                                                <Text
                                                    style={styles.addFriendText}
                                                >
                                                    Arkadaş
                                                </Text>
                                                <Text
                                                    style={styles.addFriendText}
                                                >
                                                    olarak ekle
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    {this.state.friendshipStatus ===
                                        'friendRequestSent' && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={
                                                    styles.friendshipLogoContainer
                                                }
                                            >
                                                <Image
                                                    source={
                                                        ADD_FRIEND_REQUESTED
                                                    }
                                                    style={
                                                        styles.friendshipLogo
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.friendshipStatusInfoContainer
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.addFriendRequestedText
                                                    }
                                                >
                                                    Arkadaşlık isteği
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.addFriendRequestedText
                                                    }
                                                >
                                                    {this.state
                                                        .isFriendRequestSent ===
                                                    true
                                                        ? 'gönderildi'
                                                        : 'alındı'}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    {this.state.friendshipStatus ===
                                        'alreadyFriend' && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={
                                                    styles.friendshipLogoContainer
                                                }
                                            >
                                                <Image
                                                    source={ALREADY_FRIEND}
                                                    style={
                                                        styles.friendshipLogo
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.friendshipStatusInfoContainer
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.alreadyFriendText
                                                    }
                                                >
                                                    Arkadaşın
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.totalGameStatsBox}>
                            <View style={styles.totalGameStatsInfosContainer}>
                                <Text style={styles.totalGameStatsText}>
                                    Oyun İstatistikleri
                                </Text>
                                <Text style={styles.totalGamesPlayedCounter}>
                                    {this.state.gamesPlayed}
                                </Text>
                                <Text style={styles.totalGamesPlayedText}>
                                    Oynadığı Oyun
                                </Text>
                                <Text style={styles.wonText}>
                                    Kazandığı: {this.state.wonGames}
                                </Text>
                                <Text style={styles.drawText}>
                                    Beraberlik: {this.state.drawGames}
                                </Text>
                                <Text style={styles.lostText}>
                                    Kaybettiği: {this.state.lostGames}
                                </Text>
                            </View>
                            <View style={styles.chartContainer}>
                                <SemiCircleProgress
                                    percentage={
                                        this.state.gamesPlayed !== 0
                                            ? parseInt(
                                                  this.state.semiCirclePercentage.toFixed(
                                                      0
                                                  ),
                                                  10
                                              )
                                            : 0
                                    }
                                    progressColor={'#00D9EF'}
                                    circleRadius={widthPercentageToDP(22)}
                                    animationSpeed={0.1}
                                    progressWidth={widthPercentageToDP(5)}
                                >
                                    <Text style={styles.chartPercentageText}>
                                        {this.state.gamesPlayed !== 0
                                            ? this.state.semiCirclePercentage.toFixed(
                                                  0
                                              )
                                            : 0}
                                        %
                                    </Text>
                                </SemiCircleProgress>
                            </View>
                        </View>
                        <View style={styles.versusGameStatsBox}>
                            <View style={styles.versusGameTextsContainer}>
                                <View style={styles.versusGameTitleContainer}>
                                    <Text style={styles.versusGameTitleText}>
                                        Aranızdaki Oyunlar
                                    </Text>
                                </View>
                                <View style={styles.versusGameTotalContainer}>
                                    <Text style={styles.versusTotalText}>
                                        Toplam Oyun{' '}
                                    </Text>
                                    <Text style={styles.versusTotalCounter}>
                                        {this.state.totalFriendGamesPlayed}
                                    </Text>
                                </View>
                            </View>
                            {this.state.clientWinCount > 0 &&
                                this.state.opponentWinCount > 0 && (
                                    <View
                                        style={styles.versusGameChartContainer}
                                    >
                                        <View
                                            style={[
                                                styles.yourWinsView,
                                                {
                                                    width: widthPercentageToDP(
                                                        (this.state
                                                            .clientWinCount /
                                                            (this.state
                                                                .clientWinCount +
                                                                this.state
                                                                    .opponentWinCount)) *
                                                            82
                                                    )
                                                }
                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.opponentsWinsView,
                                                {
                                                    width: widthPercentageToDP(
                                                        (this.state
                                                            .opponentWinCount /
                                                            (this.state
                                                                .clientWinCount +
                                                                this.state
                                                                    .opponentWinCount)) *
                                                            82
                                                    )
                                                }
                                            ]}
                                        />
                                        <Text style={styles.yourWinsCounter}>
                                            {this.state.clientWinCount}
                                        </Text>
                                        <Text
                                            style={styles.opponentWinsCounter}
                                        >
                                            {this.state.opponentWinCount}
                                        </Text>
                                    </View>
                                )}
                            {this.state.clientWinCount > 0 &&
                                this.state.opponentWinCount === 0 && (
                                    <View
                                        style={styles.versusGameChartContainer}
                                    >
                                        <View
                                            style={[
                                                styles.yourWinsView,
                                                {
                                                    width: widthPercentageToDP(
                                                        82
                                                    ),
                                                    borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10
                                                }
                                            ]}
                                        />
                                        <Text style={styles.yourWinsCounter}>
                                            {this.state.clientWinCount}
                                        </Text>
                                        <Text
                                            style={styles.opponentWinsCounter}
                                        >
                                            {this.state.opponentWinCount}
                                        </Text>
                                    </View>
                                )}
                            {this.state.clientWinCount === 0 &&
                                this.state.opponentWinCount > 0 && (
                                    <View
                                        style={styles.versusGameChartContainer}
                                    >
                                        <View
                                            style={[
                                                styles.opponentsWinsView,
                                                {
                                                    width: widthPercentageToDP(
                                                        82
                                                    ),
                                                    borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10
                                                }
                                            ]}
                                        />
                                        <Text style={styles.yourWinsCounter}>
                                            {this.state.clientWinCount}
                                        </Text>
                                        <Text
                                            style={styles.opponentWinsCounter}
                                        >
                                            {this.state.opponentWinCount}
                                        </Text>
                                    </View>
                                )}
                            {this.state.clientWinCount === 0 &&
                                this.state.opponentWinCount === 0 && (
                                    <View
                                        style={styles.versusGameChartContainer}
                                    >
                                        <View
                                            style={[
                                                styles.noneWinsView,
                                                {
                                                    width: widthPercentageToDP(
                                                        82
                                                    ),
                                                    borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10
                                                }
                                            ]}
                                        >
                                            <Text
                                                style={styles.noneWinsInfoText}
                                            >
                                                Henüz kazanan yok, hadi bunu
                                                değiştir!
                                            </Text>
                                        </View>
                                        <Text style={styles.yourWinsCounter}>
                                            {this.state.clientWinCount}
                                        </Text>
                                        <Text
                                            style={styles.opponentWinsCounter}
                                        >
                                            {this.state.opponentWinCount}
                                        </Text>
                                    </View>
                                )}
                            <View style={styles.versusGameNamesContainer}>
                                <Text style={styles.versusGameTitleText}>
                                    Sen
                                </Text>
                                <Text style={styles.versusGameTitleText}>
                                    {this.props.opponentInformation.name +
                                        ' ' +
                                        this.props.opponentInformation.lastname}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.badgesBox} />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    friendIds: state.friends.friendIds,
    clientInformation: state.client.clientInformation,
    opponentInformation: state.opponent.opponentInformation,
    totalPlayedGames: state.opponent.totalPlayedGames,
    gamesWon: state.opponent.gamesWon,
    gamesLost: state.opponent.gamesLost,
    gamesDraw: state.opponent.gamesDraw,
    isFriends: state.opponent.isFriends,
    isRequesting: state.opponent.isRequesting,
    isRequested: state.opponent.isRequested,
    friendsList: state.opponent.friendsList,
    totalFriendGames: state.opponent.totalFriendGames,
    opponentWinCount: state.opponent.opponentWinCount,
    clientWinCount: state.opponent.clientWinCount,
    winPercentage: state.opponent.winPercentage,
    totalPoints: state.opponent.totalPoints
})

const mapDispatchToProps = dispatch => ({
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpponentsProfile)
