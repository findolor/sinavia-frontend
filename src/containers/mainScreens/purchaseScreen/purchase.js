import React from 'react'
import {
    Image,
    Linking,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import INSTAGRAM_LOGO from '../../../assets/new_instagram_logo.png'
import TWITTER_LOGO from '../../../assets/new_twitter_logo.png'
import FACEBOOK_LOGO from '../../../assets/new_facebook_logo.png'

import SEE_OPPONENT_JOKER_IMAGE from '../../../assets/jokers/seeOpponent.png'
import REMOVE_OPTIONS_JOKER_IMAGE from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANGE_JOKER_IMAGE from '../../../assets/jokers/secondChance.png'
//import { rewardAd } from '../../../services/admobService'
import firebase from 'react-native-firebase'
import { inviteCodeServices } from '../../../sagas/inviteCode'

import NEW_PLAY_AD from '../../../assets/mainScreens/newPlayAd.png'

import {
    navigationPush,
    SCENE_KEYS,
    navigationReset
} from '../../../services/navigationService'

const instagram_page = 'https://www.instagram.com/sinavia.app/'
const twitter_page = 'https://twitter.com/sinavia'
const facebook_page = 'https://www.facebook.com/sinaviaapp'

const itemSkus = Platform.select({
    ios: ['10_jokers_each'],
    android: []
})

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            secondJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            thirdJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            remainingExamDays: null,
            remainingExamWeeks: null,
            remainingExamMonths: null,
            // Available products for in-app purchase
            availableProducts: null,
            isActivityIndicatorOn: false
        }
    }

    async componentDidMount() {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 1:
                    userJoker.joker.imageLink = SEE_OPPONENT_JOKER_IMAGE
                    this.setState({ firstJoker: userJoker })
                    break
                case 2:
                    userJoker.joker.imageLink = REMOVE_OPTIONS_JOKER_IMAGE
                    this.setState({ secondJoker: userJoker })
                    break
                case 3:
                    userJoker.joker.imageLink = SECOND_CHANGE_JOKER_IMAGE
                    this.setState({ thirdJoker: userJoker })
                    break
            }
        })

        this.calculateRemainingExamTime()
    }

    calculateRemainingExamTime = () => {
        let examIndex = this.props.gameContentMap.exams.findIndex(
            x => x.name === this.props.choosenExam
        )
        let examDate = this.props.gameContentMap.exams[examIndex].examDate

        const dateToday = moment()
        const endDate = moment(examDate)
        const remainingExamMonths = endDate.diff(dateToday, 'months')
        let remainingExamWeeks = 0
        let remainingExamDays = endDate.diff(dateToday, 'days')
        let daysToSubtract = 0

        if (remainingExamMonths !== 0) {
            let tempDate = moment()
            let daysInMonth = tempDate.daysInMonth()
            for (let i = 1; i < remainingExamMonths + 1; i++) {
                daysToSubtract += daysInMonth
                tempDate = moment().add(i, 'months')
                daysInMonth = tempDate.daysInMonth()
            }
        }
        remainingExamDays -= daysToSubtract
        if (remainingExamDays >= 7) {
            remainingExamWeeks = Math.floor(remainingExamDays / 7)
            remainingExamDays -= remainingExamWeeks * 7
        }

        this.setState({
            remainingExamDays: remainingExamDays,
            remainingExamWeeks: remainingExamWeeks,
            remainingExamMonths: remainingExamMonths
        })
    }

    rewardAd = jokerNumber => {
        let isAdWatched = false
        const advert = firebase
            .admob()
            .rewarded('ca-app-pub-3940256099942544/1712485313')

        const AdRequest = firebase.admob.AdRequest
        const request = new AdRequest()
        advert.loadAd(request.build())

        advert.on('onAdLoaded', () => {
            this.setState({ isActivityIndicatorOn: false }, () => {
                advert.show()
            })
        })

        advert.on('onRewarded', event => {
            isAdWatched = true
            this.refreshJokerOnReward(jokerNumber)
        })

        advert.on('onAdFailedToLoad', event => {
            this.setState({ isActivityIndicatorOn: false })
        })

        advert.on('onAdClosed', event => {
            if (!isAdWatched) navigationReset('main')
        })
    }

    jokerRewardOnPress = jokerNumber => {
        this.setState({ isActivityIndicatorOn: true })
        this.rewardAd(jokerNumber)
    }

    refreshJokerOnReward = jokerNumber => {
        navigationPush(SCENE_KEYS.mainScreens.jokerReward, {
            jokerNumber: jokerNumber
        })
    }

    resetToMain = () => {
        navigationReset('main')
    }

    render() {
        if (this.state.isActivityIndicatorOn) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.newJokersContainer}>
                    <View style={styles.newJokerContainer}>
                        <View style={styles.newJokerImageContainer}>
                            <View style={styles.newJokerImageView}>
                                <View
                                    style={[
                                        styles.newJokerCounterView,
                                        {
                                            width:
                                                (
                                                    '' +
                                                    this.state.firstJoker.amount
                                                ).length < 3
                                                    ? hp(5)
                                                    : hp(6.5)
                                        }
                                    ]}
                                >
                                    <Text style={styles.newJokerCounterText}>
                                        {this.state.firstJoker.amount}
                                    </Text>
                                </View>
                                <Image
                                    source={
                                        this.state.firstJoker.joker.imageLink
                                    }
                                    style={styles.newJokerImg}
                                />
                            </View>
                        </View>
                        <View style={styles.newJokerNameContainer}>
                            <Text style={styles.newJokerNameText}>
                                {this.state.firstJoker.joker.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.newJokerContainer}>
                        <View style={styles.newJokerImageContainer}>
                            <View style={styles.newJokerImageView}>
                                <View
                                    style={[
                                        styles.newJokerCounterView,
                                        {
                                            width:
                                                (
                                                    '' +
                                                    this.state.secondJoker
                                                        .amount
                                                ).length < 3
                                                    ? hp(5)
                                                    : hp(6.5)
                                        }
                                    ]}
                                >
                                    <Text style={styles.newJokerCounterText}>
                                        {this.state.secondJoker.amount}
                                    </Text>
                                </View>
                                <Image
                                    source={
                                        this.state.secondJoker.joker.imageLink
                                    }
                                    style={styles.newJokerImg}
                                />
                            </View>
                        </View>
                        <View style={styles.newJokerNameContainer}>
                            <Text style={styles.newJokerNameText}>
                                {this.state.secondJoker.joker.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.newJokerContainer}>
                        <View style={styles.newJokerImageContainer}>
                            <View style={styles.newJokerImageView}>
                                <View
                                    style={[
                                        styles.newJokerCounterView,
                                        {
                                            width:
                                                (
                                                    '' +
                                                    this.state.thirdJoker.amount
                                                ).length < 3
                                                    ? hp(5)
                                                    : hp(6.5)
                                        }
                                    ]}
                                >
                                    <Text style={styles.newJokerCounterText}>
                                        {this.state.thirdJoker.amount}
                                    </Text>
                                </View>
                                <Image
                                    source={
                                        this.state.thirdJoker.joker.imageLink
                                    }
                                    style={styles.newJokerImg}
                                />
                            </View>
                        </View>
                        <View style={styles.newJokerNameContainer}>
                            <Text style={styles.newJokerNameText}>
                                {this.state.thirdJoker.joker.name}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.newAddButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => this.jokerRewardOnPress(1)}
                        style={styles.newPremiumUserJokerButtonStyle}
                    >
                        <View style={styles.newPremiumUserJokerButton1Style}>
                            <Image
                                source={this.state.firstJoker.joker.imageLink}
                                style={styles.newJokerPlayAdImg}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton2Style}>
                            <Image
                                source={NEW_PLAY_AD}
                                style={styles.newPlayAd}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton3Style}>
                            <Text style={styles.newPlayAdText}>
                                {'     '}
                                İzle & Kazan
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.jokerRewardOnPress(2)}
                        style={styles.newPremiumUserJokerButtonStyle}
                    >
                        <View style={styles.newPremiumUserJokerButton1Style}>
                            <Image
                                source={this.state.secondJoker.joker.imageLink}
                                style={styles.newJokerPlayAdImg}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton2Style}>
                            <Image
                                source={NEW_PLAY_AD}
                                style={styles.newPlayAd}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton3Style}>
                            <Text style={styles.newPlayAdText}>
                                {'     '}
                                İzle & Kazan
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.jokerRewardOnPress(3)}
                        style={styles.newPremiumUserJokerButtonStyle}
                    >
                        <View style={styles.newPremiumUserJokerButton1Style}>
                            <Image
                                source={this.state.thirdJoker.joker.imageLink}
                                style={styles.newJokerPlayAdImg}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton2Style}>
                            <Image
                                source={NEW_PLAY_AD}
                                style={styles.newPlayAd}
                            />
                        </View>
                        <View style={styles.newPremiumUserJokerButton3Style}>
                            <Text style={styles.newPlayAdText}>
                                {'     '}
                                İzle & Kazan
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.newSocialMediaContainer}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(instagram_page)}
                        style={styles.newSocialMediaCircleView}
                    >
                        <Image
                            source={INSTAGRAM_LOGO}
                            style={styles.newSocialMediaIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(twitter_page)}
                        style={styles.newSocialMediaCircleView}
                    >
                        <Image
                            source={TWITTER_LOGO}
                            style={styles.newSocialMediaIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(facebook_page)}
                        style={styles.newSocialMediaCircleView}
                    >
                        <Image
                            source={FACEBOOK_LOGO}
                            style={styles.newSocialMediaIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.newTimeContainer}>
                    <View style={styles.newYourPremiumTextView}>
                        <Text style={styles.newYourPremiumText}>
                            Sınava Kalan Süre
                        </Text>
                    </View>
                    <View style={styles.newYourPremiumCounterView}>
                        <Text style={styles.newYourPremiumCounterText}>
                            <Text
                                style={styles.newYourPremiumCounterNumbersText}
                            >
                                {this.state.remainingExamMonths}
                            </Text>{' '}
                            Ay
                            <Text
                                style={styles.newYourPremiumCounterNumbersText}
                            >
                                {' '}
                                {this.state.remainingExamWeeks}
                            </Text>{' '}
                            Hafta
                            <Text
                                style={styles.newYourPremiumCounterNumbersText}
                            >
                                {' '}
                                {this.state.remainingExamDays}
                            </Text>{' '}
                            Gün
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation,
    gameContentMap: state.gameContent.gameContentMap,
    choosenExam: state.gameContent.choosenExam,
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseScreen)
