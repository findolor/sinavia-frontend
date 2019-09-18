import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    topContainer: {
        backgroundColor: '#3FC8D9',
        flex: 72,
        width: wp(100),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowOpacity: 1,
        shadowColor: '#adadad',
        shadowOffset: { width: wp(0), height: hp(0.7) },
        marginBottom: hp(1)
    },
    headerContainer: {
        flex: 14,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionContainer: {
        backgroundColor: '#ffffff',
        flex: 52,
        width: wp(84),
        marginLeft: wp(8),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionAndZoomButtonContainer: {
        flex: 6,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    questionInformation: {
        alignItems: 'center',
        height: hp(6),
        width: wp(70),
        justifyContent: 'center'
    },
    questionInformationText: {
        color: '#fff',
        fontFamily: 'Averta-Regular',
        fontSize: hp(3),
        fontWeight: '700'
    },
    dummyButtonContainer: {
        flex: 16,
        width: wp(100),
        justifyContent: 'space-evenly'
    },
    topButtonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: wp(100),
        height: hp(9),
        alignItems: 'center',
        marginBottom: hp(-1)
    },
    button: {
        borderWidth: 3,
        width: wp(27),
        height: hp(5.5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Averta-Regular',
        fontSize: hp(3),
        fontWeight: '700'
    },
    bottomButtonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: wp(100),
        height: hp(9),
        alignItems: 'center',
        paddingBottom: hp(1.5)
    },
    jokerContainer: {
        backgroundColor: '#F4F6FB',
        width: wp(100),
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: hp(1),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOpacity: 1,
        shadowColor: '#adadad',
        paddingTop: hp(1)
    },
    joker: {
        height: hp(3),
        width: hp(3),
        resizeMode: 'contain'
    },
    jokerAndTextContainer: {
        alignItems: 'center'
    },
    touchableJokerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    jokerText: {
        color: '#000',
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        fontWeight: '600'
    },
    questionStyle: {
        resizeMode: 'contain',
        height: hp(90),
        width: wp(90),
        flex: 1
    },
    userContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp(32)
    },
    userProfilePicture: {
        resizeMode: 'contain',
        height: hp(6),
        width: hp(6),
        borderRadius: 100
    },
    usernameContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    answersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    usernameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#fff',
        fontWeight: '800'
    },
    answersText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#fff',
        fontWeight: '600'
    },
    countdownContainer: {
        height: hp(13),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownInnerContainer: {
        height: hp(10),
        width: hp(10),
        borderWidth: hp(0.5),
        borderColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(6),
        color: '#fff',
        fontWeight: '800'
    },
    backButton: {
        resizeMode: 'contain',
        flex: 1
    },
    backButtonContainer: {
        position: 'absolute',
        paddingLeft: wp(4)
    },
    zoomButton: {
        resizeMode: 'contain',
        height: hp(7),
        width: wp(7)
    },
    zoomButtonContainer: {
        height: hp(6),
        width: wp(15),
        justifyContent: 'center'
    },
    questionModalContainer: {
        backgroundColor: '#000000d0',
        flex: 1
    },
    questionModalImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionModalStyle: {
        resizeMode: 'contain',
        height: hp(100),
        width: wp(100)
    },
    closeModalContainer: {
        position: 'absolute',
        paddingLeft: wp(85),
        paddingTop: hp(3)
    },
    closeModal: {
        height: hp(7),
        width: wp(7),
        resizeMode: 'contain'
    },
    spaceContainer: {
        height: hp(6),
        width: wp(15)
    }
})

export const countdownProps = {
    size: hp(2)
}
