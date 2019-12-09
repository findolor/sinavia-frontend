import React from 'react'
import { Image, ImageBackground, View, Text } from 'react-native'

import styles from './style'

import BACKGROUND from '../../../assets/gameScreens/gameStatsBackground.jpg'
import LOGO from '../../../assets/sinavia_logo_cut.png'
import GROUP_PEOPLE from '../../../assets/groupPeople.png'
import { SCENE_KEYS } from '../../../config'
import {
    navigationReplace,
    navigationReset
} from '../../../services/navigationService'

export default class GroupLoading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.room.removeAllListeners()
            navigationReplace(SCENE_KEYS.gameScreens.groupGame, {
                // These are necessary for the game logic
                room: this.props.room,
                client: this.props.client,
                // These can be used in both screens
                groupRoomPlayerList: this.props.groupRoomPlayerList
            })
        }, 5000)

        this.props.room.onError(error => {
            console.log(error)
            clearTimeout(this.timeout)
            navigationReset('main')
        })

        this.props.room.onLeave(code => {
            console.log(code)
            clearTimeout(this.timeout)
            navigationReset('main')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={BACKGROUND} style={styles.background}>
                    <View style={styles.shadowView}>
                        <View style={styles.logoView}>
                            <View style={styles.logoBorderView}>
                                <Image source={LOGO} style={styles.logoImg} />
                            </View>
                        </View>
                        <View style={styles.textsView}>
                            <Text style={styles.courseText}>
                                {this.props.courseName}
                            </Text>
                            <Text style={styles.subjectText}>
                                {this.props.subjectName}
                            </Text>
                            <Text style={styles.questionCounterText}>
                                Soru Sayısı: {this.props.choosenQuestionAmount}
                            </Text>
                        </View>
                        <View style={styles.peopleCounterView}>
                            <Image
                                source={GROUP_PEOPLE}
                                style={styles.groupPeopleImg}
                            />
                            <Text style={styles.peopleCounterText}>
                                {this.props.groupRoomPlayerList.length}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
