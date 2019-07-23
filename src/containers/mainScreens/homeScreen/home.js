import React from 'react'
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import Carousel from 'react-native-snap-carousel'
import {
    sliderWidth,
    itemWidth
} from '../../../components/mainScreen/carousel/styles/SliderEntry.style'
import SliderEntry from '../../../components/mainScreen/carousel/components/SliderEntry'
import styles1, {
    colors
} from '../../../components/mainScreen/carousel/styles/index.style'
import { LGS, YKS } from '../../../components/mainScreen/carousel/static/exams'
import {
    lgsTurkce,
    lgsMat,
    lgsTarih,
    lgsFen,
    lgsIng,
    lgsDin,
    yksTurkce,
    yksCog,
    yksTarih,
    yksMat,
    yksFizik,
    yksKimya,
    yksBiyo
} from '../../../components/mainScreen/carousel/static/subjects'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'

const IS_ANDROID = Platform.OS === 'android'
const SLIDER_1_FIRST_ITEM = 0
const exams = [
    'YKS',
    'LGS',
    'KPSS',
    'ALES',
    'DGS',
    'Dil Sınavları',
    'TUS',
    'DUS',
    'EUS',
    'Ehliyet Sınavları'
]
const examList = {
    YKS: YKS,
    LGS: LGS
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: 'YKS',
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        }
    }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        )
    }

    pickerSelect(idx, value) {
        this.setState({
            exam: value
        })
    }

    cards(sinav, index) {
        var choosenSubject
        var cardList = []
        var cardColor
        if (sinav === 'LGS') {
            switch (index) {
                case 0:
                    choosenSubject = lgsTurkce
                    break
                case 1:
                    choosenSubject = lgsMat
                    break
                case 2:
                    choosenSubject = lgsTarih
                    break
                case 3:
                    choosenSubject = lgsFen
                    break
                case 4:
                    choosenSubject = lgsIng
                    break
                case 5:
                    choosenSubject = lgsDin
                    break
                default:
                    choosenSubject = lgsTurkce
                    break
            }
        } else if (sinav === 'YKS') {
            switch (index) {
                case 0:
                    choosenSubject = yksTurkce
                    break
                case 1:
                    choosenSubject = yksCog
                    break
                case 2:
                    choosenSubject = yksTarih
                    break
                case 3:
                    choosenSubject = yksMat
                    break
                case 4:
                    choosenSubject = yksFizik
                    break
                case 5:
                    choosenSubject = yksKimya
                    break
                default:
                    choosenSubject = yksBiyo
                    break
            }
        }

        for (let i = 0; i < choosenSubject.length; i++) {
            cardList.push(
                <View style={styles.card}>
                    <Text style={styles.cardText}>{choosenSubject[i]}</Text>
                </View>
            )
        }
        return cardList
    }

    render() {
        const card = this.cards(this.state.exam, this.state.slider1ActiveSlide)
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={{ height: hp(60), marginTop: hp(0) }}>
                    <View style={styles.pickerContainer}>
                        <DropDown
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            dropdownStyle={styles.pickerDropdown}
                            options={exams}
                            defaultValue={this.state.exam}
                            onSelect={(idx, value) =>
                                this.pickerSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            zIndex={-1}
                            ref={c => (this._slider1Ref = c)}
                            data={examList[this.state.exam]}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={SLIDER_1_FIRST_ITEM}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.65}
                            // inactiveSlideShift={20}
                            containerCustomStyle={styles1.slider}
                            contentContainerCustomStyle={
                                styles1.sliderContentContainer
                            }
                            loop={false}
                            onSnapToItem={index =>
                                this.setState({ slider1ActiveSlide: index })
                            }
                        />
                    </View>
                    <ScrollView
                        style={styles.cardsScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {card}
                    </ScrollView>
                </View>
                <View style={styles.bottomBar} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    bottomBar: {
        height: hp(9),
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: hp(91),
        position: 'absolute'
    },
    scrollViewContainer: {
        backgroundColor: 'green',
        alignItems: 'center'
    },
    cardsScrollView: {
        height: hp(58),
        width: wp(87),
        marginTop: hp(33),
        marginLeft: wp(6.5),
        marginRight: wp(6.5),
        position: 'absolute',
        backgroundColor: '#fcfcfc'
    },
    card: {
        height: hp(9),
        width: wp(87),
        borderWidth: wp(0.6),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginBottom: hp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#00D9EF',
        fontSize: hp(3.3)
    },
    carouselContainer: {
        height: hp(25),
        marginTop: hp(0),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    pickerContainer: {
        height: hp(8.5),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    picker: {
        height: hp(6),
        width: wp(30),
        margin: 8,
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 10
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#00D9EF',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(50.5),
        width: wp(30),
        borderColor: '#00D9EF',
        borderWidth: wp(2),
        borderRadius: 20
    }
})
