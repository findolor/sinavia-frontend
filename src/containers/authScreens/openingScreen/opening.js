import React from 'react'
import {
    Image,
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import {
    navigationPush,
    navigationReplace
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen'
import styles from './style'
import NotchView from '../../../components/notchView'
import { fcmService } from '../../../services/fcmService'
import {
    GoogleSignin,
    statusCodes
} from '@react-native-community/google-signin'
import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import { apiServicesTree, makeGetRequest } from '../../../services/apiServices'
import { flashMessages } from '../../../services/flashMessageBuilder'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { deviceStorage } from '../../../services/deviceStorage'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState
} from '@invertase/react-native-apple-authentication'
import firebase from 'react-native-firebase'

class Opening extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLicenceModalVisible: false,
            isLogging: false
        }
    }
    async componentDidMount() {
        await fcmService.checkPermissions()
    }

    componentWillUnmount() {
        clearTimeout(this.indicatorTimeout)
    }

    signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()

            // Getting the user from our db
            makeGetRequest(apiServicesTree.userApi.checkUserWithEmail, {
                email: userInfo.user.email
            }).then(async response => {
                // If the user doesn't exist we create one
                if (response === null) {
                    navigationReplace(SCENE_KEYS.authScreens.getInfo, {
                        email: userInfo.user.email,
                        password: 'null',
                        signInMethod: 'google'
                    })
                } else {
                    if (response === 'normal') {
                        flashMessages.generalErrorWithProps(
                            'Giriş hatası',
                            "Lütfen 'Giriş Yap' ile giriş yapınız.",
                            {
                                backgroundColor: '#FFFFFF',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderColor: '#00D9EF',
                                borderWidth: hp(0.25),
                                height: hp(10)
                            }
                        )
                        //await GoogleSignin.revokeAccess()
                        await GoogleSignin.signOut()
                        return
                    }
                    if (response === 'apple') {
                        flashMessages.generalErrorWithProps(
                            'Giriş hatası',
                            "Lütfen 'Apple' ile giriş yapınız.",
                            {
                                backgroundColor: '#FFFFFF',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderColor: '#00D9EF',
                                borderWidth: hp(0.25),
                                height: hp(10)
                            }
                        )
                        //await GoogleSignin.revokeAccess()
                        await GoogleSignin.signOut()
                        return
                    }
                    // Saving the sign-in method
                    await deviceStorage.saveItemToStorage(
                        'signInMethod',
                        'google'
                    )
                    this.setState({ isLogging: true })
                    this.indicatorTimeout = setTimeout(() => {
                        this.setState({ isLogging: false })
                    }, 4000)
                    this.props.loginUser({
                        email: userInfo.user.email,
                        password: 'null'
                    })
                }
            })
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    logoutFromApple = async () => {
        try {
            // performs logout request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
            })

            // get current authentication state for user
            const credentialState = await appleAuth.getCredentialStateForUser(
                appleAuthRequestResponse.user
            )

            // use credentialState response to ensure the user credential's have been revoked
            if (credentialState === AppleAuthCredentialState.REVOKED) {
                // user is unauthenticated
            }
        } catch (error) {
            console.log(error)
        }
    }

    signInWithApple = () => {
        if (!appleAuth.isSupported) {
            flashMessages.generalErrorWithProps(
                'Hata!',
                'Lütfen telefonunuzu güncelleyiniz.',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            return
        }
        Alert.alert(
            'Apple ile giriş',
            'Lütfen çıkan ekranda e-postamı paylaş seçeneğini seçiniz.',
            [
                {
                    text: 'Tamam',
                    onPress: async () => {
                        try {
                            // performs login request
                            const appleAuthRequestResponse = await appleAuth.performRequest(
                                {
                                    requestedOperation:
                                        AppleAuthRequestOperation.LOGIN,
                                    requestedScopes: [
                                        AppleAuthRequestScope.EMAIL,
                                        AppleAuthRequestScope.FULL_NAME
                                    ]
                                }
                            )

                            // get current authentication state for user
                            const credentialState = await appleAuth.getCredentialStateForUser(
                                appleAuthRequestResponse.user
                            )

                            // use credentialState response to ensure the user is authenticated
                            if (
                                credentialState ===
                                AppleAuthCredentialState.AUTHORIZED
                            ) {
                                if (appleAuthRequestResponse.email !== null) {
                                    makeGetRequest(
                                        apiServicesTree.userApi
                                            .checkUserWithEmail,
                                        {
                                            email:
                                                appleAuthRequestResponse.email
                                        }
                                    ).then(async response => {
                                        // If the user doesn't exist we create one
                                        if (response === null) {
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            navigationReplace(
                                                SCENE_KEYS.authScreens.getInfo,
                                                {
                                                    email:
                                                        appleAuthRequestResponse.email,
                                                    password: 'null',
                                                    signInMethod: 'apple'
                                                }
                                            )
                                        } else {
                                            if (response === 'normal') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Giriş Yap' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            if (response === 'google') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Google' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                        }
                                    })
                                }
                                // Getting the user from our db
                                else
                                    makeGetRequest(
                                        apiServicesTree.userApi
                                            .checkUserWithIdentityToken,
                                        {
                                            identityToken:
                                                appleAuthRequestResponse.user
                                        }
                                    ).then(async response => {
                                        // If the user doesn't exist we create one
                                        if (response === null) {
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            navigationReplace(
                                                SCENE_KEYS.authScreens.getInfo,
                                                {
                                                    email: 'email',
                                                    password: 'null',
                                                    signInMethod: 'apple'
                                                }
                                            )
                                        } else {
                                            if (response === 'normal') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Giriş Yap' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            if (response === 'google') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Google' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            // Saving the sign-in method and token
                                            await deviceStorage.saveItemToStorage(
                                                'signInMethod',
                                                'apple'
                                            )
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            this.setState({ isLogging: true })
                                            this.indicatorTimeout = setTimeout(
                                                () => {
                                                    this.setState({
                                                        isLogging: false
                                                    })
                                                },
                                                4000
                                            )
                                            this.props.loginUser({
                                                identityToken:
                                                    appleAuthRequestResponse.user,
                                                password: 'null'
                                            })
                                        }
                                    })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            ]
        )
    }

    onPressLicenceView = () => {
        this.setState({
            isLicenceModalVisible: true
        })
    }

    closeLicenceView = () => {
        this.setState({
            isLicenceModalVisible: false
        })
    }

    render() {
        if (this.state.isLogging) {
            return (
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isLicenceModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <TouchableOpacity
                        onPress={this.closeLicenceView}
                        style={styles.shadowView}
                    ></TouchableOpacity>
                    <View style={styles.licenceView}>
                        <ScrollView
                            ref={view => {
                                this.scrollView = view
                            }}
                            style={styles.licenceScrollView}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text style={styles.userAgreementText}>
                                KULLANICI SÖZLEŞMESİ {'\n\n'}1 - TARAFLAR
                                {'\n\n'}İşbu kullanıcı sözleşmesi, (bundan böyle
                                kısaca “Sözleşme” olarak anılacaktır), “Sınavia
                                (Arda Nakışçı ve Hakan Yılmaz)” ile “kullanıcı”
                                arasında, tarafların sorumluluk ve
                                yükümlülüklerini belirtmek amacıyla
                                düzenlenmiştir. Bu uygulama, kullanıcının işbu
                                sözleşme koşullarını kabul etmesi halinde
                                kullanımına sunulmuştur. Kullanıcı, uygulamaya
                                üye olmakla, uygulamanın kullanım ve sözleşme
                                kurallarını kabul etmiş bulunmaktadır.
                                Kullanıcı, uygulamaya üye olmakla, sözleşmenin
                                tamamını okuduğunu, içeriğini bütünü ile
                                anladığını ve tüm hükümlerini onayladığını
                                kabul, beyan ve taahhüt etmektedir. Kullanıcı,
                                sözleşme hükümlerini kabul etmekle, uygulama
                                içinde yer alan; kullanıma, üyeliğe ve
                                hizmetlere ilişkin olarak, şirket tarafından
                                yapılan bütün beyanları ve bu beyanlara uygun
                                davranacağını da kabul etmiş bulunmaktadır.
                                {'\n\n'}2 - TANIMLAR{'\n\n'}Şirket : Sınavia
                                {'\n'}
                                Kullanıcı : Uygulamaya üye olan ve/veya
                                uygulamada sunulan hizmetlerden işbu sözleşmede
                                belirtilen şartlar dahilinde yararlanan gerçek
                                veya tüzel kişi.
                                {'\n'}
                                Uygulama : Sınavia isimli mobil uygulama, mobil
                                cihazlarda çalışan mobil uygulama yazılımı ve bu
                                yazılım ile bağlantılı olarak oluşturulan ürün
                                ve hizmetlerin sunulduğu tüm sanal gerçeklik
                                mecralarını ifade etmektedir.{'\n'}Ürün :
                                Uygulamada satışa arz edilen her türlü mal
                                ve/veya hizmet. {'\n\n'}3 - SÖZLEŞMENİN KONUSU
                                {'\n\n'}İşbu sözleşmenin konusu, uygulamada
                                sunulan hizmetlerden yararlanma şartlarının ve
                                tarafların hak ve yükümlülüklerinin
                                düzenlenmesidir. Şirket, işbu sözleşmede ve
                                mobil uygulamada dilediği zaman değişiklik yapma
                                hakkına sahiptir. Bu değişiklikler,
                                değiştirilmiş sözleşmenin uygulamaya
                                konulmasıyla derhal yürürlük kazanır.
                                Kullanıcının uygulamaya devam eden erişimi veya
                                devam eden uygulama kullanımı, değiştirilmiş
                                sözleşmeyi kesin olarak kabul ettiği anlamına
                                gelmektedir. {'\n\n'}4 - TELİF HAKLARI{'\n\n'}
                                Sınavia isimli mobil uygulamanın münhasır hak
                                sahipleri Arda Nakışçı ve Nurettin Hakan
                                Yılmaz’dır. İşbu uygulama üzerinde her tür
                                organizasyon, kullanım ve tasarruf yetkisi bu
                                kişilere ait olup; sözleşme şartları da dahil
                                olmak üzere, uygulama ve uygulama uzantılarında
                                mevcut her tür koşulu, bilgiyi ve içeriği,
                                önceden herhangi bir ihtara gerek olmaksızın
                                değiştirme hakkını saklı tutar. Değişiklikler
                                uygulamada yayım anında yürürlüğe girer.
                                Uygulama içeriğinde bulunan (sorular ve sorulara
                                ilişkin soru çözümleri haricinde) tüm yazılım
                                ürünleri ve yazı, makale, fotoğraf, resim,
                                doküman, animasyon, video ve bunlarla sınırlı
                                olmamak üzere bütün ürünlerin her türlü fikri ve
                                sınai mülkiyet hakları Sınavia’ya aittir ve ürün
                                ve içeriklerin hiçbiri yazılı izin olmadan
                                kullanılamaz. Bu ürün ve içeriklerin herhangi
                                bir amaçla kopya edilmeleri, tekrar
                                üretilmeleri, habersiz ve izinsiz kullanımları
                                ve dağıtımları yasaktır. Uygulamada yayımlanan
                                fotoğraflar, video görüntüleri, animasyonlar,
                                yazılar ve diğer yazılı ve görsel materyaller,
                                hak sahipleri ….. izni alınmadan hiçbir şekilde
                                başka mobil uygulamada veya başka bir mecrada
                                kısmen veya tamamen herhangi bir teknolojik
                                yöntemle yayınlanamaz, kopyalanamaz,
                                çoğaltılamaz, dağıtılamaz, içeriğinde ekleme,
                                silme veya diğer herhangi bir değişiklik
                                yapılamaz. {'\n\n'}5 - ÜYELİK KULLANIM ŞARTLARI
                                {'\n\n'}Uygulama üyeliği, kullanıcı olmak
                                isteyen kişi tarafından uygulamaya üye olmak
                                için gerekli bilgilerinin gönderilmesi suretiyle
                                kayıt işleminin yaptırılması ve şirket
                                tarafından kayıt işleminin onaylanması ile
                                tamamlanır. Kullanıcı, uygulamanın kullanımından
                                doğan tüm sorumluluğu ve riski üstlendiğini
                                kabul eder. Şirket, uygulamayı ve içeriğine
                                dahil tüm unsurları olduğu gibi sağlamaktadır ve
                                uygulama hakkında veya uygulama yoluyla sağlanan
                                hiçbir servis, bilgi veya uygulama içeriğine
                                dahil herhangi bir unsur veya uygulamanın
                                herhangi bir şekilde kullanımı hakkında açık
                                veya dolaylı garantiler sağlamamaktadır.
                                Uygulama yoluyla sağlanan tüm düşünce, tavsiye,
                                hizmet veya diğer bilgi ve materyalin doğruluk,
                                tamlık ve kullanılabilirliğini değerlendirmek
                                yalnızca kullanıcının sorumluluğundadır.
                                Uygulamaya üye olan ya da ziyaret eden
                                kullanıcıların bilgileri, şirket tarafından
                                gerekli görüldüğü takdirde, üçüncü kişilerle
                                paylaşılabilir. Kişisel bilgiler, gerektiğinde
                                kullanıcıyla temas kurmak için de
                                kullanılabilir. Şirket tarafından talep edilen
                                bilgiler veya kullanıcı tarafından sağlanan
                                bilgiler veya mobil uygulama üzerinden yapılan
                                işlemlerle ilgili bilgiler, şirket ve iş birliği
                                içinde olduğu kişiler tarafından, şirketin
                                üyeleri ve müşterileri ile yaptığı sözleşmeler
                                ile belirlenen amaçlar ve kapsam dışında olsa
                                dahi, kullanıcının kimliği ifşa edilmemek
                                kaydıyla, çeşitli istatistiksel değerlendirmeler
                                yapmak, veri tabanı oluşturmak, pazar
                                araştırmaları yapmak veya benzer sebeplerle de
                                kullanılabilir. Şirket, mobil uygulama dahilinde
                                başka uygulamalara link verebilir. Şirket, link
                                vasıtasıyla erişilen uygulamaların gizlilik
                                uygulamaları ve içeriklerine yönelik herhangi
                                bir sorumluluk taşımamaktadır. {'\n\n'}6 -
                                KULLANICININ SORUMLULUKLARI{'\n\n'}
                                Kullanıcı, şirket servislerinden yararlandığı
                                sırada, kayıt formunda yer alan bilgilerin doğru
                                olduğunu ve bu bilgilerin gerekli olduğu (şifre
                                unutma gibi) durumlarda bilginin hatalı veya
                                noksan olmasından doğacak zararlardan dolayı
                                sorumluluğun kendisine ait olduğunu, bu hallerde
                                kullanımının sona erebileceğini, şirket
                                tarafından verilen servislerin ve yazılımların
                                telif hakkının şirkete ve/veya şirkete lisans
                                veren veya içerik sağlayan kişilere ait
                                olduğunu, fikri mülkiyet hukuku kapsamında
                                korunduğunu ihlali durumunda hukuki ve cezai
                                olarak sorumlu olacağını bu yazılımları ya da
                                servisleri hiçbir şekilde izinsiz çoğaltıp
                                dağıtmayacağını, yayınlamayacağını,
                                pazarlamayacağını, şirket servislerini
                                kullandığında ileri sürdüğü şahsi fikir, düşünce
                                ve ifadelerin, şirket ortamına eklediği
                                dosyaların sorumluluğunun kendisine ait olduğunu
                                ve şirketin bu dosyalardan dolayı hiçbir şekilde
                                sorumlu tutulamayacağını, şirket ortamında
                                uygulama geneline zarar verecek veya şirketi
                                başka uygulamalarla hukuki ihtilafa getirecek
                                herhangi bir yazılım veya materyal
                                bulunduramayacağını, paylaşamayacağını ve cezai
                                bir durum doğarsa tüm cezai sorumlulukları
                                üstüne aldığını, servislerin kullanımı sırasında
                                kaybolacak, ve/veya eksik alınacak, yanlış
                                adrese iletilecek bilgi, mesaj ve dosyalardan
                                şirketin sorumlu olmayacağını, şirkette sunulan
                                hizmetlere, şirket tarafından belirlenen şekil
                                dışında ve yetkisiz şekilde ulaşmamayı ve
                                yazılım ile servislerin özelliklerini hiçbir
                                şekilde değiştirmemeyi, değiştirilmiş olduğu
                                belli olanları kullanmamayı ve sözü geçen
                                maddelere uymadığı durumlarda şirketin
                                uğrayabileceği tüm maddi ve manevi zararları
                                ödemeyi, kullanıcı verilerinin şirketin ihmali
                                görülmeden yetkisiz kişilerce okunmasından
                                (üyenin bilgilerini başka kişiler ile
                                paylaşması, uygulamadan ayrılırken çıkış
                                yapmaması, vb. durumlardan) dolayı gelebilecek
                                zararlardan ötürü şirketin sorumlu olmayacağını,
                                tehdit edici, ahlak dışı, ırkçı, ayrımcı,
                                Türkiye Cumhuriyeti Yasalarına, vatandaşı olduğu
                                diğer ülkelerin yasalarına ve uluslararası
                                anlaşmalara aykırı ortama eklenecek
                                yazışmaların, konu başlıklarının, rumuzların,
                                profil fotoğrafı ve kapak fotoğraflarının genel
                                ahlak, görgü ve hukuk kurallarına uygun
                                olmasını, diğer kullanıcıları taciz ve tehdit
                                etmemeyi, diğer kullanıcıların servisi
                                kullanmasını etkileyecek şekilde davranmamayı,
                                diğer kullanıcıların bilgisayarındaki bilgilere
                                ya da yazılıma zarar verecek bilgi veya
                                programlar göndermemeyi, şirket servislerini
                                kullanarak elde edilen herhangi bir kayıt veya
                                elde edilmiş malzemelerin tamamıyla kullanıcının
                                rızası dahilinde olduğunu, kullanıcı
                                bilgisayarında yaratacağı arızalar, bilgi kaybı
                                ve diğer kayıpların sorumluluğunun tamamıyla
                                kendisine ait olduğunu, servisin kullanımından
                                dolayı uğrayabileceği zararlardan dolayı
                                şirketten tazminat talep etmemeyi, şirket
                                servislerini ticari ya da reklam amacıyla
                                kullanmamayı, şirketin dilediği zaman veya
                                sürekli olarak tüm sistemi izleyebileceğini,
                                kurallara aykırı davrandığı takdirde şirketin
                                gerekli müdahalelerde bulunma, kullanıcıyı
                                servis dışına çıkarma ve kullanıcılığına son
                                verme hakkına sahip olduğunu, şirketin kendi
                                sistemini ticari amaçla kullanabileceğini,
                                kanunlara göre postalanması yasak olan bilgileri
                                postalamamayı ve zincir posta, yazılım virüsü
                                vb. gibi gönderilme yetkisi olmayan postaları
                                dağıtmamayı, başkalarına ait olan kişisel
                                bilgileri kayıt etmemeyi, kötüye kullanmamayı,
                                kullanıcı adıyla yapacağı her türlü işlemden
                                bizzat kendisinin sorumlu olduğunu,
                                kullanıcılığı tek taraflı olarak iptal ettirse
                                bile, bu iptal işleminden önce, üyeliği
                                sırasında gerçekleştirdiği işlem ve eylemlerden
                                sorumlu olacağını, tüm bu maddeleri daha sonra
                                hiçbir itiraza mahal vermeyecek şekilde
                                okuduğunu, Kabul ve taahhüt etmiştir. {'\n\n'}7
                                - ŞİRKETİN HAK VE YÜKÜMLÜLÜKLERİ{'\n\n'}
                                Şirket herhangi bir zamanda sistemin çalışmasını
                                geçici bir süre askıya alabilir veya tamamen
                                durdurabilir. Sistemin geçici bir süre askıya
                                alınması veya tamamen durdurulmasından dolayı
                                şirketin kullanıcılarına veya üçüncü şahıslara
                                karşı hiçbir sorumluluğu olmayacaktır. Şirket,
                                servislerinin her zaman ve her şart altında
                                zamanında, güvenli ve hatasız olarak
                                sunulacağını, servis kullanımından elde edilen
                                sonuçların her zaman doğru ve güvenilir
                                olacağını, servis kalitesinin herkesin
                                beklentilerine cevap vereceğini taahhüt etmez.
                                Şirket kendi uygulaması üstünden yapılan ve
                                zarar doğurabilecek her türlü haberleşmeyi,
                                yayını, bilgi aktarımını istediği zaman kesme
                                hakkını ve gereken koşullar oluştuğu takdirde
                                kullanıcıyı servislerden men etme ve
                                kullanıcılığına son verme hakkını saklı tutar.
                                Şirket, kullanıcıların dosyalarının saklanması
                                için uygun göreceği büyüklükte kota tahsisi
                                yapabilir. İhtiyaca göre kotaları artırma ve
                                azaltma yetkisini saklı tutar. Şirket,
                                kullanıcıların servislerden yararlanmaları
                                sırasında ortamda bulunduracakları dosyaların,
                                mesajların, bilgilerin bazılarını veya tamamını
                                uygun göreceği periyodlarla yedekleme ve silme
                                yetkisine sahiptir. Yedekleme ve silme
                                işlemlerinden dolayı şirket sorumlu
                                tutulmayacaktır. Şirket kullanıcıların ürettiği
                                ve yayınlanmak üzere kendi iradesiyle sisteme
                                yüklediği (örneğin panoya eklediği mesaj, şiir,
                                haber, dosya, web sayfası gibi) bilgi, belge,
                                yazılım, tasarım, grafik, resim vb. eserleri
                                tanıtım, duyurum amacı ile yayınlama ve/veya
                                uygulama içerisinde şirket tarafından uygun
                                görülecek başka bir adrese taşıma haklarına
                                sahiptir. Yayınlanan bu bilgilerin başka
                                kullanıcılar tarafından kopyalanması ve/veya
                                yayınlanması ihtimal dahilindedir. Bu hallerde
                                kullanıcı, Şirketten telif ve benzeri hiçbir
                                ücret talep etmeyecektir. Kullanıcılar
                                başkalarına ait fikri ve sınai mülkiyet
                                haklarının korunması için gerekli özeni
                                göstermekle yükümlüdür. Kullanıcılar sadece
                                telif hakları kendisine ait olan içeriği sisteme
                                yükleyebilir. Eğer kullanıcı fikri ve sınai
                                mülkiyet hakları başkasına ait olan yazı,
                                fotoğraf, resim, logo, video ve sair içeriği,
                                söz konusu eser ve hak sahiplerinin izni
                                olmaksızın sisteme yüklerse, Şirket, ihlale konu
                                olan içeriği derhal yayından kaldırmak ve
                                gerektiğinde bu ihlali gerçekleştiren
                                kullanıcıların kullanımına son vermek haklarına
                                sahiptir. Üçüncü şahısların fikri ve sınai
                                mülkiyet haklarını ihlal eden kullanıcılar, bu
                                ihlallerden ve bu ihlallerden doğan her türlü
                                zarardan üçüncü şahıslar ile kamu kurum ve
                                kuruluşlarına karşı hukuki ve cezai olarak
                                bizzat sorumludurlar. Şirket kullanıcının başka
                                web-uygulamalarına geçişini sağlayabilir. Bu
                                taktirde kullanıcı geçiş yapacağı uygulamaların
                                içeriğinden Şirket’in sorumlu olmadığını kabul
                                eder. Link verilmesi, link verilen web
                                uygulamalarının içeriğinin Şirket tarafından
                                onaylandığı anlamına gelmez. Şirket, ileride
                                doğacak teknik zaruretler ve mevzuata uyum
                                amacıyla kullanıcılara haber vermek zorunda
                                olmadan işbu sözleşmenin uygulamasında
                                değişiklikler yapabileceği gibi mevcut
                                maddelerini değiştirebilir, iptal edebilir veya
                                yeni maddeler ilave edebilir. Servisler ile
                                ilgili değişiklikler uygulama içerisinde
                                duyurulacaktır ve gerektiğinde kullanıcının
                                hizmetlerden yararlanabilmesi için sözleşme
                                değişikliklerini ilgili butonu tıklamak
                                suretiyle onaylaması istenecektir. Şirket üyelik
                                gerektirmeyen servisleri zaman içerisinde üyelik
                                gerektiren bir duruma dönüştürülebilir. Şirket
                                ilave servisler açabilir, bazı servislerini
                                kısmen ya da tamamen değiştirebilir veya ücretli
                                hale dönüştürebilir.
                                {'\n\n'}8 - KULLANICININ YÜKÜMLÜLÜKLERİ{'\n\n'}
                                Kullanıcı, üyelik prosedürlerini yerine
                                getirirken, uygulamadan faydalanırken veya
                                uygulamayla ilgili herhangi bir işlem yaparken,
                                sözleşmedeki bütün şartlara, bulunması halinde
                                uygulamanın ilgili yerlerinde belirtilen diğer
                                kurallara ve yürürlükteki tüm mevzuata uygun
                                hareket edeceğini kabul, beyan ve taahhüt eder.
                                Kullanıcı, Türkiye Cumhuriyeti Yasalarına ve
                                uluslararası sözleşmelere aykırı, zararlı,
                                tehdit, hakaret ve sövme içeren, suiistimal veya
                                taciz edici, haksız fiil veya iftira
                                niteliğinde, kaba, müstehcen, kötüleyici veya
                                başka birinin gizlilik haklarını ihlal
                                edebilecek şekilde veya diğer herhangi bir
                                biçimde, hukuki ve cezai sorumluluğunu
                                gerektiren hiçbir mesaj, kullanıcı adı, bilgi,
                                veri, metin, yazılım veya imajlar veya diğer
                                herhangi bir tür materyali uygulamaya dahil
                                etmeyecektir. Kullanıcı, yürürlükteki mevzuat
                                hükümleri gereğince veya diğer kullanıcılar ile
                                üçüncü şahısların haklarının ihlal edildiğinin
                                iddia edilmesi durumlarında, şirketin, kendisine
                                ait her türlü bilgiyi (kişisel bilgiler de dahil
                                olmak üzere) gerek resmi makamlara ve gerekse
                                hak sahibi kişilere açıklamaya yetkili olacağını
                                ve bu sebeple şirketten her ne nam altında
                                olursa olsun herhangi bir tazminat talep
                                edilemeyeceğini kabul, beyan ve taahhüt eder.
                                İnternet uygulamasına erişim için gerekli
                                bilgilerin (kullanıcı adı, şifre, vb.)
                                güvenliği, saklanması, üçüncü kişilerin
                                bilgisinden uzak tutulması ve kullanılması
                                durumlarıyla ilgili hususlar tamamen
                                kullanıcının sorumluluğundadır. Şirketin, bu
                                bilgilerin güvenliği, saklanması, üçüncü
                                kişilerin bilgisinden uzak tutulması,
                                kullanılması gibi hususlarda, kullanıcının
                                ve/veya üçüncü kişilerin uğradığı veya
                                uğrayabileceği zararlardan dolayı, doğrudan veya
                                dolaylı, herhangi bir sorumluluğu yoktur.
                                Kullanıcı, kendileri tarafından sağlanan bilgi
                                ve içeriklerin doğru ve hukuka uygun olduğunu
                                kabul, beyan ve taahhüt eder. Şirketin,
                                kullanıcı tarafından kendisine iletilen veya
                                uygulama üzerinden yüklenen, değiştirilen veya
                                sağlanan bilgi ve içeriklerin doğruluğunu
                                araştırma, bu bilgi ve içeriklerin güvenli,
                                doğru ve hukuka uygun olduğunu taahhüt ve
                                garanti etmek gibi bir sorumluluğu bulunmadığı
                                gibi; Şirket, söz konusu bilgi ve içeriklerin
                                yanlış veya hatalı olmasından dolayı ortaya
                                çıkacak hiçbir zarardan da sorumlu tutulamaz.
                                Kullanıcıların birbirleri ya da üçüncü
                                şahıslarla olan ilişkileri kullanıcıların
                                sorumluluğundadır. Kullanıcı, şirketin yazılı
                                onayı olmadan, işbu sözleşmeden doğan hak ve
                                yükümlülüklerini, kısmen veya tamamen
                                devredemez. Kullanıcının, uygulama dahilinde
                                yaptığı her işlem ve eylemdeki hukuki ve cezai
                                sorumluluk kendisine aittir. Kullanıcı, şirketin
                                ve/veya üçüncü bir şahısların haklarına tecavüz
                                teşkil edecek şekilde, uygulama dahilinde
                                bulunan resimleri, metinleri, görsel ve işitsel
                                imgeleri, video kliplerini, dosyaları, veri
                                tabanlarını, katalogları ve listeleri
                                çoğaltmayacağını, kopyalamayacağını,
                                dağıtmayacağını, işlemeyeceğini gerek bu
                                eylemleri ile gerekse de başka yollarla Şirket
                                ile doğrudan veya dolaylı olarak rekabete
                                girmeyeceğini kabul, beyan ve taahhüt eder.
                                Şirket, kullanıcının, uygulama üzerinde
                                gerçekleştirdikleri faaliyetler nedeniyle üçüncü
                                kişilerin uğradıkları veya uğrayabilecekleri
                                zararlardan doğrudan ve/veya dolaylı olarak,
                                hiçbir şekilde sorumlu tutulamaz. Kullanıcının
                                gerçekleştirdikleri eylemler sebebiyle, Şirketin
                                sorumluluğuna gidilmesi durumunda, şirketin
                                zararı, kullanıcı tarafından karşılanacaktır.
                                Kullanıcı ve/veya üçüncü kişiler tarafından
                                uygulamada sağlanan hizmetlerden ve/veya
                                yayınlanan içeriklerden dolayı şirketin, şirket
                                çalışanlarının veya yöneticilerinin sorumluluğu
                                bulunmamaktadır. Herhangi bir üçüncü kişi
                                tarafından sağlanan ve yayınlanan bilgilerin,
                                içeriklerin, görsel ve işitsel imgelerin
                                doğruluğu ve hukuka uygunluğunun taahhüdü,
                                bütünüyle bu eylemleri gerçekleştiren kişilerin
                                sorumluluğundadır. Şirket, kullanıcı ve/veya
                                üçüncü kişiler tarafından uygulamada sağlanan
                                hizmetlerin ve/veya yayınlanan içeriklerin
                                güvenliğini, doğruluğunu ve hukuka uygunluğunu
                                taahhüt ve garanti etmemektedir. Kullanıcı;
                                şirketin, uygulama üzerinden gerçekleştireceği
                                her türlü çekiliş ve hediye kampanyası
                                kapsamında, çekişlilere katılmaya veya hediyeye
                                hak kazanan kullanıcıların kullanıcı
                                bilgilerini, kampanya ve çekiliş ile ilgili kişi
                                ve kurumlarla paylaşmasına onay verdiğini ve bu
                                sebeple şirketten herhangi bir tazminat
                                talebinde bulunmayacağını kabul, beyan ve
                                taahhüt eder.
                                {'\n\n'}9 - MÜCBİR SEBEPLER{'\n\n'}
                                Hukuken mücbir sebep sayılan tüm hallerde
                                şirket, işbu sözleşme ile belirlenen
                                yükümlülüklerinden herhangi birini geç veya
                                eksik ifa etme veya ifa etmeme nedeniyle yükümlü
                                değildir. Bu ve bunun gibi durumlar, şirket
                                için, gecikme, eksik ifa etme veya ifa etmeme
                                veya temerrüt olarak değerlendirilmeyecek ve bu
                                durumlar için şirketten herhangi bir nam altında
                                tazminat talep edilemeyecektir. "Mücbir sebep"
                                terimi, doğal afet, isyan, savaş, grev, iletişim
                                sorunları, altyapı ve internet arızaları,
                                elektrik kesintisi ve kötü hava koşulları da
                                dahil ve fakat bunlarla sınırlı olmamak
                                kaydıyla, ilgili tarafın makul kontrolü
                                haricinde ve gerekli özeni göstermesine rağmen
                                önleyemediği, kaçınılamayacak olaylar olarak
                                yorumlanacaktır. Şirket, sözleşmenin ihlali,
                                haksız fiil, ihmal veya diğer sebepler
                                neticesinde; işlemin kesintiye uğraması, hata,
                                ihmal, kesinti, silinme, kayıp, işlemin veya
                                iletişimin gecikmesi, bilgisayar virüsü,
                                iletişim hatası, hırsızlık, imha veya izinsiz
                                olarak kayıtlara girilmesi, değiştirilmesi veya
                                kullanılması hususunda herhangi bir sorumluluk
                                kabul etmez.{'\n\n'}
                                10 - DELİL SÖZLEŞMESİ{'\n\n'}Kullanıcı, bu
                                sözleşmeden doğabilecek ihtilaflarda bilgisayar
                                kayıtlarının, 6100 Sayılı HMK 193. Madde
                                anlamında muteber, bağlayıcı, kesin ve münhasır
                                delil teşkil edeceğini ve bu maddenin delil
                                sözleşmesi niteliğinde olduğunu beyan ve taahhüt
                                eder.{'\n\n'}
                                11 - SÖZLEŞMENİN FESHİ{'\n\n'}İşbu sözleşme,
                                kullanıcının uygulamaya üye olduğu ve/veya
                                uygulamayı kullandığı sürece yürürlükte kalacak
                                ve taraflar arası hüküm ve sonuçlarını doğurmaya
                                devam edecektir. Öncelikle şirket, dilediği
                                zaman, herhangi bir ihbar ve ihtarda
                                bulunmaksızın, işbu sözleşmeyi feshedebilir.
                                Şirket, kullanıcının, işbu sözleşmede belirtilen
                                yükümlülüklerini ihlal etmesi durumunda
                                sözleşmeyi tek taraflı olarak feshedebilecektir.
                                Aşağıda belirtilen durumlar ayrıca fesih
                                sebebidir. Bu durumda, kullanıcı, şirketin
                                uğradığı bütün zararları tazmin etmekle
                                yükümlüdür.{'\n\n'}• Kullanıcının, herhangi bir
                                yöntem kullanarak, uygulamanın işleyişini
                                manipüle edecek davranışlarda bulunması.{'\n\n'}
                                • Kullanıcının kendisi için oluşturulmuş
                                kullanıcı profilini başkasına devretmesi veya
                                kullanıma açması.{'\n\n'}• Kullanıcının üçüncü
                                kişilerin haklarına tecavüz eden ve/veya etme
                                tehlikesi bulunan fillerde bulunması.{'\n\n'}•
                                Kullanıcının, yanlış, eksik ve yanıltıcı
                                bilgileri, genel ahlak kurallarına uygun olmayan
                                ifadeleri içeren, kişilik haklarına saldırı
                                mahiyetinde olan ve Türkiye Cumhuriyeti
                                yasalarına uygun olmayan bilgilerin uygulamaya
                                kaydedilmesi.{'\n\n'}• Uygulamanın genel
                                güvenliğini tehdit edecek, uygulamanın ve
                                kullanılan yazılımların çalışmasını engelleyecek
                                yazılımların kullanılması, faaliyetlerin
                                yapılması, yapılmaya çalışılması ve bilgilerin
                                alınması, silinmesi, değiştirilmesi.{'\n\n'}
                                12 - UYGULANACAK HUKUK VE YETKİ{'\n\n'}İşbu
                                sözleşmenin yorum ve uygulanması sebebiyle
                                doğabilecek ihtilafların çözümünde Türkiye
                                Cumhuriyeti Kanunları uygulanacaktır. Yine, her
                                türlü ihtilafın hallinde, İzmir Mahkemeleri ve
                                İcra Daireleri yetkilidir.
                                {'\n\n\n'}
                                AÇIK RIZA BEYANI{'\n\n'}
                                Tarafıma tebliğ edilen, okuduğumu, anladığımı
                                kabul ve beyan ettiğim Aydınlatma Metni ile iş
                                bu açık rıza beyanı kapsamında;{'\n\n'}Aşağıda
                                yer alan kişisel verilerimin aramızdaki ilişki
                                kapsamında; yayınladığımız Sınavia isimli mobil
                                uygulamanın daha verimli çalışması için, Veri
                                Sorumlusu olan “Sınavia (Arda Nakışçı ve
                                Nurettin Hakan Yılmaz)” tarafından,{'\n\n'}6698
                                sayılı Kişisel Verilerin Korunması Kanunundaki
                                esaslar ile aşağıda yer alan amaçlar
                                çerçevesinde toplanmasına, kaydedilmesine,
                                saklanmasına, aşağıda yer alan alıcı grupları
                                ile paylaşılmasına, sınırlı şekilde işlenmesine
                                {'\n\n'}Tarafımız ile aramdaki ilişki sona
                                erdikten sonra kanunda yer alan zamanaşımı
                                sürelerinin sonuna kadar ve aşağıda açıkça
                                gösterilen süreler kapsamında saklanmasına
                                hiçbir baskı altında kalmadan, koşulsuz olarak
                                açık bir şekilde rıza gösterdiğimi kabul, beyan
                                ve taahhüt ederim.{'\n\n'}Tarafımdan Alınan
                                Kişisel Veriler{'\n\n'}“Uygulamadaki Kullanıcı
                                Adı ve Şifre”, “Ad, Soyad”, “Doğum Tarihi”,
                                “Yaşanılan Şehir”, “Fotoğraf (yüklenilmiş ise)”,
                                “Soru-Cevap İstatistikleri”, “Alışveriş Geçmişi
                                Bilgileri”
                                {'\n\n'}Tarafımdan Alınan Kişisel Verilerin
                                İşlenme Amaçları{'\n\n'}1-) Oyunun daha verimli
                                çalışması için{'\n'}2-) Oyun içi istatistiklerin
                                belirlenmesi için{'\n'}3-) Finansal ve muhasebe
                                işlemlerinin yürütülmesi{'\n'}4-) Oyun içi
                                sıralamaların oluşturulması için{'\n\n'}
                                Tarafımdan Alınan Kişisel Verilerin Paylaşıldığı
                                Alıcı Grupları{'\n\n'}1-) Gerektiğinde Yetkili
                                Kamu Kurum ve Kuruluşları{'\n'}2-) Özel Hukuk
                                Gerçek veya Tüzel Kişileri Alınan Verilerin
                                Saklama Süreleri{'\n\n'}“Uygulamadaki Kullanıcı
                                Adı ve Şifre” = 6 Ay{'\n'}“Ad, Soyad” - 6 Ay
                                {'\n'}
                                “Doğum Tarihi” - 6 Ay{'\n'}“Yaşanılan Şehir” - 6
                                Ay{'\n'}“Fotoğraf (yüklenilmiş ise)” - 6 Ay
                                {'\n'}
                                “Alışveriş Geçmişi Bilgileri” - 6 Ay
                                {'\n\n\n'}
                                AYDINLATMA METNİ{'\n\n'}1 - Giriş{'\n\n'}Veri
                                Sorumlusu sıfatıyla “Sınavia (Arda Nakışçı ve
                                Nurettin Hakan Yılmaz)” olarak siz üyelerimizin
                                Kişisel Verilerinin Güvenliği meselesi bizim
                                için çok önemli bir husustur. Bu aydınlatma
                                metni, 6698 sayılı Kişisel Verilerin Korunması
                                Kanunun 10. Maddesi ile Aydınlatma
                                Yükümlülüğünün Yerine Getirilmesinde Uyulacak
                                Usul ve Esaslar Hakkında Tebliğ kapsamında
                                hazırlanmıştır.{'\n\n'}2 - Kişisel Verileriniz
                                Hangi Amaçla İşleniyor?{'\n\n'}Kişisel
                                verileriniz; Sınavia ile aranızdaki üye (oyuna
                                kaydolan) ilişkisi çerçevesinde, 6698 sayılı
                                Kişisel Verilerin Korunması Kanununun (“KVKK”)
                                çizdiği sınırlar içerisinde, aşağıda sayılan
                                amaçlar doğrultusunda işlenmektedir.{'\n\n'}Bu
                                amaçlar:{'\n'}
                                a-) Oyunun daha verimli çalışması için{'\n'}b-)
                                Oyun içi istatistiklerin belirlenmesi için{'\n'}
                                c-) Finansal ve muhasebe işlemlerinin
                                yürütülmesi
                                {'\n'}d-) Oyun içi sıralamaların oluşturulması
                                için şeklindedir.{'\n\n'}3 - Kişisel
                                Verilerinizin Kimlere ve Hangi Amaçla
                                Aktarılacağı{'\n\n'}
                                Verileriniz Mevzuatta yer alan istisnai haller
                                ve kanunlar kapsamı hariç diğer gerçek veya
                                tüzel kişiler ile paylaşılmamakta ve yurt dışına
                                aktarılmamaktadır.{'\n\n'}4 - Kişisel
                                Verilerinizin Toplamanın Yöntemi ve Hukuki
                                Sebebi{'\n\n'}Verileriniz her türlü elektronik
                                ve yazılı yöntemle; yukarıda yer verilen amaçlar
                                doğrultusunda, üye (oyuna kaydolan) ilişkisi
                                kapsamında, tarafımızın sözleşme ve yasadan
                                doğan mesuliyetlerini eksiksiz ve doğru bir
                                şekilde yerine getirilebilmesi, veri
                                sorumlusunun meşru menfaati hukuki sebepleriyle
                                edinilir.{'\n\n'}5 - Kişisel Verilerin
                                Korunmasına İlişkin Önlemler{'\n\n'}Sınavia
                                olarak kişisel verilerin korunması konusunda
                                kanunun ön gördüğü hukuki, idari ve teknik
                                tedbirleri uygulamakta ve bu verilerin
                                işlenmesinde kanunun ilgili tüm Maddeleri
                                kapsamında gerekli tüm önlemleri almaktayız.
                                {'\n\n'}6 - Kişisel Veri Sahibinin KVKK’nın 11.
                                Maddesinde Sayılan Hakları{'\n\n'}Kişisel veri
                                sahipleri olarak, haklarınıza ilişkin
                                taleplerinizi; aşağıda düzenlenen yöntemlerle
                                tarafımıza iletmeniz durumunda, tarafımız
                                talebin niteliğine göre en geç 30 gün içerisinde
                                ücretsiz olarak sonuçlandıracaktır.{'\n\n'}Bu
                                kapsamda kişisel veri sahipleri;{'\n'}1-)
                                Kişisel veri işlenip işlenmediğini öğrenme,
                                {'\n'}2-) Kişisel veri işlenmişse buna ilişkin
                                bilgi talep etme,{'\n'}3-) Kişisel verilerin
                                işlenme amacı ve bunların amacına uygun
                                kullanılıp kullanılmadığını öğrenme,{'\n'}4-)
                                Yurt içinde ve yurt dışında kişisel verilerin
                                aktarıldığı üçüncü kişileri bilme,{'\n'}5-)
                                Kişisel verilerin eksik veya yanlış işlenmiş
                                olması halinde bunların düzeltilmesini isteme,
                                {'\n'}
                                6-) KVKK 7. Maddesinde öngörülen şartlar
                                çerçevesinde kişisel verilerin silinmesi veya
                                yok edilmesini isteme,{'\n'}7-) (5) ve (6)
                                numaralı bentler uyarınca yapılan işlemlerin,
                                kişisel verilerin aktarıldığı üçüncü kişilere
                                bildirilmesini isteme,{'\n'}8-) İşlenen
                                verilerin münhasıran otomatik sistemler
                                vasıtasıyla analiz edilmesi suretiyle kişinin
                                kendisi aleyhine bir sonucun ortaya çıkmasına
                                itiraz etme,{'\n'}9-) Kişisel verilerin kanuna
                                aykırı olarak işlenmesi sebebiyle zarara
                                uğraması halinde zararın giderilmesini talep
                                etme haklarına sahiptir.{'\n\n'}
                                KVKK’ nın 13. Maddesinin 1. Fıkrası gereğince,
                                yukarıda belirtilen haklarınızı kullanmak ile
                                ilgili talebinizi, yazılı olarak veya kanunda
                                öngörülen şekilde tarafımıza iletebilirsiniz. Şu
                                an itibarıyla Kişisel Verilerinizin Korunmasına
                                İlişkin taleplerinizi; iletisim@sinavia.app mail
                                adresine e-posta aracılığı ile tarafımıza
                                iletebilirsiniz. Bu çerçevede tarafımıza e-posta
                                başvurunuzu sistemde kayıtlı bulunan e-posta
                                adresiniz üzerinden açık, anlaşır bir şekilde ve
                                kimlik, telefon numarası, adres bilgilerini
                                yukarıda gösterdiğimiz iletişim kanalından
                                tarafımıza iletebilirsiniz. {'\n\n'}Tarafımıza
                                iletilmiş olan başvurularınız KVKK’nın 13.
                                Maddesinin 2. Fıkrası gereğince, talebin
                                niteliğine göre talebinizin bizlere ulaştığı
                                tarihten itibaren otuz gün içinde
                                yanıtlanacaktır. Yanıtlarımız KVKK’nın 13.
                                Maddesi hükmü gereğince yazılı veya elektronik
                                ortamdan tarafınıza ulaştırılacaktır.
                            </Text>
                        </ScrollView>
                    </View>
                </Modal>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.imageContainer}>
                    <Image
                        source={SINAVIA_LOGO}
                        style={{
                            height: hp(33),
                            resizeMode: 'contain',
                            marginTop: hp(3),
                            marginLeft: wp(6)
                        }}
                    />
                    <Text style={styles.sinaviaText}>Sınavia</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                        borderRadius={hp(1.5)}
                        fontSize={hp(3)}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.login)
                        }}
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Kayıt Ol"
                        borderRadius={hp(1.5)}
                        fontSize={hp(3)}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.register)
                        }}
                    />
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.buttonContainer}>
                    {Platform.OS === 'ios' && (
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="black"
                            fontSize={hp(3)}
                            buttonText="Apple ile Bağlan"
                            borderRadius={hp(1.5)}
                            onPress={this.signInWithApple}
                        />
                    )}
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#d44638"
                        fontSize={hp(3)}
                        buttonText="Google ile Bağlan"
                        borderRadius={hp(1.5)}
                        onPress={this.signInWithGoogle}
                    />
                </View>
                <View style={styles.spaceView}>
                    <Text style={styles.oauthInfoText}>
                        {Platform.OS === 'ios'
                            ? 'Apple veya Google ile Bağlan seçeneklerini kullanarak '
                            : 'Google ile bağlan seçeneğini kullanarak '}
                        <Text
                            onPress={this.onPressLicenceView}
                            style={{
                                textDecorationLine: 'underline',
                                fontFamily: 'Averta-Semibold'
                            }}
                        >
                            Kullanıcı Sözleşmesi
                        </Text>
                        'ni kabul etmiş sayılırsın.
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    loginUser: userCredentials =>
        dispatch(clientActions.loginUser(userCredentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Opening)
