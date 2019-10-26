import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import AuthButton from '../../../../../components/authScreen/authButton'
import React from 'react'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    usersListContainer: {
        height: hp(35),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: '#ffffff',
        height: hp(67),
        width: wp(87.5),
        marginTop: hp(14),
        marginLeft: wp(6.25),
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeContainer: {
        height: hp(12),
        width: wp(87.5),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    gameCodeBox: {
        height: hp(10),
        width: wp(66),
        borderWidth: wp(0.5),
        borderRadius: 10,
        borderColor: '#707070',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeBoxLeftView: {
        height: hp(10),
        width: wp(10)
    },
    gameCodeBoxTextView: {
        height: hp(10),
        width: wp(46),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(7),
        letterSpacing: wp(1),
        color: '#5C5C5C'
    },
    gameCodeBoxRightView: {
        height: hp(10),
        width: wp(10),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    copyImage: {
        height: hp(3),
        width: hp(3),
        marginBottom: hp(1)
    },
    gameCodeInfoTextContainer: {
        height: hp(7.5),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(3),
        color: '#A8A8A8'
    },
    questionsNumberContainer: {
        height: hp(7.5),
        width: wp(66),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionsNumberText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4.5),
        color: '#5C5C5C',
        marginBottom: hp(1)
    },
    questionNumberPicker: {
        height: hp(6),
        width: wp(15),
        borderColor: '#707070',
        borderWidth: wp(0.5),
        borderRadius: 10,
        marginBottom: hp(1)
    },
    questionPickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    questionPickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    questionPickerDropdown: {
        height: hp(32),
        width: wp(15),
        borderColor: '#707070',
        borderWidth: wp(0.5),
        borderRadius: 10,
        marginTop: hp(0.5),
        marginRight: wp(-0.5)
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
        width: wp(41),
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
    },
    onlyCloseButtonContainer: {
        position: 'absolute',
        height: hp(6),
        width: wp(86),
        marginTop: hp(6),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    xLogo: {
        height: hp(4),
        width: hp(4)
    },
    quitView: {
        backgroundColor: '#ffffff',
        height: hp(20),
        width: wp(87.5),
        marginTop: hp(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10
    },
    areYouSureText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(4.5),
        color: '#5C5C5C'
    },
    yesOrNoButtonsContainer: {
        height: hp(10),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    leaderContainer: {
        width: wp(10)
    },
    leaderLogo: {
        resizeMode: 'contain',
        height: hp(6),
        width: wp(6)
    },
    modal: {
        flex: 1,
        backgroundColor: '#000000DE',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
})
