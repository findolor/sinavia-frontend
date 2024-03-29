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
        flex: 6,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spaceView: {
        flex: 1.5
    },
    flatListView: {
        flex: 88.5,
        width: wp(88)
    },
    noResultsView: {
        flex: 88.5,
        width: wp(88),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp(10)
    },
    noResultsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#FF9900',
        textAlign: 'center',
        marginTop: hp(5)
    },
    noResultImg: {
        resizeMode: 'contain',
        height: hp(20)
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    headerTextWrapper: {
        height: hp(6),
        width: wp(78),
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnLogoContainer: {
        height: hp(6),
        width: wp(10),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(9),
        color: '#00D9EF'
    },
    searchBar: {
        height: hp(5),
        width: wp(75),
        borderRadius: hp(10),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInputView: {
        height: hp(4),
        width: wp(70),
        justifyContent: 'center',
        marginLeft: wp(2.7)
    },
    searchLogoContainer: {
        height: hp(3.8),
        width: wp(7),
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBarText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#2E313C'
    },
    searchBarLogo: {
        height: hp(2.7),
        width: hp(2.7),
        marginRight: wp(3)
    },
    userRow: {
        height: hp(10.5),
        width: wp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA',
        marginBottom: hp(1)
    },
    userPicContainerInRow: {
        height: hp(10.5),
        width: wp(14),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    userPic: {
        height: hp(6.5),
        width: hp(6.5),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        borderRadius: 100
    },
    nameContainer: {
        height: hp(10.5),
        width: wp(74),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.4),
        color: '#5C5C5C',
        paddingLeft: wp(2)
    },
    userNameText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2.5),
        color: '#FF9900',
        paddingLeft: wp(2)
    }
})
