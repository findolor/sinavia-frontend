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
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    userRow: {
        height: hp(8),
        width: wp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.3),
        borderBottomColor: '#CACACA'
    },
    userPicContainerInRow: {
        height: hp(8),
        width: wp(16),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(6.5),
        width: hp(6.5),
        borderRadius: 100
    },
    namesContainer: {
        height: hp(8),
        width: wp(72)
    },
    nameContainer: {
        height: hp(4),
        width: wp(72),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    usernameContainer: {
        height: hp(4),
        width: wp(72),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#2E313C',
        marginTop: hp(1),
        marginLeft: wp(3)
    },
    usernameText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: wp(4),
        color: '#FF9900',
        marginBottom: hp(0.5),
        marginLeft: wp(3)
    }
})