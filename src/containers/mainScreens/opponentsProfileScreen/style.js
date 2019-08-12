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
        height: hp(6),
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    profileContainer: {
        height: hp(32),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxesContainer: {
        height: hp(58),
        width: wp(100)
    },
    coverPhoto: {
        height: hp(30),
        width: wp(90),
        borderRadius: 30,
        marginTop: hp(0.5),
        alignItems: 'center'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    searchBarText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        paddingVertical: hp(0)
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
        height: hp(15),
        width: hp(15),
        marginTop: hp(2.7),
        borderRadius: 100
    },
    profilePicView: {
        height: hp(18),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameView: {
        height: hp(10),
        width: wp(70),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    nameSurnameText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(3.5),
        color: '#2E313C',
        paddingVertical: hp(0)
    },
    usernameText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.4),
        color: '#2E313C',
        paddingVertical: hp(0)
    },
    nameSurnameContainer: {
        backgroundColor: '#FFFFFF80',
        width: wp(40),
        alignItems: 'center',
        borderRadius: 30
    },
    usernameContainer: {
        backgroundColor: '#FFFFFF80',
        width: wp(30),
        height: hp(3.5),
        alignItems: 'center',
        borderRadius: 30
    },
    boxesScrollView: {
        height: hp(53),
        width: wp(90)
    },
    friendsBoxes: {
        height: hp(12),
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
        borderRadius: 10,
        borderColor: '#00D9EF'
    },
    yourFriendshipStatusBox: {
        height: hp(10),
        width: wp(43),
        borderWidth: hp(0.3),
        borderRadius: 10,
        borderColor: '#00D9EF'
    },
    totalGameStatsBox: {
        height: hp(23),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginTop: hp(2.5),
        flexDirection: 'row'
    },
    versusGameStatsBox: {
        height: hp(16),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginTop: hp(2.5)
    },
    badgesBox: {
        height: hp(16),
        width: wp(90),
        borderWidth: hp(0.3),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginTop: hp(2.5),
        marginBottom: hp(2)
    },
    opponentsFriendsTextView: {
        height: hp(4.7),
        width: wp(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    opponentsFriendsCounterView: {
        height: hp(5.3),
        width: wp(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    opponentsFriendsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.5),
        color: '#2E313C',
        marginTop: hp(0.5)
    },
    opponentsFriendsCounter: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(5),
        color: '#FF9900',
        marginBottom: hp(0.5)
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
        width: wp(40)
    },
    chartContainer :{
        height: hp(22.5),
        width: wp(49),
        backgroundColor: 'blue'
    },
    totalGameStatsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#2E313C',
        marginLeft: wp(3),
        marginTop: hp(2)
    },
    totalGamesPlayedCounter: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(4),
        color: '#2E313C',
        marginLeft: wp(3),
        marginTop: hp(1)
    },
    totalGamesPlayedText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.5),
        color: '#CACACA',
        marginLeft: wp(3)
    },
    wonText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#6AC259',
        marginLeft: wp(3),
        marginTop: hp(1.5)
    },
    drawText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#2E313C',
        marginLeft: wp(3)
    },
    lostText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#B72A2A',
        marginLeft: wp(3)
    }
})
