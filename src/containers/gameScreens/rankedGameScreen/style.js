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
        height: hp(72),
        width: wp(100),
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    headerContainer: {
        height: hp(12),
        marginTop: hp(3.7),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    questionContainer: {
        backgroundColor: '#fff',
        height: hp(52),
        marginHorizontal: wp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionInformation: {
        alignItems: 'center',
        paddingTop: hp(1)
    },
    questionInformationText: {
        color: '#fff',
        fontFamily: 'Averta-Regular',
        fontSize: wp(4),
        fontWeight: '700'
    },
    buttonContainer: {
        height: hp(18),
        backgroundColor: '#ee00ee'
    },
    topButtonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: wp(100),
        height: hp(9),
        alignItems: 'center',
        paddingTop: hp(1)
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
        fontSize: wp(5),
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
        backgroundColor: '#fff',
        width: wp(100),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    joker: {
        height: hp(6),
        width: hp(6),
        backgroundColor: '#f4f6fb',
        borderRadius: 100
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
        width: wp(25)
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
        fontSize: wp(4),
        color: '#fff',
        fontWeight: '800'
    },
    answersText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#fff',
        fontWeight: '600'
    },
    countdownContainer: {
        height: hp(9),
        width: hp(9),
        backgroundColor: '#fff',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(1)
    },
    countdownInnerContainer: {
        height: hp(7.5),
        width: hp(7.5),
        backgroundColor: '#3FC8D9',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(8),
        color: '#fff',
        fontWeight: '800'
    },
    backButton: {
        resizeMode: 'contain',
        flex: 1
    },
    backButtonContainer: {
        position: 'absolute',
        paddingLeft: wp(4),
        paddingTop: hp(3)
    },
    zoomButton: {
        resizeMode: 'contain',
        height: hp(7),
        width: wp(7)
    },
    zoomButtonContainer: {
        position: 'absolute',
        paddingLeft: wp(84),
        paddingTop: hp(66.3)
    }
})

export const countdownProps = {
    size: wp(4)
}
