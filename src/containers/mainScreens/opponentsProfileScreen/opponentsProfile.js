import React from 'react'
import {
    Image,
    ImageBackground,
    Modal,
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
import AuthButton from '../../../components/authScreen/authButton'

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
            // Friend search text
            searchText: '',
            // Friendship status
            friendshipStatus: 'addFriend',
            isFriendRequestSent: null,
            isModalVisible: false,
            visibleView: ''
        }
    }

    componentDidMount() {
        if (!this.props.isFriends) {
            if (this.props.isRequesting) {
                this.setState({
                    friendshipStatus: 'friendRequestSent',
                    isFriendRequestSent: false
                })
            } else {
                if (this.props.isRequested) {
                    this.setState({
                        friendshipStatus: 'friendRequestSent',
                        isFriendRequestSent: true
                    })
                } else
                    this.setState({
                        friendshipStatus: 'addFriend'
                    })
            }
        } else {
            this.setState({
                friendshipStatus: 'alreadyFriend'
            })
        }
    }

    backButtonOnPress = () => {
        if (!this.props.isWithSearchBar && !this.props.isFromOpponentScreen) {
            this.props.removeFromOpponentList()
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
        this.setState({
            friendshipStatus: 'friendRequestSent',
            isFriendRequestSent: true
        })
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
        this.setState({
            friendshipStatus: 'alreadyFriend',
            isModalVisible: false,
            visibleView: ''
        })
    }

    deleteFriendship = () => {
        if (this.props.isRequested || this.state.isFriendRequestSent) {
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
        this.setState({
            friendshipStatus: 'addFriend',
            isModalVisible: false,
            visibleView: ''
        })
        this.props.subtractFromFriendsList(this.props.opponentInformation)
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
            isOpponentFriends: true,
            friendsList: []
        })
    }

    friendshipStatusOnPress = () => {
        switch (this.state.friendshipStatus) {
            case 'addFriend':
                this.sendFriendshipRequest()
                return
            case 'friendRequestSent':
                if (this.state.isFriendRequestSent === false) {
                    this.setState({
                        isModalVisible: true,
                        visibleView: 'acceptFriendshipRequestModal'
                    })
                } else {
                    this.setState({
                        isModalVisible: true,
                        visibleView: 'removeFriendshipRequestModal'
                    })
                }
                return
            case 'alreadyFriend':
                this.setState({
                    isModalVisible: true,
                    visibleView: 'removeFriendshipModal'
                })
                return
        }
    }

    acceptFriendshipRequestModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            <Text
                                style={[
                                    {
                                        color: '#FF9900',
                                        fontFamily: 'Averta-SemiboldItalic'
                                    }
                                ]}
                            >
                                {this.props.opponentInformation.username}
                            </Text>{' '}
                            kişisinden
                        </Text>
                        <Text style={styles.areYouSureText}>
                            gelen arkadaşlık isteğini
                        </Text>
                        <Text style={styles.areYouSureText}>
                            kabul ediyor musun?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.acceptFriendshipRequest}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({ isModalVisible: false })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    removeFriendshipRequestModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            <Text
                                style={[
                                    {
                                        color: '#FF9900',
                                        fontFamily: 'Averta-SemiboldItalic'
                                    }
                                ]}
                            >
                                {this.props.opponentInformation.username}
                            </Text>{' '}
                            kişisine
                        </Text>
                        <Text style={styles.areYouSureText}>
                            gönderdiğin arkadaşlık isteği
                        </Text>
                        <Text style={styles.areYouSureText}>
                            iptal edilsin mi?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.deleteFriendship}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({ isModalVisible: false })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    removeFriendshipModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            <Text
                                style={[
                                    {
                                        color: '#FF9900',
                                        fontFamily: 'Averta-SemiboldItalic'
                                    }
                                ]}
                            >
                                {this.props.opponentInformation.username}
                            </Text>{' '}
                            kişisi
                        </Text>
                        <Text style={styles.areYouSureText}>
                            arkadaşlıktan çıkarılsın mı?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() => this.deleteFriendship()}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({ isModalVisible: false })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.state.visibleView === 'removeFriendshipModal' &&
                        this.removeFriendshipModal()}
                    {this.state.visibleView ===
                        'removeFriendshipRequestModal' &&
                        this.removeFriendshipRequestModal()}
                    {this.state.visibleView ===
                        'acceptFriendshipRequestModal' &&
                        this.acceptFriendshipRequestModal()}
                </Modal>
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
                        imageStyle={{ borderRadius: hp(3) }}
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
                                <Text
                                    style={[
                                        styles.nameSurnameText,
                                        {
                                            fontSize:
                                                this.props.opponentInformation
                                                    .name.length +
                                                    this.props
                                                        .opponentInformation
                                                        .lastname.length >
                                                21
                                                    ? hp(2.25)
                                                    : hp(3.5)
                                        }
                                    ]}
                                >
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
                                                        .isFriendRequestSent &&
                                                        'gönderildi'}
                                                    {!this.state
                                                        .isFriendRequestSent &&
                                                        'alındı'}
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
                        <View style={styles.swiperContainer}>
                            <Swiper
                                loop={false}
                                paginationStyle={{ bottom: hp(0.5) }}
                                activeDotColor={'#FF9900'}
                                removeClippedSubviews={false}
                                activeDot={
                                    <View
                                        style={{
                                            height: hp(1.5),
                                            width: hp(1.5),
                                            backgroundColor: '#FF9900',
                                            borderRadius: hp(100),
                                            marginLeft: wp(1),
                                            marginRight: wp(1)
                                        }}
                                    />
                                }
                                dot={
                                    <View
                                        style={{
                                            height: hp(1.5),
                                            width: hp(1.5),
                                            backgroundColor: 'rgba(0,0,0,.2)',
                                            borderRadius: hp(100),
                                            marginLeft: wp(1),
                                            marginRight: wp(1)
                                        }}
                                    />
                                }
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
                                                    borderTopRightRadius: hp(1),
                                                    borderBottomRightRadius: hp(
                                                        1
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
                                                    borderTopLeftRadius: hp(1),
                                                    borderBottomLeftRadius: hp(
                                                        1
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
                                                    borderTopLeftRadius: hp(1),
                                                    borderBottomLeftRadius: hp(
                                                        1
                                                    )
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
                                <Text style={styles.versusGamePlayersTitleText}>
                                    Sen
                                </Text>
                                <Text style={styles.versusGamePlayersTitleText}>
                                    {this.props.opponentInformation.username}
                                </Text>
                            </View>
                        </View>
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
    subtractFromFriendsList: opponentInformation =>
        dispatch(opponentActions.subtractFromFriendsList(opponentInformation)),
    addToFriendsList: opponentInformation =>
        dispatch(opponentActions.addToFriendsList(opponentInformation)),
    removeFromOpponentList: () =>
        dispatch(opponentActions.removeFromOpponentList())
})

export default connect(mapStateToProps, mapDispatchToProps)(OpponentsProfile)
