import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000DE'
    },
    usersCounterText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    onlyCloseButtonContainer: {
        height: hp(6),
        width: wp(86),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    xLogo: {
        height: hp(4),
        width: hp(4)
    },
    modalView: {
        backgroundColor: '#ffffff',
        height: hp(67),
        width: wp(87.5),
        marginTop: hp(2),
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSubjectText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#F7941E',
        marginTop: hp(1),
        fontSize: hp(3.3)
    },
    isJoinedRoomSubjectContainer: {
        height: hp(9),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userRow: {
        height: hp(6),
        width: wp(66),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA'
    },
    profilePicContainerinRow: {
        height: hp(6),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(5),
        width: hp(5),
        borderRadius: 100
    },
    nameContainer: {
        height: hp(6),
        width: wp(51),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    usersCounterContainer: {
        height: hp(5),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    usersCounterText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4),
        color: '#5C5C5C'
    }
})
