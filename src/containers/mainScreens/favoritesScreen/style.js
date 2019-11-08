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
    modalView: {
        height: hp(100),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 6,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 90,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    headerTextWrapper: {
        height: hp(6),
        width: wp(68),
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnLogoContainer: {
        height: hp(6),
        width: wp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(9),
        color: '#00D9EF'
    },
    subjectCardContainer: {
        height: hp(90),
        width: wp(82),
        marginStart: wp(6.5),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    contentContainerWrapper: {
        height: hp(7.5),
        width: wp(82),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D9EF',
        marginTop: hp(2)
    },
    questionsContainer: {
        height: hp(73),
        width: wp(82),
        borderLeftWidth: wp(0.6),
        borderRightWidth: wp(0.6),
        borderBottomWidth: wp(0.6),
        borderColor: '#00D9EF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    subjectQuestionCounterView: {
        height: hp(7.5),
        width: wp(82),
        justifyContent: 'center',
        alignItems: 'center'
    },
    subjectQuestionCounterText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(3),
        color: '#FF9900'
    },
    contentText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(6.5),
        color: '#FFFFFF'
    },
    question: {
        height: hp(27),
        width: wp(36),
        borderWidth: wp(0.5),
        borderColor: '#00D9EF',
        borderRadius: 10,
        marginTop: hp(1.35),
        marginLeft: wp(3)
    },
    modalHeader: {
        flex: 11,
        width: wp(100),
        backgroundColor: '#00D9EF',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalFooter: {
        flex: 15,
        width: wp(100),
        backgroundColor: '#00D9EF',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    galleryContainer: {
        flex: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D9EF'
    },
    galleryView: {
        flex: 1,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionInModalView: {
        flex: 1,
        width: wp(90),
        borderRadius: 30,
        backgroundColor: 'white'
    },
    questionInModal: {
        resizeMode: 'contain',
        flex: 1,
        width: wp(90)
    },
    answerContainer: {
        height: hp(15),
        width: wp(35),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    favIconContainer: {
        height: hp(15),
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    correctAnswer: {
        height: hp(7),
        width: hp(7),
        marginTop: hp(1.5),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favIcon: {
        resizeMode: 'contain',
        marginTop: hp(1.5),
        height: hp(7),
        width: hp(7)
    },
    optionText: {
        fontFamily: 'Averta-Semibold',
        letterSpacing: wp(0.1),
        fontSize: hp(3.5)
    },
    answerText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        marginBottom: hp(1.3),
        fontSize: hp(2)
    },
    backButtonContainer: {
        height: hp(11),
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    questionNumberContainer: {
        height: hp(11),
        width: wp(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButtonView: {
        height: hp(11),
        width: wp(25),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    questionNumberText: {
        fontFamily: 'Averta-Semibold',
        letterSpacing: wp(0.1),
        fontSize: hp(5),
        color: 'white'
    },
    backButtonImg: {
        height: hp(4),
        width: hp(4)
    },
})
