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
        flex: 6,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileContainer: {
        flex: 32,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        flex: 36,
        width: wp(89)
    },
    buttonsContainer: {
        flex: 22,
        width: wp(89)
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
    coverPhoto: {
        height: hp(30),
        width: wp(90),
        borderRadius: 30,
        marginTop: hp(0.5),
        alignItems: 'center'
    },
    profilePic: {
        height: hp(18),
        width: hp(18),
        borderRadius: 100,
        borderWidth: hp(0.3),
        borderColor: '#00D9EF',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden'
    },
    editImg: {
        height: hp(3.5),
        width: hp(3.5)
    },
    profilePicView: {
        height: hp(18),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputContainer: {
        height: hp(9),
        width: wp(89),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInputView: {
        height: hp(7.5),
        width: wp(70),
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
        width: wp(19),
        justifyContent: 'center'
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
    },
    editImgView: {
        height: hp(7),
        width: wp(80),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    editProfilePicView: {
        height: hp(16),
        width: hp(11),
        alignItems: 'flex-end'
    },
    textInputStyle: {
        fontFamily: 'Averta-Regular',
        height: hp(7),
        width: wp(72),
        paddingHorizontal: wp(3)
    },
    dateTimeTextStyle: {
        fontFamily: 'Averta-Regular',
        paddingHorizontal: wp(3),
        paddingTop: hp(2),
        fontSize: hp(2),
        color: '#7A7878'
    },
    shadowCoverView: {
        position: 'absolute',
        height: hp(30),
        width: wp(90),
        borderRadius: 30,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: 'center'
    }
})
