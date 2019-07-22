import React from 'react'
import {
    Animated,
    Keyboard,
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


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: hp(60), marginTop: hp(30) }}>
                    <ScrollView style={styles.cardsScrollView} showsVerticalScrollIndicator={false} >
                        <View style={styles.card}>
                            <Text style={styles.cardText}>
                                Paragrafta Anlam
                            </Text>
                        </View>
                        <View style={styles.card} />
                        <View style={styles.card} />
                        <View style={styles.card} />
                        <View style={styles.card} />
                        <View style={styles.card} />
                        <View style={styles.card} />
                        <View style={styles.card} />
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
        marginTop: hp(88),
        position: 'absolute'
    },
    cardsScrollView: {
        height: hp(70),
        width: wp(87),
        backgroundColor: '#fcfcfc'
    },
    card: {
        height: hp(9),
        width: wp(87),
        borderWidth: wp(0.6),
        borderRadius: 10,
        borderColor: '#00D9EF',
        marginBottom: hp(2.3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#00D9EF',
        fontSize: hp(3.3)
    }
})
