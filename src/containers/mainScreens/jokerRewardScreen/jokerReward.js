import React from 'react'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import Roulette from 'react-native-casino-roulette'
import { clientActions } from '../../../redux/client/actions'
import FIRST_JOKER_WHEEL from '../../../assets/firstJokerWheel.png'
import SECOND_JOKER_WHEEL from '../../../assets/secondJokerWheel.png'
import THIRD_JOKER_WHEEL from '../../../assets/thirdJokerWheel.png'
import WHEEL_PICKER from '../../../assets/wheelPicker.png'
import BACKGROUND from '../../../assets/gameScreens/gameStatsBackground.jpg'
import { navigationPop } from '../../../services/navigationService'

const numbers = [
    20,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    10,
    10,
    10,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
]
const options = numbers.map(o => ({ index: o }))

class JokerReward extends React.Component {
    constructor(props) {
        super(props)
        this.onRotate = this.onRotate.bind(this)
        this.onRotateChange = this.onRotateChange.bind(this)
        this.state = {
            option: null,
            rouletteState: 'stop'
        }
    }

    updateJokerAmounts(option) {
        this.props.rewardUserJoker(
            this.props.clientToken,
            this.props.clientDBId,
            this.props.jokerNumber,
            option,
            this.props.jokerUpdate
        )
    }

    onRotateChange(state) {
        this.setState({
            rouletteState: state
        })
    }

    onRotate(option) {
        this.setState({
            option: option.index
        })
        this.updateJokerAmounts(option.index)
        setTimeout(() => {
            navigationPop()
        }, 7000)
    }

    render() {
        const { option, rouletteState } = this.state
        return (
            <View style={styles.container}>
                {rouletteState === 'stop' && option != null && (
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            height: hp(120),
                            width: wp(100)
                        }}
                    ></View>
                )}
                <Image
                    source={BACKGROUND}
                    style={{
                        position: 'absolute',
                        height: hp(120),
                        width: wp(100)
                    }}
                />
                <View style={styles.textView}>
                    {rouletteState === 'start' && (
                        <View>
                            <Text allowFontScaling={false} style={styles.text}>
                                JOKER ÇARKIN DÖNÜYOR
                            </Text>
                            <Text allowFontScaling={false} style={styles.text}>
                                BOL ŞANS!
                            </Text>
                        </View>
                    )}
                    {rouletteState === 'stop' && option === null && (
                        <View>
                            <Text allowFontScaling={false} style={styles.text}>
                                JOKER KAZANMAK İÇİN ÇARKI ÇEVİR!
                            </Text>
                        </View>
                    )}
                    {rouletteState === 'stop' && option != null && (
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.text,
                                    {
                                        color: '#00A14C',
                                        fontSize: hp(6),
                                        fontFamily: 'Averta-ExtraBold'
                                    }
                                ]}
                            >
                                {option}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text, { color: '#00A14C' }]}
                            >
                                {' '}
                                {this.props.jokerNumber === 1 ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.text,
                                            { color: '#00A14C' }
                                        ]}
                                    >
                                        RAKİBİ GÖR
                                    </Text>
                                ) : this.props.jokerNumber === 2 ? (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.text,
                                            { color: '#00A14C' }
                                        ]}
                                    >
                                        ŞIK ELE
                                    </Text>
                                ) : (
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.text,
                                            { color: '#00A14C' }
                                        ]}
                                    >
                                        ÇİFTE ŞANS
                                    </Text>
                                )}{' '}
                                JOKERİ
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={[styles.text, { color: '#00A14C' }]}
                            >
                                {' '}
                                KAZANDIN!
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.wheelView}>
                    <Image
                        source={WHEEL_PICKER}
                        style={{
                            height: hp(5.6),
                            width: wp(10),
                            marginTop: hp(3)
                        }}
                    />
                    <Roulette
                        enableUserRotate={option === null}
                        background={
                            this.props.jokerNumber === 1
                                ? FIRST_JOKER_WHEEL
                                : this.props.jokerNumber === 2
                                ? SECOND_JOKER_WHEEL
                                : THIRD_JOKER_WHEEL
                        }
                        onRotate={this.onRotate}
                        onRotateChange={this.onRotateChange}
                        options={options}
                        radius={hp(50)}
                    ></Roulette>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    jokerUpdate: state.client.jokerUpdate
})

const mapDispatchToProps = dispatch => ({
    rewardUserJoker: (
        clientToken,
        clientId,
        jokerId,
        jokerAmount,
        jokerUpdate
    ) =>
        dispatch(
            clientActions.rewardUserJoker(
                clientToken,
                clientId,
                jokerId,
                jokerAmount,
                jokerUpdate
            )
        )
})

export default connect(mapStateToProps, mapDispatchToProps)(JokerReward)
