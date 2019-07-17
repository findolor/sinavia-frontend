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
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
        backgroundColor: '#fcfcfc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        marginLeft: wp(4),
        fontSize: hp(2)
    },
    forgetPasswordContainer: {
        backgroundColor: '#fcfcfc',
        height: hp(6),
        width: wp(27),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: wp(4.5),
        marginBottom: wp(0.4)
    },
    eyeContainer: {
        backgroundColor: '#fcfcfc',
        height: hp(6),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1),
        marginBottom: wp(0.4)
    },
    forgetPasswordText: {
        fontFamily: 'Averta-Bold',
        color: '#00D9EF',
        fontSize: hp(2),
    }
})