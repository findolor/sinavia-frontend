import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    background: {
        height: hp(100),
        width: wp(100)
    },
    resultTextContainer: {
        height: hp(21.44),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute'
    },
    resultTextImg: {
        resizeMode: 'contain',
        marginBottom: hp(5),
        height: hp(10),
        width: hp(40)
    },
    resultsContainer: {
        height: hp(58),
        width: wp(87.8),
        backgroundColor: '#F2FEFF',
        marginTop: hp(21.44),
        marginLeft: wp(6.4),
        borderRadius: 20,
        position: 'absolute',
        alignItems: 'center',
    },
    replayButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: 10,
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(10)
    },
    newOpponentButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: 10,
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainScreenButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: 10,
        backgroundColor: '#00D9EF',
        marginRight: wp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(1.8)
    },
    buttonsContainer: {
        height: hp(10),
        width: wp(100),
        marginTop: hp(81.6),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    slideView: {
        height: hp(10),
        width: wp(100),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#00D9EF',
        position: 'absolute',
        marginTop: hp(93.7),
        alignItems: 'center'
    },
    slideUpContainer: {
        height: hp(7),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    slideViewText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        marginTop: hp(2),
        letterSpacing: wp(0.1),
        fontSize: hp(2)
    },
    slideUpImg: {
        height: hp(2),
        width: hp(2),
        marginTop: hp(2.3)
    },
    results1Container: {
        height: hp(21),
        width: wp(87.8),
        marginTop: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    results2Container: {
        height: hp(31),
        width: wp(80),
        marginTop: hp(1.4),
        backgroundColor: '#00D9EF',
        borderRadius: 20,
        alignItems: 'center'
    },
    user1Container: {
        height: hp(21),
        width: wp(35),
        alignItems: 'center'
    },
    user2Container: {
        height: hp(21),
        width: wp(35),
        alignItems: 'center'
    },
    answersContainer: {
        height: hp(12),
        width: wp(17.8),
        marginBottom: hp(4),
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    answerImg: {
        height: hp(2.5),
        width: hp(2.5)
    },
    profilePic: {
        height: hp(14),
        width: hp(14),
        marginTop: hp(1.5),
        borderRadius: 100,
    },
    usernameText: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        marginTop: hp(1),
        letterSpacing: wp(0.1),
        fontSize: hp(2)
    },
    dividedAnswer: {
        height: hp(4),
        width: wp(17.8),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    numbers: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        letterSpacing: wp(0.1),
        fontSize: hp(3)
    },
    secondScreenView: {
        height: hp(77),
        width: wp(100),
        backgroundColor: '#00D9EF',
        alignItems: 'center'
    },
    allScoresContainer: {
        height: hp(22.5),
        width: wp(70)
    },
    scoreContainer: {
        height: hp(7.5),
        width: wp(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scoresText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2.5)
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: hp(0.1),
        width: wp(70)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.2),
        height: hp(0.1),
        borderColor: '#D9D9D9'
    },
    sinaviaScoreContainer: {
        height: hp(8),
        width: wp(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sinaviaScoreText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#EB6300',
        letterSpacing: wp(0.1),
        fontSize: hp(4)
    }
})