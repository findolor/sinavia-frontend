import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    imageContainer: {
        height: hp(21),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    allTextInputsContainer: {
        height: hp(57),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    toggleText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.7),
        color: '#7A7878'
    },
    gotoLoginText1: {
        fontFamily: 'Averta-Regular',
        color: '#7A7878',
        fontSize: hp(2),
        marginTop: hp(1),
        marginRight: wp(1)
    },
    gotoLoginText2: {
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
    }
})