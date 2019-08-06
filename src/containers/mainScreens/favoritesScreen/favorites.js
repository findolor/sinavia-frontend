import React from 'react'
import {
    Image,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import Gallery from 'react-native-image-gallery'

const data = [
    {
        source: {
            uri:
                'http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png'
        },
        id: 0
    },
    {
        source: {
            uri:
                'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3'
        },
        id: 1
    },
    {
        source: {
            uri:
                'http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png'
        },
        id: 2
    },
    {
        source: {
            uri:
                'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3'
        },
        id: 3
    }
]

// TODO write this file again according to the data from server
class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            isModalVisible: false,
            initialIndex: 0,
            galleryPosition: 0
        }
    }

    returnButtonOnPress = () => {
        navigationPop()
    }

    questionOnPress = item => {
        this.setState({ isModalVisible: true, initialIndex: item.id })
    }

    galleryOnScroll = event => {
        this.setState({ galleryPosition: event.position })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.returnButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>Favori Sorular</Text>
                    </View>
                </View>
                <Modal visible={this.state.isModalVisible}>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false })}
                    >
                        <Text>X</Text>
                        <Text>
                            {this.state.galleryPosition + 1}/
                            {Object.keys(this.state.data).length}
                        </Text>
                    </TouchableOpacity>
                    <Gallery
                        style={{ flex: 1, backgroundColor: 'black' }}
                        images={this.state.data}
                        initialPage={this.state.initialIndex}
                        onPageScroll={event => this.galleryOnScroll(event)}
                    />
                </Modal>
                <ScrollView
                    style={styles.cardsScrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp} />
                        <View style={styles.contentContainerDown} />
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - TÜRKÇE</Text>
                        </View>
                        <View style={styles.questionsContainer}>
                            <FlatList
                                horizontal={true}
                                data={this.state.data}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.questionOnPress(item)
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: item.source.uri
                                                }}
                                                style={styles.question}
                                            />
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp} />
                        <View style={styles.contentContainerDown} />
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>
                                YKS - MATEMATİK
                            </Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp} />
                        <View style={styles.contentContainerDown} />
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - KİMYA</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp} />
                        <View style={styles.contentContainerDown} />
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>
                                YKS - BİYOLOJİ
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Favorites
