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
    tabbarContainer: {
        height: hp(7.5),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    generalNotificationsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderWidth: wp(0.5),
        borderColor: '#FF9900',
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsRequestsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderWidth: wp(0.5),
        borderColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    tabbarGeneralNotificationsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#FFFFFF'
    },
    tabbarFriendsRequestsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#2E313C'
    },
    userRow: {
        height: hp(8),
        width: wp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
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
    nameContainer: {
        height: hp(8),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4.3),
        color: '#5C5C5C'
    },
    friendshipButtonsContainer: {
        height: hp(8),
        width: wp(22),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    friendshipButtons: {
        height: hp(4),
        width: hp(4)
    }
})
