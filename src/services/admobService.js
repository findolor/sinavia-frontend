import React from 'react'
import firebase from 'react-native-firebase'
import { Platform } from 'react-native'

const bannerId = Platform.select({
    ios: 'ca-app-pub-1451210312091686/6809628070',
    android: 'ca-app-pub-1451210312091686/2092009086'
})

const interstitialId = Platform.select({
    ios: 'ca-app-pub-1451210312091686/5990891492',
    android: 'ca-app-pub-1451210312091686/4526600737'
})

const rewardId = Platform.select({
    ios: 'ca-app-pub-1451210312091686/8793627730',
    android: 'ca-app-pub-1451210312091686/6961192383'
})

export const BannerAd = () => {
    const Banner = firebase.admob.Banner
    const AdRequest = firebase.admob.AdRequest
    const request = new AdRequest()

    return (
        <Banner
            unitId={bannerId}
            size={'Banner'}
            request={request.build()}
            onAdLoaded={() => {
                console.log('Advert loaded')
            }}
        />
    )
}

export const interstitialAd = () => {
    const advert = firebase.admob().interstitial(interstitialId)
    const AdRequest = firebase.admob.AdRequest
    const request = new AdRequest()
    advert.loadAd(request.build())

    advert.on('onAdLoaded', () => {
        console.log('Advert ready to show.')
        advert.show()
    })
}

export const rewardAd = (callbackFunction, callbackFunctionSecond, params) => {
    let isAdWatched = false
    const advert = firebase.admob().rewarded(rewardId)

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
        isAdWatched = true
        callbackFunction(params.jokerNumber)
    })

    advert.on('onAdClosed', event => {
        if (!isAdWatched) callbackFunctionSecond()
    })
}
