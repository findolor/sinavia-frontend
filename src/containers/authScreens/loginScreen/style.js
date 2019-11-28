import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    imageContainer: {
        flex: 55,
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        flex: 20,
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 21,
        width: wp(100),
        justifyContent: 'space-around',
        alignItems: 'center'
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
    textInput: {
        height: hp(7),
        width: wp(85),
        paddingHorizontal: wp(4),
        fontSize: hp(2),
        color: '#2E313C'
    },
    forgetPasswordContainer: {
        height: hp(6),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: wp(54),
        marginBottom: wp(0.4),
        position: 'absolute'
    },
    eyeContainer: {
        height: hp(7),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: wp(66),
        position: 'absolute'
    },
    eyeImg: {
        height: hp(3),
        width: hp(9),
    },
    forgetPasswordText: {
        fontFamily: 'Averta-Bold',
        color: '#00D9EF',
        fontSize: hp(2)
    }
})
