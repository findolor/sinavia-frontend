import React from 'react'
import {
    Image,
    ImageBackground,
    FlatList,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import PEGEM from '../../../assets/pegem.png'

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

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booksData: booksData
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <ScrollView  style={styles.booksScrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.booksRowView}>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bookView}>
                            <View style={styles.bookImgContainer}>
                                <Image source={PEGEM} style={styles.bookImgStyle}/>
                            </View>
                            <View style={styles.bookInfoContainer}>
                                <Text style={styles.bookInfoText}>2020 KPSS Genel</Text>
                                <Text style={styles.bookInfoText}>Yenenek Genel Kültür</Text>
                            </View>
                            <View style={styles.bookPublisherContainer}>
                                <Text style={styles.bookPublisherText}>Pegem Akademi</Text>
                                <Text style={styles.bookPublisherText}>Yayıncılık</Text>
                            </View>
                            <View style={styles.bookCostContainer}>
                                <Text style={styles.bookCostWithoutSaleText}>285,00 ₺</Text>
                                <Text style={styles.bookSalePercentageText}>%40</Text>
                            </View>
                            <View style={styles.bookBuyButtonContainer}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.pegem.net/kitabevi/148300-2020-KPSS-Genel-Yetenek-Genel-Kultur-Video-Destekli-Konu-Anlatimli-Moduler-Set-6-Kitap--kitabi.aspx')}>
                                    <View style={styles.bookBuyButton}>
                                        <Text style={styles.bookCostWithSaleText}>171,00 ₺</Text>
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
