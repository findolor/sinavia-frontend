import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export { hp, wp }

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    appLogo: {
        resizeMode: 'contain',
        height: hp(40),
        width: wp(40)
    },
    logoContainer: {
        paddingLeft: wp(5)
    },
    sinaviaText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(14),
        color: '#00D9EF'
    },
    tryAgainImgContainer: {
        position: 'absolute',
        height: hp(32),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    tryAgainTextContainer: {
        position: 'absolute',
        height: hp(23),
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: hp(32)
    },
    tryAgainButtonContainer: {
        position: 'absolute',
        height: hp(25),
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(55)
    },
    tryAgainText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(4),
        color: '#2E313C',
        textAlign: 'center'
    },
    networkErrorStyle: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.5)
    },
    connectionErrorShadowImg: {
        position: 'absolute',
        height: hp(80),
        width: wp(100)
    },
    connectionErrorColoredImg: {
        position: 'absolute',
        height: hp(18),
        width: hp(18)
    }
})
