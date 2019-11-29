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
        flex: 8,
        width: wp(88),
        flexDirection: 'row'
    },
    flatListContainer: {
        flex: 88,
        width: wp(88),
    },
    noResultsView: {
        flex: 88,
        justifyContent: 'center'
    },
    returnLogoContainer: {
        height: hp(6),
        width: wp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    headerTextWrapper: {
        height: hp(6),
        width: wp(68),
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#00D9EF',
        marginTop: hp(1),
        marginLeft: wp(3)
    },
    searchInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.5),
        color: '#00D9EF',
        marginBottom: hp(0.5),
        marginLeft: wp(3)
    },
    userRow: {
        height: hp(10.5),
        width: wp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.3),
        borderBottomColor: '#CACACA'
    },
    userPicContainerInRow: {
        height: hp(10.5),
        width: wp(16),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(6.5),
        width: hp(6.5),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        borderRadius: hp(100)
    },
    namesContainer: {
        height: hp(10.5),
        width: wp(72),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.4),
        color: '#2E313C',
        marginTop: hp(1),
        marginLeft: wp(3)
    },
    usernameText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(2.5),
        color: '#FF9900',
        marginBottom: hp(0.5),
        marginLeft: wp(3)
    }
})
