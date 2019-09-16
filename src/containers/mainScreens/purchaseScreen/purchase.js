import React from 'react'
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import PEGEM from '../../../assets/yargi.jpg'
import LIDER from '../../../assets/LIDER.png'

const PEGEM_LINK =
    'https://www.yargiyayinevi.com/kpss-kitaplari/yargi-yayinlari-kpss-a-grubu-iktisat-konu-anlatimi-2'
const LIDER_LINK =
    'https://www.lideryayin.com/index.php?route=product/product&product_id=310'

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isYargi: true
        }
    }

    render() {
        const images = this.state.isYargi === true ? PEGEM : LIDER
        const link = this.state.isYargi === true ? PEGEM_LINK : LIDER_LINK
        const bookUpper =
            this.state.isYargi === true
                ? 'KPSS A Grubu İktisat'
                : 'KPSS A Grubu İktisat'
        const bookLower =
            this.state.isYargi === true ? 'Konu Anlatımı' : 'Soru Bankası'
        const publisherUpper =
            this.state.isYargi === true ? 'Yargı Yayınları' : 'Lider Yayınları'
        const publisherLower = this.state.isYargi === true ? '' : ''
        const actualPrice = this.state.isYargi === true ? '99,00 ₺' : '60,20 ₺'
        const discountPrice =
            this.state.isYargi === true ? '69,30 ₺' : '39,00 ₺'

        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <ScrollView
                    style={styles.booksScrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image
                                    source={images}
                                    style={styles.bookImgStyle}
                                />
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>
                                    {bookUpper}
                                </Text>
                                <Text style={styles.bookInfoText}>
                                    {bookLower}
                                </Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>
                                    {publisherUpper}
                                </Text>
                                <Text style={styles.bookPublisherText}>
                                    {publisherLower}
                                </Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>
                                    {actualPrice}
                                </Text>
                                <Text style={styles.bookSalePercentageText}>
                                    %40
                                </Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(link)}
                                >
                                    <View style={styles.bookBuyButton}>
                                        <Text
                                            style={styles.bookCostWithSaleText}
                                        >
                                            {discountPrice}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default PurchaseScreen
