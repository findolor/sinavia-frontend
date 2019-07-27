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
    bottomBar: {
        height: hp(9),
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(91),
        flexDirection: 'row',
        position: 'absolute'
    },
    scrollViewContainer: {
        backgroundColor: 'green',
        alignItems: 'center'
    },
    cardsScrollView: {
        height: hp(53),
        width: wp(87),
        marginTop: hp(34),
        marginLeft: wp(6.5),
        marginRight: wp(6.5),
        position: 'absolute',
        backgroundColor: '#fcfcfc'
    },
    card: {
        height: hp(9),
        width: wp(87),
        borderWidth: wp(0.6),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginBottom: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#F7941E',
        fontSize: hp(3.3)
    },
    carouselContainer: {
        height: hp(25),
        marginTop: hp(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    header: {
        height: hp(7.5),
        width: wp(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fcfcfc'
    },
    picker: {
        height: hp(6),
        width: wp(30),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 10
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(50.5),
        width: wp(30),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 10,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    modalView: {
        backgroundColor: '#ffffff',
        height: hp(44),
        width: wp(87.5),
        marginTop: hp(15),
        borderColor: '#27AAE1',
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSubjectText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#F7941E',
        fontSize: hp(3.3)
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fcfcfc',
        height: hp(3),
        width: wp(75)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.2),
        height: hp(0.1),
        borderColor: '#D9D9D9'
    },
    gameModesContainer: {
        height: hp(30),
        width: wp(75),
        backgroundColor: 'red'
    },
    gameModeContainer: {
        height: hp(10),
        width: wp(75),
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    gameModeLogoContainer: {
        height: hp(10),
        width: wp(33),
        backgroundColor: 'white'
    },
    gameModeContextContainer: {
        height: hp(10),
        width: wp(42),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    gameModeContextText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        color: '#A8A8A8'
    },
    profilePic: {
        height: hp(5.8),
        width: hp(5.8),
        borderRadius: 100,
        marginLeft: wp(0)
    },
    notificationLogo: {
        height: hp(4),
        width: hp(4),
        marginRight: wp(0)
    },
    profilePicContainer: {
        height: hp(7.5),
        width: wp(20),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        height: hp(7.5),
        width: wp(60),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationLogoContainer: {
        height: hp(7.5),
        width: wp(20),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
