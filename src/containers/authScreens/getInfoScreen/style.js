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
        flex: 41,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    compulsoryTextContainer: {
        flex: 5,
        width: wp(85),
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    allTextInputsContainer: {
        flex: 33,
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    authButtonView:{
        flex: 17,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp(100),
    },
    textInputContainer: {
        height: hp(7),
        width: wp(85),
        borderWidth: wp(0.3),
        borderRadius: 10,
        borderColor: '#989696',
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
    },
    compulsoryText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.75),
        color: '#7A7878',
        marginBottom: hp(1)
    }
})