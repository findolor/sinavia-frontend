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
        flex: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 20,
        width: wp(100),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    sinaviaText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(12),
        color: '#00D9EF'
    },
    separatorContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(0),
        flex: 1,
        width: wp(85)
    },
    separatorLine: {
        borderWidth: wp(0.1),
        height: hp(0.1),
        width: wp(35),
        borderColor: '#9B9FA4'
    },
    separatorOr: {
        fontFamily: 'Averta-Semibold',
        color: '#9B9FA4',
        marginBottom: hp(0.25)
    }
})