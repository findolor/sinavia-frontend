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
        flex: 53,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 19,
        width: wp(100),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    spaceView: {
        flex: 2
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
        flex: 3,
        width: wp(85)
    },
    separatorLine: {
        borderWidth: hp(0.1),
        height: hp(0.1),
        width: wp(35),
        borderColor: '#9B9FA4'
    },
    separatorOrView: {
        height: hp(3),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    separatorOrText: {
        fontFamily: 'Averta-Semibold',
        color: '#9B9FA4',
        fontSize: hp(3),
        marginBottom: hp(0.5)
    }
})