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
// Styling imports
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Image imports
const CLOSE_BUTTON = require('../../../../../assets/closeButton.png')
const LEADER_LOGO = require('../../../../../assets/mainScreens/groupLeaderSword.png')

class JoinGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Group player list
            groupRoomPlayerList: [],
            // Quit modal visible variable
            isQuitGameModalVisible: false
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
                    })

                    console.log(playerList)

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

    groupGameReadyOnPress = () => {
        this.props.room.send({
            action: 'ready-status'
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
                    <View style={styles.isJoinedRoomSubjectContainer}>
                        <Text style={styles.modalSubjectText}>
                            Paragrafta Anlam
                        </Text>
                    </View>
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
                    buttonText="Hazır"
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
