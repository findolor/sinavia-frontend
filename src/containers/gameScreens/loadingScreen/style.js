import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export { hp, wp }

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backButtonContainer: {
        flex: 8,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1
    },
    backButton: {
        height: hp(3.5),
        width: hp(3.5)
    },
    animationView: {
        flex: 92,
        width: wp(100),
        justifyContent: 'center',
        backgroundColor: 'blue'
    }
})
