import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        flex:1,
        width: wp(100)
    },
    shadowView: {
        flex: 1,
        width: wp(100),
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoView: {
        height: hp(20),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1.5)
    },
    textsView: {
        height: hp(18),
        width: wp(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(1.5)
    },
    logoBorderView: {
        height: hp(19),
        width: hp(19),
        borderRadius: hp(100),
        borderWidth: hp(0.7),
        borderColor: '#FF9900',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImg: {
        resizeMode: 'contain',
        height: hp(12)
    },
    courseText: {
        color: '#fff',
        fontFamily: 'Averta-Bold',
        fontSize: hp(4.5)
    },
    subjectText: {
        color: '#fff',
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(4)
    },
    questionCounterText: {
        color: '#FF9900',
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3)
    }
})