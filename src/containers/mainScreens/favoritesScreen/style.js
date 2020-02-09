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
    noResultsView: {
        flex: 90,
        width: wp(88),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp(10)
    },
    noResultsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#FF9900',
        textAlign: 'center',
        marginTop: hp(5)
    },
    noResultImg: {
        resizeMode: 'contain',
        height: hp(20)
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
        alignItems: 'flex-start'
    },
    headerText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(3.7),
        color: '#00D9EF'
    },
    subjectCardContainer: {
        height: hp(90),
        width: wp(85),
        marginStart: wp(5),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    contentContainerWrapper: {
        height: hp(7.5),
        width: wp(82),
        borderTopLeftRadius: hp(1.5),
        borderTopRightRadius: hp(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D9EF',
        marginTop: hp(1.5)
    },
    questionsContainer: {
        height: hp(75),
        width: wp(82),
        borderLeftWidth: hp(0.5),
        borderRightWidth: hp(0.5),
        borderBottomWidth: hp(0.5),
        borderColor: '#00D9EF',
        borderBottomLeftRadius: hp(1.5),
        borderBottomRightRadius: hp(1.5),
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    subjectQuestionCounterView: {
        height: hp(5.5),
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
    questionImgBorder: {
        height: hp(27),
        width: wp(36),
        borderWidth: hp(0.4),
        borderColor: '#FF9900',
        borderRadius: hp(1.5),
        marginTop: hp(1.35),
        marginLeft: wp(3),
        overflow: 'hidden'
    },
    question: {
        resizeMode: 'stretch',
        height: hp(25),
        marginTop: hp(1)
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
    questionSubjectNameView: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    questionInModalView: {
        flex: 65,
        width: wp(90),
        borderRadius: hp(3),
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    questionInModal: {
        resizeMode: 'contain',
        flex: 1,
        width: wp(90)
    },
    answerContainer: {
        height: hp(15),
        width: wp(25),
        alignItems: 'center',
        justifyContent: 'space-evenly'
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
        fontSize: hp(2),
        textAlign: 'center'
    },
    backButtonContainer: {
        height: hp(11),
        width: wp(17.5),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    questionNumberContainer: {
        height: hp(11),
        width: wp(75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareButtonView: {
        height: hp(11),
        width: wp(17.5),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    questionNumberText: {
        fontFamily: 'Averta-Semibold',
        letterSpacing: wp(0.1),
        fontSize: hp(5),
        color: 'white',
        textAlign: 'center'
    },
    backButtonImg: {
        height: hp(4),
        width: hp(4)
    },
    questionSubjectText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: 'white'
    }
})
