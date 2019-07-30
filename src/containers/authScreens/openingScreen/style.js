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
    imageContainer: {
        height: hp(55),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        height: hp(18),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    sinaviaText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(12),
        color: '#00D9EF'
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(0),
        backgroundColor: '#fcfcfc',
        height: hp(3),
        width: wp(85)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.1),
        height: hp(0.1),
        borderColor: '#9B9FA4'
    },
    separatorOr: {
        fontFamily: 'Averta-Semibold',
        color: '#9B9FA4',
        marginHorizontal: 8
    }
})
