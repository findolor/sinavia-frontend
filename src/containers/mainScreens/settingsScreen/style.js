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
    saveButton: {
        height: hp(5),
        width: wp(22),
        backgroundColor: '#3EBB29',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#FFFFFF'
    },
    profileContainer: {
        height: hp(32),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    coverPhoto: {
        height: hp(30),
        width: wp(90),
        borderRadius: 30,
        marginTop: hp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        height: hp(18),
        width: hp(18),
        borderRadius: 100
    },
    profilePicView: {
        height: hp(18),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        height: hp(36),
        width: wp(89)
    },
    textInputContainer: {
        height: hp(12),
        width: wp(89),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInputView: {
        height: hp(7.5),
        width: wp(72),
        borderWidth: wp(0.5),
        borderRadius: 20,
        borderColor: '#C8C8C8'
    },
    textInputTitle: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        paddingVertical: hp(0),
        color: '#7B7B7B'
    },
    textInputTitleContainer: {
        height: hp(7.5),
        width: wp(17),
        justifyContent: 'center'
    },
    buttonsContainer: {
        height: hp(22),
        width: wp(89)
    },
    changePasswordButton: {
        height: hp(7.5),
        width: wp(89),
        borderRadius: 20,
        backgroundColor: '#00D9EF',
        marginTop: hp(1.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        height: hp(7.5),
        width: wp(89),
        borderRadius: 20,
        backgroundColor: '#CC3636',
        marginTop: hp(2.25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    changePasswordText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(5),
        paddingVertical: hp(0),
        color: '#FFFFFF'
    },
    logoutText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(5),
        paddingVertical: hp(0),
        color: '#FFFFFF'
    }
})
