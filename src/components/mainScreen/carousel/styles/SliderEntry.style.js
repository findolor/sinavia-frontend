import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from './index.style'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    'window'
)

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100
    return Math.round(value)
}

const slideHeight = viewportHeight * 0.25
const slideWidth = wp(60)
const itemHorizontalMargin = wp(1)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2

const entryBorderRadius = 30

export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        opacity: 0.5
    },
    title: {
        ...StyleSheet.absoluteFillObject,
        color: '#4EC9DD',
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
    // image's border radius is buggy on iOS; let's hack it!
})
