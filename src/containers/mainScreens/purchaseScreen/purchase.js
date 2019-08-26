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
import PEGEM from '../../../assets/pegem.png'
import YARGI from '../../../assets/yargi.jpg'

const booksData = [
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    }
]

const PEGEM_LINK =
    'https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx'
const YARGI_LINK =
    'https://www.yargiyayinevi.com/kpss-kitaplari/kpss-a-grubu/yargi-yayinlari-kpss-a-grubu-2007-2017-cikmis-sinav-sorulari-10-deneme-seti'

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booksData: booksData,
            isPegem: true
        }
    }

    render() {
        const images = this.state.isPegem === true ? PEGEM : YARGI
        const link = this.state.isPegem === true ? PEGEM_LINK : YARGI_LINK
        const bookUpper =
            this.state.isPegem === true
                ? '2020 KPSS Genel'
                : '2020 KPSS Son 5 Yıl'
        const bookLower =
            this.state.isPegem === true
                ? 'Yenenek Genel Kültür'
                : 'Çıkmış Sorular'
        const publisherUpper =
            this.state.isPegem === true ? 'Pegem Akademi' : 'Yargı Yayınları'
        const publisherLower = this.state.isPegem === true ? 'Yayıncılık' : ''
        const actualPrice = this.state.isPegem === true ? '285,00 ₺' : '22,50 ₺'
        const discountPrice =
            this.state.isPegem === true ? '171,00 ₺' : '13,50 ₺'

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
