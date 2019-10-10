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
    tryAgainTextContainer: {
        flex: 2.4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    tryAgainText: {
        fontFamily: 'Averta-SemiBold',
        fontSize: hp(9),
        color: '#000000'
    },
    tryAgainButtonContainer: {
        flex: 2,
        alignItems: 'center'
    },
    networkErrorStyle: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.5)
    }
})
