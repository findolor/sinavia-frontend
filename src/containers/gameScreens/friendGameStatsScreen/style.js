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
        height: hp(58),
        width: wp(87.8),
        backgroundColor: '#F2FEFF',
        marginTop: hp(21.44),
        marginLeft: wp(6.4),
        borderRadius: hp(4),
        position: 'absolute',
        alignItems: 'center',
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
        letterSpacing: wp(0.1),
        fontSize: hp(1.8)
    },
    buttonsContainer: {
        height: hp(10),
        width: wp(100),
        marginTop: hp(81.6),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    user1Container: {
        height: hp(21),
        width: wp(43.9),
        alignItems: 'center'
    },
    user2Container: {
        height: hp(21),
        width: wp(43.9),
        alignItems: 'center'
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
        width: hp(4),
        position: 'absolute'
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
        height: hp(6.3),
        width: wp(87.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberContainer: {
        height: hp(6.3),
        width: wp(43.75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    numbers: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        letterSpacing: wp(0.1),
        fontSize: hp(4)
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
    userPicsContainer: {
        height: hp(21),
        width: wp(87.8),
        marginTop: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    resultsAndStatisticsContainer: {
        height: hp(35),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    versusGameStatsBox: {
        height: hp(16),
        width: wp(87.5),
        alignItems: 'center'
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
    versusGameTitleText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#2E313C'
    },
    versusGameTotalContainer: {
        height: hp(5),
        width: wp(41),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    versusTotalText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#00D9EF'
    },
    versusTotalCounter: {
        fontFamily: 'Averta-SemiboldItalic',
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
