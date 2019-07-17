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
        height: hp(55),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        height: hp(20),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        height: hp(22),
        width: wp(100),
        backgroundColor: '#fcfcfc',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: '#fcfcfc',
        flexDirection: 'row'
    },
    textInput: {
        marginLeft: wp(4),
        fontSize: hp(2)
    },
    forgetPasswordText: {
        fontFamily: 'Averta-Bold',
        color: '#00D9EF',
        fontSize: hp(2),
        marginTop: hp(1.85),
        marginLeft: wp(40)
    }
})