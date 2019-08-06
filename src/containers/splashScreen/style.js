import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})
