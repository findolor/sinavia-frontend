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
import Swiper from 'react-native-swiper'
import styles from './style'
import NotchView from '../../../components/notchView'
import SemiCircleProgress from '../../../components/semiCircleProgress'
import returnLogo from '../../../assets/return.png'
import searchlogo from '../../../assets/search.png'
import ADD_FRIEND from '../../../assets/mainScreens/addFriend.png'
import ADD_FRIEND_REQUESTED from '../../../assets/mainScreens/addFriendRequested.png'
import ALREADY_FRIEND from '../../../assets/mainScreens/alreadyFriend.png'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import { friendActions } from '../../../redux/friends/actions'
import { opponentActions } from '../../../redux/opponents/actions'

class OpponentsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Ranked games variables
            totalRankedGames: this.props.totalRankedGames,
            totalRankedWin: this.props.totalRankedWin,
            totalRankedLose: this.props.totalRankedLose,
            totalRankedDraw: this.props.totalRankedDraw,
            rankedWinPercentage: this.props.rankedWinPercentage,
            // Friend games variables
            totalFriendGames: this.props.totalFriendGames,
            totalFriendWin: this.props.totalFriendWin,
            totalFriendLose: this.props.totalFriendLose,
            totalFriendDraw: this.props.totalFriendDraw,
            friendWinPercentage: this.props.friendWinPercentage,
            // Friend games that was played together
            totalFriendMatchesCount: this.props.totalFriendMatchesCount,
            clientWinCount: this.props.clientWinCount,
            opponentWinCount: this.props.opponentWinCount,
            // See if we deleted the friend
            isFriendDeleted: false,
            // Friend search text
            searchText: ''
        }
    }

    componentDidMount() {
        if (!this.props.isFriends) {
            if (this.props.isRequesting) {
                this.props.changeFriendshipStatus('friendRequestSent')
                this.props.changeIsFriendRequestSent(false)
            } else {
                if (this.props.isRequested) {
                    this.props.changeFriendshipStatus('friendRequestSent')
                    this.props.changeIsFriendRequestSent(true)
                } else this.props.changeFriendshipStatus('addFriend')
            }
        } else {
            this.props.changeFriendshipStatus('alreadyFriend')
            if (this.props.isRequesting)
                this.props.changeIsFriendRequestSent(false)
            else this.props.changeIsFriendRequestSent(true)
        }
    }

    // TODO this doesn't refresh the screen upon popping
    // TODO Take a close look here
    backButtonOnPress = () => {
        if (
            !this.props.isWithSearchBar &&
            this.state.isFriendDeleted &&
            !this.props.isFromOpponentScreen
        ) {
            navigationPop(true, {
                popScreen: SCENE_KEYS.mainScreens.friendsList,
                friendIds: this.props.friendIds
            })
        } else {
            this.props.removeFromOpponentList()
            navigationPop()
        }
    }

    sendFriendshipRequest = () => {
        this.props.sendFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id,
            this.props.clientInformation.username
        )
    }

    acceptFriendshipRequest = () => {
        this.props.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.opponentInformation.id,
            this.props.clientInformation.username,
            this.props.friendIds
        )
        this.props.addToFriendsList(this.props.opponentInformation)
    }

    deleteFriendship = () => {
        if (this.props.isFriendRequestSent) {
            this.props.deleteFriendshipRequest(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.opponentInformation.id,
                true,
                this.props.friendIds
            )
        } else {
            this.props.deleteFriendshipRequest(
                this.props.clientToken,
                this.props.opponentInformation.id,
                this.props.clientDBId,
                false,
                this.props.friendIds
            )
        }
        this.props.subtractFromFriendsList(this.props.opponentInformation)
        this.setState({ isFriendDeleted: true })
    }

    friendshipStatusOnPress = () => {
        switch (this.props.friendshipStatus) {
            case 'addFriend':
                this.sendFriendshipRequest()
                return
            case 'friendRequestSent':
                if (!this.props.isFriendRequestSent)
                    this.acceptFriendshipRequest()
                return
            case 'alreadyFriend':
                this.deleteFriendship()
                return
        }
    }

    profileSearchOnPress = () => {
        if (this.state.searchText === '') return
        navigationPop(true, {
            searchedKeyword: this.state.searchText,
            popScreen: SCENE_KEYS.mainScreens.profileSearch
        })
    }

    opponentFriendsOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.friendsList, {
            opponentFriendIds: this.props.friendsList,
            isOpponentFriends: true
        })
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
                                    onChangeText={text =>
                                        this.setState({ searchText: text })
                                    }
                                    autoCapitalize={'none'}
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
                                    Sınavia Puanı:{' '}
                                    {this.props.opponentInformation.totalPoints}
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
                            <TouchableOpacity
                                style={styles.opponentsFriendsBox}
                                onPress={this.opponentFriendsOnPress}
                            >
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
                                        {
                                            Object.keys(this.props.friendsList)
                                                .length
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.friendshipStatusOnPress}
                            >
                                <View style={styles.yourFriendshipStatusBox}>
                                    {this.props.friendshipStatus ===
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
                                    {this.props.friendshipStatus ===
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
                                                    {this.props
                                                        .isFriendRequestSent ===
                                                    true
                                                        ? 'gönderildi'
                                                        : 'alındı'}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    {this.props.friendshipStatus ===
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
                        <View style={styles.swiperContainer}>
                            <Swiper
                                loop={false}
                                paginationStyle={{ bottom: hp(0.5) }}
                                activeDotColor={'#FF9900'}
                            >
                                <View style={styles.totalGameStatsBox}>
                                    <View
                                        style={
                                            styles.totalGameStatsInfosContainer
                                        }
                                    >
                                        <Text style={styles.totalGameStatsText}>
                                            Dereceli Mod
                                        </Text>
                                        <Text
                                            style={
                                                styles.totalGamesPlayedCounter
                                            }
                                        >
                                            {this.state.totalRankedGames}
                                        </Text>
                                        <Text
                                            style={styles.totalGamesPlayedText}
                                        >
                                            Oynadığı Oyun
                                        </Text>
                                        <Text style={styles.wonText}>
                                            Kazandığı:{' '}
                                            {this.state.totalRankedWin}
                                        </Text>
                                        <Text style={styles.drawText}>
                                            Beraberlik:{' '}
                                            {this.state.totalRankedDraw}
                                        </Text>
                                        <Text style={styles.lostText}>
                                            Kaybettiği:{' '}
                                            {this.state.totalRankedLose}
                                        </Text>
                                    </View>
                                    <View style={styles.chartContainer}>
                                        <SemiCircleProgress
                                            percentage={
                                                this.state.totalRankedGames !==
                                                0
                                                    ? parseInt(
                                                          this.state.rankedWinPercentage.toFixed(
                                                              0
                                                          ),
                                                          10
                                                      )
                                                    : 0
                                            }
                                            progressColor={'#00D9EF'}
                                            circleRadius={wp(22)}
                                            animationSpeed={0.1}
                                            progressWidth={wp(5)}
                                        >
                                            <Text
                                                style={
                                                    styles.chartPercentageText
                                                }
                                            >
                                                {this.state.totalRankedGames !==
                                                0
                                                    ? this.state.rankedWinPercentage.toFixed(
                                                          0
                                                      )
                                                    : 0}
                                                %
                                            </Text>
                                        </SemiCircleProgress>
                                    </View>
                                </View>
                                <View style={styles.totalGameStatsBox}>
                                    <View
                                        style={
                                            styles.totalGameStatsInfosContainer
                                        }
                                    >
                                        <Text style={styles.totalGameStatsText}>
                                            Arkadaş Modu
                                        </Text>
                                        <Text
                                            style={
                                                styles.totalGamesPlayedCounter
                                            }
                                        >
                                            {this.state.totalFriendGames}
                                        </Text>
                                        <Text
                                            style={styles.totalGamesPlayedText}
                                        >
                                            Oynadığı Oyun
                                        </Text>
                                        <Text style={styles.wonText}>
                                            Kazandığı:{' '}
                                            {this.state.totalFriendWin}
                                        </Text>
                                        <Text style={styles.drawText}>
                                            Beraberlik:{' '}
                                            {this.state.totalFriendDraw}
                                        </Text>
                                        <Text style={styles.lostText}>
                                            Kaybettiği:{' '}
                                            {this.state.totalFriendLose}
                                        </Text>
                                    </View>
                                    <View style={styles.chartContainer}>
                                        <SemiCircleProgress
                                            percentage={
                                                this.state.totalFriendGames !==
                                                0
                                                    ? parseInt(
                                                          this.state.friendWinPercentage.toFixed(
                                                              0
                                                          ),
                                                          10
                                                      )
                                                    : 0
                                            }
                                            progressColor={'#00D9EF'}
                                            circleRadius={wp(22)}
                                            animationSpeed={0.1}
                                            progressWidth={wp(5)}
                                        >
                                            <Text
                                                style={
                                                    styles.chartPercentageText
                                                }
                                            >
                                                {this.state.totalFriendGames !==
                                                0
                                                    ? this.state.friendWinPercentage.toFixed(
                                                          0
                                                      )
                                                    : 0}
                                                %
                                            </Text>
                                        </SemiCircleProgress>
                                    </View>
                                </View>
                            </Swiper>
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
                                        {this.state.totalFriendMatchesCount}
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
                                                    width: wp(
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
                                                    width: wp(
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
                                                    width: wp(82),
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
                                                    width: wp(82),
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
                                                    width: wp(82),
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
    opponentInformation:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .opponentInformation,
    totalRankedWin:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalRankedWin,
    totalRankedLose:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalRankedLose,
    totalRankedDraw:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalRankedDraw,
    totalRankedGames:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalRankedGames,
    totalFriendWin:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalFriendWin,
    totalFriendLose:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalFriendLose,
    totalFriendDraw:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalFriendDraw,
    totalFriendGames:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalFriendGames,
    rankedWinPercentage:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .rankedWinPercentage,
    friendWinPercentage:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .friendWinPercentage,
    isFriends:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .isFriends,
    isRequesting:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .isRequesting,
    isRequested:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .isRequested,
    friendsList:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .friendsList,
    totalFriendMatchesCount:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalFriendMatchesCount,
    opponentWinCount:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .opponentWinCount,
    clientWinCount:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .clientWinCount,
    totalPoints:
        state.opponent.opponentList[state.opponent.opponentListLenght - 1]
            .totalPoints,
    friendshipStatus: state.friends.friendshipStatus,
    isFriendRequestSent: state.friends.isFriendRequestSent
})

const mapDispatchToProps = dispatch => ({
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList)),
    sendFriendshipRequest: (
        clientToken,
        clientId,
        opponentId,
        clientUsername
    ) =>
        dispatch(
            friendActions.sendFriendRequest(
                clientToken,
                clientId,
                opponentId,
                clientUsername
            )
        ),
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
    deleteFriendshipRequest: (
        clientToken,
        clientId,
        opponentId,
        isClientUser,
        friendIdList
    ) =>
        dispatch(
            friendActions.deleteFriendRequest(
                clientToken,
                clientId,
                opponentId,
                isClientUser,
                friendIdList
            )
        ),
    changeFriendshipStatus: friendshipStatus =>
        dispatch(friendActions.changeFriendshipStatus(friendshipStatus)),
    changeIsFriendRequestSent: isFriendRequestSent =>
        dispatch(friendActions.changeIsFriendRequestSent(isFriendRequestSent)),
    subtractFromFriendsList: opponentInformation =>
        dispatch(opponentActions.subtractFromFriendsList(opponentInformation)),
    addToFriendsList: opponentInformation =>
        dispatch(opponentActions.addToFriendsList(opponentInformation)),
    removeFromOpponentList: () =>
        dispatch(opponentActions.removeFromOpponentList())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpponentsProfile)
