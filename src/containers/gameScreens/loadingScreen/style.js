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
    }
})
