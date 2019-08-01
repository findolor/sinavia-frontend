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
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    headerTextWrapper: {
        height: hp(6),
        width: wp(88),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(9),
        color: '#00D9EF'
    },
    cardsScrollView: {
        height: hp(89),
        width: wp(87),
        marginTop: hp(11),
        marginLeft: wp(6.5),
        marginRight: wp(6.5),
        position: 'absolute'
    },
    card: {
        height: hp(30),
        width: wp(87),
        borderWidth: wp(0.6),
        borderColor: '#00D9EF',
        borderRadius: 30,
        marginBottom: hp(3)
    },
    contentContainerUp: {
        height: hp(4.5),
        width: wp(87),
        backgroundColor: '#00D9EF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 40
    },
    contentContainerDown: {
        height: hp(3),
        width: wp(87),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainerWrapper: {
        height: hp(7.5),
        width: wp(87),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(6.5),
        color: '#FFFFFF'
    },
    questionsContainer: {
        height: hp(22),
        width: wp(82),
        marginLeft: wp(2)
    },
    question: {
        height: hp(19),
        width: wp(30),
        borderWidth: wp(0.5),
        borderColor: '#E2871A',
        borderRadius: 15,
        marginTop: hp(1.35),
        marginRight: wp(5)
    }
})
