import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    Modal
} from 'react-native'
import AuthButton from '../../../../../components/authScreen/authButton'
import styles from './style'
import {
    navigationReplace,
    navigationReset,
    SCENE_KEYS
} from '../../../../../services/navigationService'
import DropDown from '../../../../../components/mainScreen/dropdown/dropdown'
import { connect } from 'react-redux'
import { appActions } from '../../../../../redux/app/actions'
import { gameEnergyServices } from '../../../../../sagas/gameEnergy'
// Styling imports
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Image imports
const CLOSE_BUTTON = require('../../../../../assets/closeButton.png')
const LEADER_LOGO = require('../../../../../assets/mainScreens/groupLeaderSword.png')
const COPY_IMAGE = require('../../../../../assets/mainScreens/copy.png')

// Question amounts that can be taken
const QUESTION_AMOUNTS_LIST = ['5', '10', '15', '20']

class JoinGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Group player list
            groupRoomPlayerList: [],
            // Quit modal visible variable
            isQuitGameModalVisible: false,
            // Variable for checking leader status
            isClientLeader: false,
            // Group game question number
            questionNumber: '5'
        }
    }

    componentDidMount() {
        this.props.joinGameParams.room.onMessage.add(message => {
            switch (message.action) {
                case 'player-props':
                    const playerIds = Object.keys(message.playerProps)

                    playerList = []

                    playerIds.forEach(element => {
                        if (message.playerProps[element].readyStatus) {
                            playerList.push({
                                username: message.playerProps[element].username,
                                id: element,
                                profilePicture:
                                    message.playerProps[element].profilePicture,
                                status: 'Hazır',
                                isLeader: message.playerProps[element].isLeader
                            })
                        } else {
                            playerList.push({
                                username: message.playerProps[element].username,
                                id: element,
                                profilePicture:
                                    message.playerProps[element].profilePicture,
                                status: 'Bekleniyor',
                                isLeader: message.playerProps[element].isLeader
                            })
                        }
                        message.playerProps[this.props.joinGameParams.client.id]
                            .isLeader === true
                            ? this.setState({ isClientLeader: true })
                            : this.setState({ isClientLeader: false })
                    })

                    this.setState({ groupRoomPlayerList: playerList })
                    break
                case 'start-match':
                    this.props.joinGameParams.room.removeAllListeners()

                    /* if (this.props.clientInformation.isPremium) {
                        navigationReset('game', { isHardReset: true })
                        navigationReplace(SCENE_KEYS.gameScreens.groupGame, {
                            room: this.props.joinGameParams.room,
                            client: this.props.joinGameParams.client,
                            groupRoomPlayerList: this.state.groupRoomPlayerList
                        })
                    } else {
                        gameEnergyServices
                            .subtractGameEnergy(
                                this.props.clientToken,
                                this.props.clientDBId
                            )
                            .then(() => {
                                // Removing one energy when the match starts
                                this.props.removeOneEnergy()

                                navigationReset('game', { isHardReset: true })
                                navigationReplace(
                                    SCENE_KEYS.gameScreens.groupGame,
                                    {
                                        room: this.props.joinGameParams.room,
                                        client: this.joinGameParams.client,
                                        groupRoomPlayerList: this.state
                                            .groupRoomPlayerList
                                    }
                                )
                            })
                            .catch(error => {
                                console.log(error)
                                this.shutdownRoutine()
                            })
                    } */

                    navigationReset('game', { isHardReset: true })
                    navigationReplace(SCENE_KEYS.gameScreens.groupLoading, {
                        room: this.props.joinGameParams.room,
                        client: this.props.joinGameParams.client,
                        groupRoomPlayerList: this.state.groupRoomPlayerList
                    })
                    break
            }
        })
    }

    // Selected question amount is sent to the server
    questionAmountPicker(idx, value) {
        this.props.joinGameParams.room.send({
            action: 'set-question-number',
            questionAmount: value
        })
    }

    groupGameReadyOnPress = () => {
        if (!this.state.isClientLeader) {
            this.props.joinGameParams.room.send({
                action: 'ready-status'
            })
        } else {
            this.startGroupGameOnPress()
        }
    }

    startGroupGameOnPress = () => {
        const playerListLenght = Object.keys(this.state.groupRoomPlayerList)
            .length

        let readyCount = 0

        this.state.groupRoomPlayerList.forEach(player => {
            if (player.status === 'Hazır') readyCount++
        })

        if (readyCount !== playerListLenght || playerListLenght === 1) return

        this.props.joinGameParams.room.send({
            action: 'start-match'
        })
    }

    closeGroupGameOnPress = () => {
        this.setState({ isQuitGameModalVisible: true })
    }

    quitGameNo = () => {
        this.setState({ isQuitGameModalVisible: false })
    }

    quitGameYes = () => {
        this.shutdownRoutine()
    }

    shutdownRoutine = () => {
        this.props.joinGameParams.room.leave()
        this.props.joinGameParams.client.close()
        navigationReset('main')
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isQuitGameModalVisible === false && (
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={this.closeGroupGameOnPress}
                            style={{ height: hp(120), width: wp(100) }}
                        >
                            <View style={styles.modalView}>
                                {!this.state.isClientLeader && (
                                    <View
                                        style={
                                            styles.isJoinedRoomSubjectContainer
                                        }
                                    >
                                        <Text style={styles.modalSubjectText}>
                                            Paragrafta Anlam
                                        </Text>
                                    </View>
                                )}
                                {this.state.isClientLeader && (
                                    <View style={styles.isLeaderContainer}>
                                        <View style={styles.gameCodeContainer}>
                                            <View style={styles.gameCodeBox}>
                                                <View
                                                    style={
                                                        styles.gameCodeBoxLeftView
                                                    }
                                                />
                                                <View
                                                    style={
                                                        styles.gameCodeBoxTextView
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.gameCodeText
                                                        }
                                                        selectable={true}
                                                    >
                                                        {
                                                            this.props
                                                                .joinGameParams
                                                                .roomCode
                                                        }
                                                    </Text>
                                                </View>
                                                <View
                                                    style={
                                                        styles.gameCodeBoxRightView
                                                    }
                                                >
                                                    <TouchableOpacity
                                                        onPress={
                                                            this
                                                                .writeToClipboard
                                                        }
                                                    >
                                                        <Image
                                                            source={COPY_IMAGE}
                                                            style={
                                                                styles.copyImage
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={
                                                styles.gameCodeInfoTextContainer
                                            }
                                        >
                                            <Text
                                                style={styles.gameCodeInfoText}
                                            >
                                                Grup olarak oynamak için{' '}
                                            </Text>
                                            <Text
                                                style={styles.gameCodeInfoText}
                                            >
                                                yukarıdaki kodu arkadaşlarınla
                                                paylaş
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.questionsNumberContainer
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.questionsNumberText
                                                }
                                            >
                                                Soru Sayısı:{' '}
                                            </Text>
                                            <DropDown
                                                style={
                                                    styles.questionNumberPicker
                                                }
                                                textStyle={
                                                    styles.questionPickerText
                                                }
                                                dropdownTextStyle={
                                                    styles.questionPickerDropdownText
                                                }
                                                dropdownStyle={
                                                    styles.questionPickerDropdown
                                                }
                                                options={QUESTION_AMOUNTS_LIST}
                                                defaultValue={
                                                    this.state.questionNumber
                                                }
                                                onSelect={(idx, value) =>
                                                    this.questionAmountPicker(
                                                        idx,
                                                        value
                                                    )
                                                }
                                            />
                                        </View>
                                    </View>
                                )}
                                <FlatList
                                    data={this.state.groupRoomPlayerList}
                                    vertical={true}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.userRow}>
                                                <View
                                                    style={
                                                        styles.profilePicContainerinRow
                                                    }
                                                >
                                                    <Image
                                                        source={{
                                                            uri:
                                                                item.profilePicture
                                                        }}
                                                        style={styles.userPic}
                                                    />
                                                </View>
                                                <View
                                                    style={styles.nameContainer}
                                                >
                                                    <Text
                                                        style={styles.nameText}
                                                    >
                                                        {item.username}
                                                    </Text>
                                                    <Text>{item.status}</Text>
                                                </View>
                                                {item.isLeader && (
                                                    <View
                                                        style={
                                                            styles.leaderContainer
                                                        }
                                                    >
                                                        <Image
                                                            source={LEADER_LOGO}
                                                            style={
                                                                styles.leaderLogo
                                                            }
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                                <View style={styles.usersCounterContainer}>
                                    <Text style={styles.usersCounterText}>
                                        {
                                            Object.keys(
                                                this.state.groupRoomPlayerList
                                            ).length
                                        }
                                        /30
                                    </Text>
                                </View>
                            </View>
                            <AuthButton
                                marginTop={hp(83.5)}
                                marginLeft={wp(6.25)}
                                height={hp(7)}
                                width={wp(87.5)}
                                color="#00D9EF"
                                buttonText={
                                    this.state.isClientLeader === true
                                        ? 'Başlat'
                                        : 'Hazır'
                                }
                                borderRadius={10}
                                onPress={this.groupGameReadyOnPress}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {this.state.isQuitGameModalVisible === true && (
                    <View style={styles.modal}>
                        <TouchableOpacity
                            style={{ height: hp(120), width: wp(100) }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.quitView}>
                                    <Text style={styles.areYouSureText}>
                                        Odadan çıkış yapmak istediğine
                                    </Text>
                                    <Text style={styles.areYouSureText}>
                                        emin misin?
                                    </Text>
                                </View>
                                <View style={styles.yesOrNoButtonsContainer}>
                                    <AuthButton
                                        height={hp(7)}
                                        width={wp(42)}
                                        color="#00D9EF"
                                        buttonText="Evet"
                                        borderRadius={10}
                                        onPress={this.quitGameYes}
                                    />
                                    <AuthButton
                                        height={hp(7)}
                                        width={wp(42)}
                                        color="#00D9EF"
                                        buttonText="Hayır"
                                        borderRadius={10}
                                        onPress={this.quitGameNo}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    //removeOneEnergy: () => dispatch(appActions.removeOneEnergy())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGroupRoom)
