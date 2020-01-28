import React from 'react'
import firebase from '@react-native-firebase/app'
import {
    BannerAd,
    BannerAdSize,
    TestIds,
    InterstitialAd,
    AdEventType
} from '@react-native-firebase/admob'

export const BannerAdvertisement = () => {
    return (
        <BannerAd
            unitId={BannerAdSize.BANNER}
            size={TestIds.BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true
            }}
            onAdLoaded={() => {
                console.log('Advert loaded')
            }}
            onAdFailedToLoad={error => {
                console.error('Advert failed to load: ', error)
            }}
        />
    )
}

export const interstitialAd = () => {
    const interstitial = InterstitialAd.createForAdRequest(
        TestIds.INTERSTITIAL,
        {
            requestNonPersonalizedAdsOnly: true
        }
    )

    interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) {
            interstitial.show()
        }
    })

    interstitial.load()
}

export const rewardAd = (callbackFunction, callbackFunctionSecond, params) => {
    let isAdWatched = false
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
        isAdWatched = true
        callbackFunction(params.jokerNumber)
    })

    advert.on('onAdClosed', event => {
        if (!isAdWatched) callbackFunctionSecond()
    })
}
