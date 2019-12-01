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
        height: hp(64),
        width: wp(87.8),
        backgroundColor: '#F2FEFF',
        marginTop: hp(17),
        marginLeft: wp(6.4),
        borderRadius: hp(4),
        position: 'absolute',
        alignItems: 'center'
    },
    replayButton: {
        height: hp(7),
        width: wp(23),
        borderRadius: hp(1.5),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(10)
    },
    newOpponentButton: {
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
        marginRight: wp(10),
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
        justifyContent: 'space-between',
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
    results1Container: {
        height: hp(21),
        width: wp(87.8),
        marginTop: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    results2Container: {
        height: hp(31),
        width: wp(80),
        marginTop: hp(1.4),
        backgroundColor: '#00D9EF',
        borderRadius: hp(3),
        alignItems: 'center'
    },
    levelUpContainer: {
        height: hp(52),
        width: wp(85),
        marginTop: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelUpText: {
        fontFamily: 'Averta-Bold',
        color: '#FF9900',
        fontSize: hp(7),
        textAlign: 'center'
    },
    levelUpText2: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        fontSize: hp(5),
        textAlign: 'center'
    },
    user1Container: {
        height: hp(21),
        width: wp(35.9),
        alignItems: 'center'
    },
    user2Container: {
        height: hp(21),
        width: wp(35.9),
        alignItems: 'center'
    },
    answersContainer: {
        height: hp(12),
        width: wp(16),
        marginBottom: hp(4),
        justifyContent: 'space-around',
        alignItems: 'center'
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
        borderWidth: hp(0.5),
        borderColor: '#FF9900'
    },
    usernameText: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        marginTop: hp(2),
        fontSize: hp(1.9)
    },
    dividedAnswer: {
        height: hp(4),
        width: wp(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    numbers: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        letterSpacing: wp(0.1),
        fontSize: hp(3)
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
        color: 'white',
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
    questionNumberContainer: {
        height: hp(5),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'center',
        marginTop: hp(1)
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
    levelProgressBarContainer: {
        height: hp(9),
        width: wp(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarView: {
        height: hp(5),
        width: wp(79),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: hp(1),
        backgroundColor: '#B0B0B0'
    },
    levelText: {
        fontFamily: 'Averta-Semibold',
        zIndex: 1,
        marginLeft: wp(1),
        fontSize: hp(2.5),
        color: 'white'
    },
    instantProgressView: {
        position: 'absolute',
        height: hp(5),
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: '#FF9900'
    },
    progressScoreView: {
        height: hp(4),
        width: wp(25),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    levelInProgressText: {
        fontFamily: 'Averta-Semibold',
        marginRight: wp(1),
        fontSize: hp(2.5),
        color: 'white'
    }
})
