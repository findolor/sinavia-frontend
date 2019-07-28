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
        height: hp(18),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    allTextInputsContainer: {
        height: hp(58),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInputBorderContainer: {
        height: hp(8.14),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggleContainer: {
        height: hp(5),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        flexDirection: 'row'
    },
    gotoLoginContainer: {
        height: hp(5.7),
        width: wp(85),
        borderColor: '#989696',
        backgroundColor: '#fcfcfc',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: '#fcfcfc',
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
    licenseTextContainer: {
        backgroundColor: '#fcfcfc',
        height: hp(5),
        width: wp(72),
        justifyContent: 'center',
        alignItems: 'center'
    },
    eyeContainer: {
        backgroundColor: '#fcfcfc',
        height: hp(6.5),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(66),
        marginBottom: wp(0.4),
        position: 'absolute'
    },
    textInput: {
        fontFamily: 'Averta-Regular',
        marginLeft: wp(4),
        fontSize: hp(2),
        color: '#7A7878'
    }
})
