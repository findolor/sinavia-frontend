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
        flex: 55,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputsContainer: {
        flex: 10,
        width: wp(100),
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 23,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textContainer: {
        flex: 8,
        width: wp(85),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: wp(7.5)
    },
    textStyle: {
        fontFamily: 'Averta-Regular',
        color: '#8A8888',
        fontSize: hp(2)
    }
})