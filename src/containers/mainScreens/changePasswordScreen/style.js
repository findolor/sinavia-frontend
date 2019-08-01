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
    header: {
        height: hp(6),
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    saveButton: {
        height: hp(5),
        width: wp(22),
        backgroundColor: '#3EBB29',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#FFFFFF'
    },
    textInputsContainer: {
        height: hp(36),
        width: wp(89),
        marginTop: hp(1.5)
    },
    textInputContainer: {
        height: hp(12),
        width: wp(89),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInputView: {
        height: hp(7.5),
        width: wp(72),
        borderWidth: wp(0.5),
        borderRadius: 20,
        borderColor: '#C8C8C8'
    },
    textInputTitle: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        paddingVertical: hp(0),
        color: '#7B7B7B'
    },
    textInputTitleContainer: {
        height: hp(12),
        width: wp(17),
        justifyContent: 'center'
    }
})
