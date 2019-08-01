import React from 'react'
import {
    Image,
    ImageBackground,
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import SORU from '../../../assets/soru.jpg'

const data = [
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    },
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    },
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    },
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    },
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    },
    {
        imageUrl: "http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png"
    }
];

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>Favori Sorular</Text>
                    </View>
                </View>
                <ScrollView
                    style={styles.cardsScrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp}/>
                        <View style={styles.contentContainerDown}/>
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - TÜRKÇE</Text>
                        </View>
                        <View style={styles.questionsContainer}>
                        <FlatList horizontal={true} data={this.state.data} showsHorizontalScrollIndicator={false} renderItem={({ item }) => {
                            return (
                                <Image source={{ uri: item.imageUrl }} style={styles.question}/>
                            );
                        }} keyExtractor={(item, index) => index}/>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp}/>
                        <View style={styles.contentContainerDown}/>
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - MATEMATİK</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp}/>
                        <View style={styles.contentContainerDown}/>
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - KİMYA</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.contentContainerUp}/>
                        <View style={styles.contentContainerDown}/>
                        <View style={styles.contentContainerWrapper}>
                            <Text style={styles.contentText}>YKS - BİYOLOJİ</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Favorites
