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
        paddingLeft: wp(6),
        paddingTop: hp(3),
        zIndex: 1
    },
    backButton: {
        height: hp(3.5),
        width: hp(3.5)
    }
})
