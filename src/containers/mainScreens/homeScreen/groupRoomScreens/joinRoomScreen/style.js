import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    usersCounterText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    onlyCloseButtonContainer: {
        height: hp(6),
        width: wp(86),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    xLogo: {
        height: hp(4),
        width: hp(4)
    },
    modalView: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#ffffff',
        height: hp(67),
        width: wp(87.5),
        marginTop: hp(14),
        marginLeft: wp(6.25),
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: hp(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    modalSubjectText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#F7941E',
        marginTop: hp(1),
        fontSize: hp(3.3)
    },
    isJoinedRoomSubjectContainer: {
        height: hp(9),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userRow: {
        height: hp(8),
        width: wp(66),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA'
    },
    profilePicContainerinRow: {
        height: hp(6),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(100),
        borderWidth: hp(0.3),
        borderColor: '#FF9900'
    },
    nameContainer: {
        height: hp(6),
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    usersAndQuestionsCounterContainer: {
        height: hp(5),
        width: wp(87.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usersCounterContainer: {
        height: hp(5),
        width: wp(30),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionsCounterContainer: {
        height: hp(5),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    peopleCounterImg: {
        height: hp(3.8),
        width: hp(1.9),
        marginRight: wp(1.5)
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
        height: hp(10),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    modalContainer: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center'
    },
    playerStatusView: {
        height: hp(3),
        borderRadius: hp(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerStatusText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(2),
        color: 'white'
    },
    leaderContainer: {
        width: wp(6),
        alignItems: 'flex-end'
    },
    leaderLogo: {
        resizeMode: 'contain',
        height: hp(6),
        width: wp(6)
    },
    questionsNumberContainer: {
        height: hp(7.5),
        width: wp(66),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionsNumberText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4.5),
        color: '#5C5C5C',
        marginBottom: hp(1)
    },
    gameCodeContainer: {
        height: hp(12),
        width: wp(87.5),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    gameCodeBox: {
        height: hp(10),
        width: wp(66),
        borderWidth: wp(0.5),
        borderRadius: 10,
        borderColor: '#707070',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeBoxLeftView: {
        height: hp(10),
        width: wp(10)
    },
    gameCodeBoxTextView: {
        height: hp(10),
        width: wp(46),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(7),
        letterSpacing: wp(1),
        color: '#5C5C5C'
    },
    gameCodeBoxRightView: {
        height: hp(10),
        width: wp(10),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    copyImage: {
        height: hp(3),
        width: hp(3),
        marginBottom: hp(1)
    },
    gameCodeInfoTextContainer: {
        height: hp(7.5),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(3),
        color: '#A8A8A8'
    },
    isLeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        flex: 1,
        backgroundColor: '#000000DE',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    questionNumberText: {
        fontFamily: 'Averta-Light',
        fontSize: hp(3.5),
        color: '#FF9900'
    },
    questionNumberCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        width: hp(6),
        borderRadius: hp(100),
        marginBottom: hp(1)
    }
})
