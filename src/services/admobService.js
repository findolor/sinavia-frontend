import React from 'react'
import firebase from 'react-native-firebase'

export const BannerAd = () => {
    const Banner = firebase.admob.Banner
    const AdRequest = firebase.admob.AdRequest
    const request = new AdRequest()

    return (
        <Banner
            unitId={'ca-app-pub-3940256099942544/2934735716'}
            size={'Banner'}
            request={request.build()}
            onAdLoaded={() => {
                console.log('Advert loaded')
            }}
        />
    )
}

export const interstitialAd = () => {
    const advert = firebase
        .admob()
        .interstitial('ca-app-pub-3940256099942544/5135589807')
    const AdRequest = firebase.admob.AdRequest
    const request = new AdRequest()
    advert.loadAd(request.build())

    advert.on('onAdLoaded', () => {
        console.log('Advert ready to show.')
        advert.show()
    })
}

export const rewardAd = (callbackFunction, params) => {
    const advert = firebase
        .admob()
        .rewarded('ca-app-pub-3940256099942544/1712485313')

    const AdRequest = firebase.admob.AdRequest
    const request = new AdRequest()
    advert.loadAd(request.build())

    advert.on('onAdLoaded', () => {
        console.log('Advert ready to show.')
        advert.show()
    })

    advert.on('onRewarded', event => {
        console.log(
            'The user watched the entire video and will now be rewarded!',
            event
        )
        callbackFunction(params.jokerNumber)
    })
}
