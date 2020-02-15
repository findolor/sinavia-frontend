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
        flex: 49,
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
        flex: 7,
        width: wp(85)
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
        flex: 2,
        width: wp(85)
    },
    separatorLine: {
        borderWidth: hp(0.1),
        height: hp(0.1),
        width: wp(85),
        borderColor: '#9B9FA4'
    },
    oauthInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.7),
        color: '#7A7878',
        textAlign: 'center'
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
        borderWidth: hp(0.7),
        borderColor: '#00D9EF',
        borderRadius: hp(2),
        backgroundColor: 'white'
    }
})
