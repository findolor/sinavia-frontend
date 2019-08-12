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
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../../../../services/navigationService'
import DropDown from '../../../../../components/mainScreen/dropdown/dropdown'
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
        this.props.room.onMessage.add(message => {
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
                        message.playerProps[this.props.client.id].isLeader ===
                        true
                            ? this.setState({ isClientLeader: true })
                            : this.setState({ isClientLeader: false })
                    })

                    this.setState({ groupRoomPlayerList: playerList })
                    return
                case 'start-match':
                    navigationReset('game', { isHardReset: true })
                    navigationPush(SCENE_KEYS.gameScreens.groupGame, {
                        room: this.props.room,
                        client: this.props.client
                    })
                    return
            }
        })
    }

    // Selected question amount is sent to the server
    questionAmountPicker(idx, value) {
        this.room.send({
            action: 'set-question-number',
            questionAmount: value
        })
    }

    groupGameReadyOnPress = () => {
        if (!this.state.isClientLeader) {
            this.props.room.send({
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

        this.props.room.send({
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
        this.props.room.leave()
        this.props.client.close()
        navigationReset('main')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity onPress={this.closeGroupGameOnPress}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    {!this.state.isClientLeader && (
                        <View style={styles.isJoinedRoomSubjectContainer}>
                            <Text style={styles.modalSubjectText}>
                                Paragrafta Anlam
                            </Text>
                        </View>
                    )}
                    {this.state.isClientLeader && (
                        <View style={styles.isLeaderContainer}>
                            <View style={styles.gameCodeContainer}>
                                <View style={styles.gameCodeBox}>
                                    <View style={styles.gameCodeBoxLeftView} />
                                    <View style={styles.gameCodeBoxTextView}>
                                        <Text
                                            style={styles.gameCodeText}
                                            selectable={true}
                                        >
                                            {this.props.roomCode}
                                        </Text>
                                    </View>
                                    <View style={styles.gameCodeBoxRightView}>
                                        <TouchableOpacity
                                            onPress={this.writeToClipboard}
                                        >
                                            <Image
                                                source={COPY_IMAGE}
                                                style={styles.copyImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.gameCodeInfoTextContainer}>
                                <Text style={styles.gameCodeInfoText}>
                                    Grup olarak oynamak için{' '}
                                </Text>
                                <Text style={styles.gameCodeInfoText}>
                                    yukarıdaki kodu arkadaşlarınla paylaş
                                </Text>
                            </View>
                            <View style={styles.questionsNumberContainer}>
                                <Text style={styles.questionsNumberText}>
                                    Soru Sayısı:{' '}
                                </Text>
                                <DropDown
                                    style={styles.questionNumberPicker}
                                    textStyle={styles.questionPickerText}
                                    dropdownTextStyle={
                                        styles.questionPickerDropdownText
                                    }
                                    dropdownStyle={
                                        styles.questionPickerDropdown
                                    }
                                    options={QUESTION_AMOUNTS_LIST}
                                    defaultValue={this.state.questionNumber}
                                    onSelect={(idx, value) =>
                                        this.questionAmountPicker(idx, value)
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
                                        style={styles.profilePicContainerinRow}
                                    >
                                        <Image
                                            source={{
                                                uri: item.profilePicture
                                            }}
                                            style={styles.userPic}
                                        />
                                    </View>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameText}>
                                            {item.username}
                                        </Text>
                                        <Text>{item.status}</Text>
                                    </View>
                                    {item.isLeader && (
                                        <View style={styles.leaderContainer}>
                                            <Image
                                                source={LEADER_LOGO}
                                                style={styles.leaderLogo}
                                            />
                                        </View>
                                    )}
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={styles.usersCounterContainer}>
                        <Text style={styles.usersCounterText}>
                            {Object.keys(this.state.groupRoomPlayerList).length}
                            /30
                        </Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText={
                        this.state.isClientLeader === true ? 'Başlat' : 'Hazır'
                    }
                    onPress={this.groupGameReadyOnPress}
                />
                <Modal visible={this.state.isQuitGameModalVisible}>
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
                                onPress={this.quitGameYes}
                            />
                            <AuthButton
                                height={hp(7)}
                                width={wp(42)}
                                color="#00D9EF"
                                buttonText="Hayır"
                                onPress={this.quitGameNo}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default JoinGroupRoom
