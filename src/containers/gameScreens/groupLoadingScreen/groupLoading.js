import React, { Component } from 'react'
import { Image, ImageBackground, View, StatusBar, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import styles from './style'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import BACKGROUND from '../../../assets/gameScreens/gameStatsBackground.jpg'
import LOGO from '../../../assets/sinavia_logo_cut.png'
import GROUP_PEOPLE from '../../../assets/groupPeople.png'
import * as Colyseus from 'colyseus.js'
import { GAME_ENGINE_ENDPOINT, SCENE_KEYS } from '../../../config'
import { navigationReplace } from '../../../services/navigationService'

export default class GroupLoading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    componentDidMount() {
        setTimeout(() => {
            navigationReplace(SCENE_KEYS.gameScreens.groupGame, {
                // These are necessary for the game logic
                room: this.props.room,
                client: this.props.client,
                // These can be used in both screens
                groupRoomPlayerList: this.props.groupRoomPlayerList
            })
        }, 5000 )
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={BACKGROUND} style={styles.background}>
                    <View style={styles.shadowView}>
                        <View style={styles.logoView}>
                            <View style={styles.logoBorderView}>
                                <Image source={LOGO} style={styles.logoImg}/>
                            </View>
                        </View>
                        <View style={styles.textsView}>
                            <Text style={styles.courseText}>{this.props.room.courseId}</Text>
                            <Text style={styles.subjectText}>{this.props.room.subjectId}</Text>
                            <Text style={styles.questionCounterText}>Soru Sayısı: 15</Text>
                        </View>
                        <View style={styles.peopleCounterView}>
                            <Image source={GROUP_PEOPLE} style={styles.groupPeopleImg}/>
                            <Text style={styles.peopleCounterText}>{this.props.groupRoomPlayerList.length}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
