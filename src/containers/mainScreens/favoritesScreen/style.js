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
        width: wp(88)
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
    cardsScrollView: {
        flex: 1,
        width: wp(87)
    },
    card: {
        height: hp(32),
        width: wp(87),
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: hp(1),
        alignItems: 'center'
    },
    contentContainerWrapper: {
        height: hp(7.5),
        width: wp(87),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D9EF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    questionsContainer: {
        height: hp(22.5),
        width: wp(87),
        paddingHorizontal: wp(3),
        borderWidth: wp(0.6),
        borderColor: '#00D9EF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    contentText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(6.5),
        color: '#FFFFFF'
    },
    question: {
        height: hp(19),
        width: wp(30),
        borderWidth: wp(0.3),
        borderColor: '#00D9EF',
        borderRadius: 15,
        marginTop: hp(1.35),
        marginRight: wp(5)
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
        width: wp(90),
        backgroundColor: 'white',
        borderRadius: 30
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
