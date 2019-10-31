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

export default class GroupPregame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
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
                            <Text style={styles.courseText}>LGS - Matematik</Text>
                            <Text style={styles.subjectText}>Sayılar</Text>
                            <Text style={styles.questionCounterText}>Soru Sayısı: 15</Text>
                        </View>
                        <View style={styles.peopleCounterView}>
                            <Image source={GROUP_PEOPLE} style={styles.groupPeopleImg}/>
                            <Text style={styles.peopleCounterText}>15</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
