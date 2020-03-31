import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    scrollView: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    background: {
        height: hp(100),
        width: wp(100)
    },
    backgroundImgShadowView: {
        height: hp(100),
        width: wp(100),
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.45)'
    },
    logoContainer: {
        height: hp(42),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute'
    },
    logoImg: {
        resizeMode: 'contain',
        height: hp(31.5),
        marginBottom: hp(4)
    },
    resultsContainer: {
        height: hp(36),
        width: wp(87.8),
        backgroundColor: '#F2FEFF',
        marginTop: hp(42),
        marginLeft: wp(6.4),
        borderRadius: hp(4),
        borderWidth: hp(0.5),
        borderColor: '#FF9900',
        position: 'absolute',
        alignItems: 'center'
    },
    replayButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: hp(1.5),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainScreenButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: hp(1.5),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        fontSize: hp(2)
    },
    buttonsContainer: {
        height: hp(10),
        width: wp(100),
        marginTop: hp(81.6),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    slideView: {
        height: hp(10),
        width: wp(100),
        borderTopLeftRadius: hp(3),
        borderTopRightRadius: hp(3),
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
        marginTop: hp(1.5),
        letterSpacing: wp(0.1),
        fontSize: hp(2)
    },
    slideUpImg: {
        height: hp(2),
        width: hp(2),
        marginTop: hp(1.8)
    },
    answersContainer: {
        height: hp(12),
        width: wp(17.8),
        marginBottom: hp(4),
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    answerImg: {
        height: hp(4),
        width: hp(4)
    },
    profilePic: {
        height: hp(14),
        width: hp(14),
        marginTop: hp(1),
        borderRadius: 100,
        borderWidth: hp(0.5),
        borderColor: '#FF9900'
    },
    usernameText: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        marginTop: hp(1.25),
        fontSize: hp(1.85)
    },
    dividedAnswer: {
        height: hp(6),
        width: wp(45.8),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    numbers: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        marginLeft: wp(2),
        fontSize: hp(3.5)
    },
    secondScreenView: {
        height: hp(78),
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
    },
    scrollQuestionContainer: {
        height: hp(58),
        width: wp(100),
        backgroundColor: '#00D9EF',
        alignItems: 'center'
    },
    questionContainer: {
        backgroundColor: '#fff',
        height: hp(58),
        width: wp(90),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    questionStyle: {
        resizeMode: 'contain',
        height: hp(90),
        width: wp(90),
        flex: 1
    },
    questionNumberText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(4)
    },
    favAndAnswerContainer: {
        height: hp(13),
        width: wp(66),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    answerContainer: {
        height: hp(13),
        width: wp(30),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    favIconContainer: {
        height: hp(13),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center'
    },
    correctAnswer: {
        height: hp(6.5),
        width: hp(6.5),
        borderRadius: 100,
        marginTop: hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        marginBottom: hp(1.3),
        fontSize: hp(1.8)
    },
    favIcon: {
        resizeMode: 'contain',
        height: hp(7),
        width: hp(7),
        marginBottom: hp(1)
    },
    optionText: {
        fontFamily: 'Averta-Semibold',
        letterSpacing: wp(0.1),
        fontSize: hp(3.5)
    },
    logoText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(12),
        color: '#00D9EF'
    },
    courseTextView: {
        height: hp(12),
        width: wp(87.8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAndResultView: {
        height: hp(24),
        width: wp(87.8),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userView: {
        height: hp(24),
        width: wp(42),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    resultView: {
        height: hp(24),
        width: wp(45.8),
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: hp(1)
    },
    courseText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(4.5),
        color: '#FF9900',
        textAlign: 'center'
    },
    questionNumberContainer: {
        height: hp(7),
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    videoButton: {
        height: hp(5),
        width: wp(34),
        backgroundColor: '#FFFFFF',
        borderRadius: hp(3),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    solvingLogo: {
        height: hp(3.5),
        width: hp(2.8)
    },
    videoLogo: {
        height: hp(4),
        width: hp(4)
    },
    videoButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        color: '#00D9EF'
    }
})
