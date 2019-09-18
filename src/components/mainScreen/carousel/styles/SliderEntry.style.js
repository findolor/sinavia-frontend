import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from './index.style'
import {
    heightPercentageToDP, hp,
    widthPercentageToDP
} from 'react-native-responsive-screen'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    'window'
)

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100
    return Math.round(value)
}

const slideHeight = viewportHeight * 0.25
const slideWidth = wp(70)
const itemHorizontalMargin = wp(1)

export const sliderHeight = heightPercentageToDP(25)
export const sliderWidth = widthPercentageToDP(100)
export const itemHeight = heightPercentageToDP(23)
export const itemWidth = widthPercentageToDP(60)

const entryBorderRadius = 30

export default StyleSheet.create({
    slideInnerContainer: {
        width: widthPercentageToDP(50),
        height: heightPercentageToDP(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        width: widthPercentageToDP(50),
        height: heightPercentageToDP(15)
    },
    imageContainer: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(23),
        backgroundColor: 'blue',
        borderRadius: 30
    },
    image: {
        height: heightPercentageToDP(23),
        width: widthPercentageToDP(60)
    },
    title: {
        ...StyleSheet.absoluteFillObject,
        color: '#4EC9DD',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    // image's border radius is buggy on iOS; let's hack it!
})
