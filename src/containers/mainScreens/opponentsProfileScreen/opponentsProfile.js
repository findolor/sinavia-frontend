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
import {
    SCENE_KEYS,
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
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
import { statisticsServices } from '../../../sagas/statistic/'
import { friendActions } from '../../../redux/friends/actions'

class OpponentsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendshipStatus: 'addFriend',
            youVersusOpponentTotalGames: 45,
            yourWinsAgainstOpponent: 0,
            opponentsWinsAgainstYou: 0,
            // Played games variables
            gamesPlayed: 0,
            wonGames: 0,
            lostGames: 0,
            drawGames: 0,

            semiCirclePercentage: 0,
            totalFriends: 0,
            // is friend request sent or received?
            isFriendRequestSent: false,
            // Friend games that was played together
            totalFriendGamesPlayed: 0,
            clientWinCount: 0,
            opponentWinCount: 0
        }
    }

    async componentDidMount() {
        await this.loadUserProfile()
    }

    loadUserProfile = async () => {
        await this.loadFriendshipInformation()
        await this.loadStatistics()
        await this.loadFriendMatches()
        await this.loadFriends()
    }

    loadFriendshipInformation = async () => {
        const friendship = await friendshipServices.getFriendship(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id
        )

        console.log(friendship)

        if (Object.keys(friendship).length !== 0) {
            friendship[0].userId === this.props.clientDBId
                ? this.setState({ isFriendRequestSent: true })
                : this.setState({ isFriendRequestSent: false })
            if (friendship[0].friendshipStatus === 'requested')
                this.setState({ friendshipStatus: 'friendRequestSent' })
            else this.setState({ friendshipStatus: 'alreadyFriend' })
        }
    }

    loadFriendMatches = async () => {
        const friendMatches = await friendshipServices.getFriendMatches(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id
        )

        let clientWinCount = 0
        let opponentWinCount = 0
        let totalFriendGamesPlayed = 0

        friendMatches.forEach(match => {
            totalFriendGamesPlayed++
            if (!match.isMatchDraw) {
                if (match.winnerId === this.props.clientDBId) clientWinCount++
                else opponentWinCount++
            }
        })

        this.setState({
            totalFriendGamesPlayed: totalFriendGamesPlayed,
            clientWinCount: clientWinCount,
            opponentWinCount: opponentWinCount
        })
    }

    loadFriends = async () => {
        const friends = await friendshipServices.getFriends(
            this.props.clientToken,
            this.props.opponentInformation.id
        )

        this.setState({ totalFriends: Object.keys(friends).length })
    }

    loadStatistics = async () => {
        const statistics = await statisticsServices.getStatistics(
            this.props.clientToken,
            this.props.opponentInformation.id
        )

        let wonGames = 0
        let lostGames = 0
        let drawGames = 0

        statistics.forEach(statistic => {
            switch (statistic.gameResult) {
                case 'won':
                    wonGames++
                    return
                case 'lost':
                    lostGames++
                    return
                case 'draw':
                    drawGames++
                    return
            }
        })

        this.setState({
            wonGames: wonGames,
            lostGames: lostGames,
            drawGames: drawGames,
            gamesPlayed: Object.keys(statistics).length,
            semiCirclePercentage:
                (wonGames / Object.keys(statistics).length) * 100
        })
    }

    backButtonOnPress = () => {
        navigationPop()
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
        if (this.state.isFriendRequestSent) {
            this.removeFromFriendIds(this.props.opponentInformation.id)
            friendshipServices.deleteFriendship(
                this.props.clientToken,
                this.props.clientDBId
            )
        } else {
            this.removeFromFriendIds(this.props.clientDBId)
            friendshipServices.deleteFriendship(
                this.props.clientToken,
                this.props.opponentInformation.id
            )
        }
        this.setState({
            friendshipStatus: 'addFriend',
            totalFriends: this.state.totalFriends - 1
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
                        source={{
                            uri: this.props.opponentInformation.coverPicture
                        }}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <View style={styles.profilePicView}>
                            <Image
                                source={{
                                    uri: this.props.opponentInformation
                                        .profilePicture
                                }}
                                style={styles.profilePic}
                            />
                        </View>
                        <View style={styles.nameView}>
                            <View style={styles.nameSurnameContainer}>
                                <Text style={styles.nameSurnameText}>
                                    {this.props.opponentInformation.name +
                                        ' ' +
                                        this.props.opponentInformation.lastname}
                                </Text>
                            </View>
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>
                                    @{this.props.opponentInformation.username}
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
                                                style={styles.friendshipLogo}
                                            />
                                        </View>
                                        <View
                                            style={
                                                styles.friendshipStatusInfoContainer
                                            }
                                        >
                                            <Text style={styles.addFriendText}>
                                                Arkadaş
                                            </Text>
                                            <Text style={styles.addFriendText}>
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
                                                source={ADD_FRIEND_REQUESTED}
                                                style={styles.friendshipLogo}
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
                                                style={styles.friendshipLogo}
                                            />
                                        </View>
                                        <View
                                            style={
                                                styles.friendshipStatusInfoContainer
                                            }
                                        >
                                            <Text
                                                style={styles.alreadyFriendText}
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
                                <View style={styles.versusGameChartContainer}>
                                    <View
                                        style={[
                                            styles.yourWinsView,
                                            {
                                                width: widthPercentageToDP(
                                                    (this.state.clientWinCount /
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
                                    <Text style={styles.opponentWinsCounter}>
                                        {this.state.opponentWinCount}
                                    </Text>
                                </View>
                            )}
                        {this.state.clientWinCount > 0 &&
                            this.state.opponentWinCount === 0 && (
                                <View style={styles.versusGameChartContainer}>
                                    <View
                                        style={[
                                            styles.yourWinsView,
                                            {
                                                width: widthPercentageToDP(82),
                                                borderTopRightRadius: 10,
                                                borderBottomRightRadius: 10
                                            }
                                        ]}
                                    />
                                    <Text style={styles.yourWinsCounter}>
                                        {this.state.clientWinCount}
                                    </Text>
                                    <Text style={styles.opponentWinsCounter}>
                                        {this.state.opponentWinCount}
                                    </Text>
                                </View>
                            )}
                        {this.state.clientWinCount === 0 &&
                            this.state.opponentWinCount > 0 && (
                                <View style={styles.versusGameChartContainer}>
                                    <View
                                        style={[
                                            styles.opponentsWinsView,
                                            {
                                                width: widthPercentageToDP(82),
                                                borderTopLeftRadius: 10,
                                                borderBottomLeftRadius: 10
                                            }
                                        ]}
                                    />
                                    <Text style={styles.yourWinsCounter}>
                                        {this.state.clientWinCount}
                                    </Text>
                                    <Text style={styles.opponentWinsCounter}>
                                        {this.state.opponentWinCount}
                                    </Text>
                                </View>
                            )}
                        {this.state.clientWinCount === 0 &&
                            this.state.opponentWinCount === 0 && (
                                <View style={styles.versusGameChartContainer}>
                                    <View
                                        style={[
                                            styles.noneWinsView,
                                            {
                                                width: widthPercentageToDP(82),
                                                borderTopLeftRadius: 10,
                                                borderBottomLeftRadius: 10
                                            }
                                        ]}
                                    >
                                        <Text style={styles.noneWinsInfoText}>
                                            Henüz kazanan yok, hadi bunu
                                            değiştir!
                                        </Text>
                                    </View>
                                    <Text style={styles.yourWinsCounter}>
                                        {this.state.clientWinCount}
                                    </Text>
                                    <Text style={styles.opponentWinsCounter}>
                                        {this.state.opponentWinCount}
                                    </Text>
                                </View>
                            )}
                        <View style={styles.versusGameNamesContainer}>
                            <Text style={styles.versusGameTitleText}>Sen</Text>
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
)(OpponentsProfile)
