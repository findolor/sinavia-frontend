import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textView: {
        flex: 28,
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    wheelView: {
        flex: 72,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(4.3),
        textAlign: 'center',
        color: '#FF9900'
    }
})
