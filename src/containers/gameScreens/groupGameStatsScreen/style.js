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
    buttonsContainer: {
        height: hp(10),
        width: wp(100),
        marginTop: hp(81.6),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        fontSize: hp(2)
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
        alignItems: 'center'
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
        borderWidth: hp(0.5),
        borderColor: '#FF9900',
        borderRadius: 100
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
        justifyContent: 'space-evenly',
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
        alignItems: 'center',
        backgroundColor: 'white'
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
        fontSize: hp(3.5),
        color: '#00D9EF'
    },
    userRow: {
        height: hp(7),
        width: wp(82),
        flexDirection: 'row',
        borderTopWidth: wp(0.5),
        borderTopColor: '#CACACA'
    },
    orderContainer: {
        height: hp(7),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        height: hp(7),
        width: wp(43),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    optionsContainer: {
        height: hp(7),
        width: wp(27),
        flexDirection: 'row'
    },
    optionContainer: {
        height: hp(7),
        width: wp(9),
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderNumberText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#2E313C',
        fontSize: hp(3.5)
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        color: '#2E313C',
        fontSize: hp(2.5)
    },
    optionCounterText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#FF9900',
        fontSize: hp(3.5)
    },
    resultsContainerHeader: {
        height: hp(6),
        width: wp(82),
        flexDirection: 'row'
    },
    optionsImg: {
        height: hp(3),
        width: hp(3)
    },
    orderHeaderText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        color: '#FF9900',
        fontSize: hp(3)
    },
    nameHeaderText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        color: '#FF9900',
        fontSize: hp(3)
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
    },
    reportContainer: {
        position: 'absolute',
        height: hp(4.5),
        width: wp(90),
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    reportIcon: {
        height: hp(3.5),
        width: hp(4.12)
    },
    reportView: {
        backgroundColor: '#ffffff',
        height: hp(30),
        width: wp(90),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10
    },
    areYouSureText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(4.5),
        color: '#5C5C5C',
        textAlign: 'center'
    },
    yesOrNoButtonsContainer: {
        height: hp(9),
        width: wp(90),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    reportOptionView: {
        height: hp(5),
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center'
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
    checkIcon: {
        height: hp(2.5),
        width: hp(2.5)
    },
    reportOptionText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.3),
        color: '#000000',
        marginLeft: wp(2)
    }
})
