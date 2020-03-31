import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
        flexDirection: 'column'
    },
    imageContainer: {
        flex: 46,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    allTextInputsContainer: {
        flex: 25,
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toggleContainer: {
        flex: 7,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    authButtonView: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(100)
    },
    gotoLoginContainer: {
        flex: 11,
        width: wp(85),
        borderColor: '#989696',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: wp(7.5)
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    toggleText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.7),
        color: '#7A7878'
    },
    gotoLoginTextFirst: {
        fontFamily: 'Averta-Regular',
        color: '#7A7878',
        fontSize: hp(2),
        marginTop: hp(1),
        marginRight: wp(1)
    },
    gotoLoginTextSecond: {
        fontFamily: 'Averta-Regular',
        color: '#00D9EF',
        fontSize: hp(2),
        marginTop: hp(1),
        marginRight: wp(1)
    },
    switchView: {
        height: hp(7),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    licenseTextContainer: {
        height: hp(7),
        width: wp(70),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    eyeContainer: {
        height: hp(7),
        width: wp(15),
        marginLeft: wp(66),
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute'
    },
    textInput: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        height: hp(7),
        width: wp(85),
        paddingHorizontal: wp(4),
        color: '#2E313C'
    },
    backButtonContainer: {
        height: hp(10),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'absolute',
        zIndex: 1
    },
    backButton: {
        height: hp(3.5),
        width: hp(3.5),
        marginLeft: wp(8)
    },
    shadowView: {
        flex: 1,
        backgroundColor: '#000000DE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    licenceView: {
        height: hp(60),
        width: wp(85),
        borderTopWidth: hp(0.7),
        borderLeftWidth: hp(0.7),
        borderRightWidth: hp(0.7),
        borderColor: '#00D9EF',
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2),
        backgroundColor: 'white'
    },
    acceptLicenceButton: {
        height: hp(8),
        width: wp(85),
        borderBottomLeftRadius: hp(2),
        borderBottomRightRadius: hp(2),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptLicenceText: {
        fontFamily: 'Averta-Semibold',
        color: 'white',
        fontSize: hp(3)
    }
})
