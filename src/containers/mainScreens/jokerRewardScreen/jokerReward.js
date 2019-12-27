import React from 'react'
import {
    Image,
    Linking,
    Modal,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { connect } from 'react-redux'

import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import Roulette from 'react-native-casino-roulette'

import { rewardAd } from '../../../services/admobService'
import { clientActions } from '../../../redux/client/actions'

import FIRST_JOKER_WHEEL from '../../../assets/firstJokerWheel.png'
import SECOND_JOKER_WHEEL from '../../../assets/secondJokerWheel.png'
import THIRD_JOKER_WHEEL from '../../../assets/thirdJokerWheel.png'
import WHEEL_PICKER from '../../../assets/wheelPicker.png'
import BACKGROUND from '../../../assets/gameScreens/gameStatsBackground.jpg'
import { navigationPop, navigationReplace, SCENE_KEYS } from '../../../services/navigationService'
import SEE_OPPONENT_JOKER_IMAGE from '../../../assets/jokers/seeOpponent.png'
import REMOVE_OPTIONS_JOKER_IMAGE from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANGE_JOKER_IMAGE from '../../../assets/jokers/secondChance.png'

const numbers = [20,5,5,5,5,5,5,5,10,10,10,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
const options  = numbers.map((o)=>({index:o}))

class JokerReward extends React.Component {
    constructor(props) {
        super(props)
        this.onRotate = this.onRotate.bind(this)
        this.onRotateChange = this.onRotateChange.bind(this)
        this.state = {
            option: null,
            rouletteState:'stop',
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
        }
    }

    componentDidMount() {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 1:
                    this.setState({ firstJoker: userJoker })
                    break
                case 2:
                    this.setState({ secondJoker: userJoker })
                    break
                case 3:
                    this.setState({ thirdJoker: userJoker })
                    break
            }
        })
    }

    updateJokerAmounts(option, jokerNo) {
        switch (jokerNo) {
            case 1:
                firstJoker.amount += option
                break
            case 2:
                secondJoker.amount += option
                break
            case 3:
                thirdJoker.amount += option
                break
        }

        this.props.rewardUserJoker(
            this.props.clientToken,
            this.props.clientDBId,
        )
    }

    onRotateChange(state) {
        this.setState({
            rouletteState: state
        })
        setTimeout(() => {
            navigationReplace(
                SCENE_KEYS.mainScreens
                    .main
            )
            }, 7000)
    }

    async onRotate(option) {

        await this.setState({
            option:option.index
        })
        console.log('Joker Reward: ' + this.state.option)
        this.updateJokerAmounts(this.state.option, this.props.jokerNumber)
    }

    render() {
        const{option, rouletteState} = this.state
        return (
            <View style={styles.container}>
                {
                    rouletteState === 'stop' && option != null &&
                    <View style={{position: 'absolute', zIndex: 1, height: hp(120), width: wp(100)}}>
                    </View>
                }
                <Image source={BACKGROUND} style={{position: 'absolute', height: hp(120), width: wp(100)}} />
                <View style={styles.textView}>
                    {
                        rouletteState === 'start' &&
                        <View>
                            <Text style={styles.text}>GELİYOOOOOOOR!</Text>
                        </View>
                    }
                    {
                        rouletteState === 'stop' && option === null &&
                        <View>
                            <Text style={styles.text}>JOKER KAZANMAK İÇİN ÇARKI ÇEVİR!</Text>
                        </View>
                    }
                    {
                        rouletteState === 'stop' && option != null &&
                        <View>
                            <Text style={[styles.text, { color: '#00A14C', fontSize: hp(6), fontFamily: 'Averta-ExtraBold'}]}>{option}</Text>
                            <Text style={[styles.text, { color: '#00A14C'}]}> RAKİBİ GÖR JOKERİ</Text>
                            <Text style={[styles.text, { color: '#00A14C'}]}> KAZANDIN!</Text>
                        </View>
                    }
                </View>
                <View style={styles.wheelView}>
                    <Image source={WHEEL_PICKER} style={{height: hp(5.6), width: wp(10), marginTop: hp(3)}}/>
                    <Roulette
                        enableUserRotate={rouletteState=='stop'}
                        background={this.props.jokerNumber === 1 ? FIRST_JOKER_WHEEL : this.props.jokerNumber === 2 ? SECOND_JOKER_WHEEL : THIRD_JOKER_WHEEL}
                        onRotate={this.onRotate}
                        onRotateChange={this.onRotateChange}
                        options={options}
                        radius={hp(50)}>
                    </Roulette>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation,
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId
})

const mapDispatchToProps = dispatch => ({
    rewardUserJoker: (clientToken, clientId, jokerId) =>
        dispatch(clientActions.rewardUserJoker(clientToken, clientId, jokerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(JokerReward)
