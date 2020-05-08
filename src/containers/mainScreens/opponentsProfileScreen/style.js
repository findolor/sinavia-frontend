import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    header: {
        flex: 6,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileContainer: {
        flex: 32,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 58,
        justifyContent: 'space-evenly'
    },
    searchBar: {
        height: hp(5),
        width: wp(77),
        borderRadius: 30,
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxesContainer: {
        height: hp(58),
        width: wp(100)
    },
    coverPhoto: {
        height: hp(30),
        width: wp(90),
        borderRadius: hp(3),
        marginTop: hp(1)
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    searchBarText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#2E313C'
    },
    searchBarLogo: {
        height: hp(2.7),
        width: hp(2.7),
        marginRight: wp(3)
    },
    textInputView: {
        height: hp(3.8),
        width: wp(65),
        justifyContent: 'center',
        marginLeft: wp(2.7)
    },
    profilePic: {
        height: hp(13.5),
        width: hp(13.5),
        marginTop: hp(2),
        borderRadius: hp(100),
        borderWidth: hp(0.4),
        borderColor: '#FF9900'
    },
    profilePicView: {
        height: hp(16.5),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileInfoView: {
        height: hp(12),
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameSurnameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3.5),
        color: 'white',
        textAlign: 'center',
        paddingVertical: hp(0)
    },
    usernameText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2.4),
        color: 'white',
        paddingVertical: hp(0)
    },
    boxesScrollView: {
        height: hp(53),
        width: wp(90)
    },
    friendsBoxes: {
        height: hp(10),
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    opponentsFriendsBox: {
        height: hp(10),
        width: wp(43),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hp(0.3),
        borderRadius: hp(1),
        borderColor: '#00D9EF'
    },
    yourFriendshipStatusBox: {
        height: hp(10),
        width: wp(43),
        borderWidth: hp(0.3),
        borderRadius: hp(1),
        borderColor: '#00D9EF'
    },
    swiperContainer: {
        height: hp(23),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: hp(1),
        borderColor: '#00D9EF',
        overflow: 'hidden'
    },
    totalGameStatsBox: {
        height: hp(23),
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    versusGameStatsBox: {
        height: hp(16),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: hp(1),
        borderColor: '#00D9EF',
        alignItems: 'center'
    },
    badgesBox: {
        height: hp(16),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: hp(1),
        borderColor: '#00D9EF',
        marginTop: hp(2.5),
        marginBottom: hp(2)
    },
    opponentsFriendsTextView: {
        height: hp(4.5),
        width: wp(40),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    opponentsFriendsCounterView: {
        height: hp(5.5),
        width: wp(40),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    opponentsFriendsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.5),
        color: '#2E313C'
    },
    opponentsFriendsCounter: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(4),
        color: '#FF9900'
    },
    friendshipLogo: {
        height: hp(4.5),
        width: hp(4.5)
    },
    friendshipLogoContainer: {
        height: hp(9.5),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    friendshipStatusInfoContainer: {
        height: hp(9.5),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    alreadyFriendText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.5),
        color: '#2E313C'
    },
    addFriendRequestedText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.8),
        color: '#AFAFAF'
    },
    addFriendText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#2E313C'
    },
    totalGameStatsInfosContainer: {
        height: hp(22.5),
        width: wp(40),
        justifyContent: 'center'
    },
    chartContainer: {
        height: hp(23),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    totalGameStatsText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#2E313C',
        marginLeft: wp(4)
    },
    totalGamesPlayedCounter: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(4),
        color: '#2E313C',
        marginLeft: wp(4)
    },
    totalGamesPlayedText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.5),
        color: '#CACACA',
        marginLeft: wp(4)
    },
    wonText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#6AC259',
        marginLeft: wp(4)
    },
    drawText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#2E313C',
        marginLeft: wp(4)
    },
    lostText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#B72A2A',
        marginLeft: wp(4)
    },
    chartPercentageText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(5),
        color: '#FF9900'
    },
    versusGameTextsContainer: {
        height: hp(5.5),
        width: wp(82),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    versusGameTitleContainer: {
        height: hp(5),
        width: wp(41),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    versusGameTotalContainer: {
        height: hp(5),
        width: wp(41),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    versusGameTitleText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#2E313C'
    },
    versusGamePlayersTitleText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.3),
        color: '#2E313C'
    },
    versusTotalText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#00D9EF'
    },
    versusTotalCounter: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.7),
        color: '#FF9900'
    },
    versusGameChartContainer: {
        height: hp(6),
        width: wp(82),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    yourWinsView: {
        height: hp(5),
        borderTopLeftRadius: hp(1),
        borderBottomLeftRadius: hp(1),
        backgroundColor: '#6AC259'
    },
    opponentsWinsView: {
        height: hp(5),
        width: wp(41),
        borderTopRightRadius: hp(1),
        borderBottomRightRadius: hp(1),
        backgroundColor: '#B72A2A'
    },
    noneWinsView: {
        height: hp(5),
        width: wp(82),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(1),
        backgroundColor: '#FF9900'
    },
    noneWinsInfoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.5),
        color: '#FFFFFF'
    },
    yourWinsCounter: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#FFFFFF',
        position: 'absolute',
        paddingRight: wp(75)
    },
    opponentWinsCounter: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#FFFFFF',
        position: 'absolute',
        paddingLeft: wp(75)
    },
    versusGameNamesContainer: {
        height: hp(7),
        width: wp(81),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    profileContainerShadowView: {
        height: hp(30),
        width: wp(90),
        borderRadius: hp(3),
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    sinaviaScoreText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.4),
        color: '#FF9900',
        paddingVertical: hp(0)
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    quitView: {
        backgroundColor: '#ffffff',
        height: hp(20),
        width: wp(87.5),
        marginTop: hp(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10
    },
    areYouSureText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(4.5),
        color: '#5C5C5C'
    },
    yesOrNoButtonsContainer: {
        height: hp(9),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    reportIconView: {
        position: 'absolute',
        height: hp(5.5),
        width: wp(10),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        left: wp(79)
    },
    reportIcon: {
        height: hp(3.5),
        width: hp(4.12)
    },
    reportView: {
        height: hp(30),
        width: wp(90),
        borderRadius: hp(3),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        marginTop: hp(1)
    },
    reportViewHeader: {
        height: hp(4.5),
        width: wp(90),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: wp(3)
    },
    reportOptionsView: {
        height: hp(19),
        width: wp(90),
        justifyContent: 'space-evenly'
    },
    reportButtonView: {
        height: hp(6.5),
        width: wp(90),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reportOptionView: {
        height: hp(5),
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center'
    },
    afterReportText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        color: '#2E313C',
        textAlign: 'center'
    },
    checkBox: {
        height: hp(4),
        width: hp(4),
        borderRadius: hp(0.5),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        marginLeft: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    reportOptionText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.3),
        color: '#000000',
        marginLeft: wp(2)
    },
    reportHeaderText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#000000'
    },
    reportButton: {
        height: hp(4.5),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(0.5),
        backgroundColor: '#FF9900'
    },
    reportButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#FFFFFF'
    },
    checkIcon: {
        height: hp(2.5),
        width: hp(2.5)
    }
})
