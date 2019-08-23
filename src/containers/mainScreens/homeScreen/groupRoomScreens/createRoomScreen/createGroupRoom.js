import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    Modal
} from 'react-native'
import DropDown from '../../../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../../../components/authScreen/authButton'
import styles from './style'
import {
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../../../../services/navigationService'
import { connect } from 'react-redux'
// Colyseus game engine imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
// Styling imports
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Image imports
const COPY_IMAGE = require('../../../../../assets/mainScreens/copy.png')
const CLOSE_BUTTON = require('../../../../../assets/closeButton.png')
const LEADER_LOGO = require('../../../../../assets/mainScreens/groupLeaderSword.png')

// Question amounts that can be taken
const QUESTION_AMOUNTS_LIST = ['5', '10', '15', '20']
// Game engine endpoint url
import { GAME_ENGINE_ENDPOINT } from '../../../../../config'

class CreateGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Room code
            groupCode: '',
            // Group game question number
            questionNumber: '5',
            // Group player list
            groupRoomPlayerList: [],
            // Quit modal visible variable
            isQuitGameModalVisible: false,
            // Variable for checking leader status
            isClientLeader: false
        }
    }

    componentDidMount() {
        this.setState({
            groupCode: this.randomCodeGenerator()
        })
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.joinRoom()
        })
    }

    startGroupGameOnPress = () => {
        const playerListLenght = Object.keys(this.state.groupRoomPlayerList)
            .length

        let readyCount = 0

        this.state.groupRoomPlayerList.forEach(player => {
            if (player.status === 'Hazır') readyCount++
        })

        if (readyCount !== playerListLenght || playerListLenght === 1) return

        this.room.send({
            action: 'start-match'
        })
    }

    joinRoom = async () => {
        this.room = this.client.join('groupRoom', {
            // These will be props coming from home screen
            examName: 'LGS',
            courseName: 'Matematik',
            subjectName: 'Sayilar',
            databaseId: this.props.clientDBId,
            roomCode: this.state.groupCode,
            create: true
        })

        this.room.onJoin.add(() => {
            this.room.onMessage.add(message => {
                switch (message.action) {
                    case 'player-props':
                        const playerIds = Object.keys(message.playerProps)

                        playerList = []

                        playerIds.forEach(element => {
                            if (message.playerProps[element].readyStatus) {
                                playerList.push({
                                    username:
                                        message.playerProps[element].username,
                                    id: element,
                                    profilePicture:
                                        message.playerProps[element]
                                            .profilePicture,
                                    status: 'Hazır',
                                    isLeader:
                                        message.playerProps[element].isLeader
                                })
                            } else {
                                playerList.push({
                                    username:
                                        message.playerProps[element].username,
                                    id: element,
                                    profilePicture:
                                        message.playerProps[element]
                                            .profilePicture,
                                    status: 'Bekleniyor',
                                    isLeader:
                                        message.playerProps[element].isLeader
                                })
                            }
                            message.playerProps[element].isLeader === true
                                ? this.setState({ isClientLeader: true })
                                : this.setState({ isClientLeader: false })
                        })

                        this.setState({ groupRoomPlayerList: playerList })
                        return
                    case 'start-match':
                        navigationReset('game', { isHardReset: true })
                        navigationPush(SCENE_KEYS.gameScreens.groupGame, {
                            room: this.room,
                            client: this.client
                        })
                        return
                }
            })
        })
    }

    randomCodeGenerator() {
        var result = ''
        var characters = 'ABCDEF0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.groupCode)
    }

    // Selected question amount is sent to the server
    questionAmountPicker(idx, value) {
        this.room.send({
            action: 'set-question-number',
            questionAmount: value
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
        this.room.leave()
        this.client.close()
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
                    <View style={styles.gameCodeContainer}>
                        <View style={styles.gameCodeBox}>
                            <View style={styles.gameCodeBoxLeftView} />
                            <View style={styles.gameCodeBoxTextView}>
                                <Text
                                    style={styles.gameCodeText}
                                    selectable={true}
                                >
                                    {this.state.groupCode}
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
                            dropdownStyle={styles.questionPickerDropdown}
                            options={QUESTION_AMOUNTS_LIST}
                            defaultValue={this.state.questionNumber}
                            onSelect={(idx, value) =>
                                this.questionAmountPicker(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.usersListContainer}>
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
                                            <View
                                                style={styles.leaderContainer}
                                            >
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
                    </View>
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
                    buttonText="Başla"
                    onPress={this.startGroupGameOnPress}
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

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(CreateGroupRoom)
