import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Modal,
    ScrollView
} from 'react-native'
import {
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import styles from './style'
import SwitchToggle from 'react-native-switch-toggle'
import moment from 'moment'
import NotchView from '../../../components/notchView'
import { showMessage } from 'react-native-flash-message'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import OPENED_EYE from '../../../assets/openedEye.png'
import CLOSED_EYE from '../../../assets/closedEye.png'
import { flashMessages } from '../../../services/flashMessageBuilder'
import BACK_BUTTON from '../../../assets/return.png'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Register related stuff
            birthDateUI: 'Doğum Tarihi  (Opsiyonel)',
            isDateTimePickerVisible: false,
            switchValue: false,
            showPasswordEyeFirst: false,
            showPasswordEyeSecond: false,
            hidePasswordFirst: true,
            hidePasswordSecond: true,
            dateColor: '#7A7878',
            // User Information
            username: '',
            name: '',
            lastname: '',
            city: '',
            email: '',
            password: '',
            secondPassword: '',
            birthDate: '',
            passwordBorderColor: '#989696',
            secondPasswordBorderColor: '#989696',
            isLicenceModalVisible: false,
            lisenceModalEverOpened: false,
            isAcceptButtonVisible: false
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePasswordFirst: !this.state.hidePasswordFirst })
        console.log(this.state.password)
    }

    managePasswordVisibility2 = () => {
        this.setState({ hidePasswordSecond: !this.state.hidePasswordSecond })
    }

    toggleSwitch = () => {
        if (this.state.lisenceModalEverOpened === false) {
            this.onPressLicenceView()
        } else {
            this.setState({ switchValue: !this.state.switchValue })
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false })
    }

    goToLoginScreen = () => {
        navigationPush(SCENE_KEYS.authScreens.login)
    }

    handleDatePicked = date => {
        this.hideDateTimePicker()
        this.setState({
            birthDate: date,
            birthDateUI: moment(new Date(date.toString().substr(0, 16))).format(
                'DD-MM-YYYY'
            ),
            dateColor: '#000'
        })
    }

    usernameOnChange = text => {
        this.setState({ username: text })
    }

    nameLastameOnChange = text => {
        let splittedText = text.split(/[ ,]+/)
        let name = splittedText[0]
        let lastname = splittedText[1]
        this.setState({ name: name, lastname: lastname })
    }

    cityOnChange = text => {
        this.setState({ city: text })
    }

    emailOnChange = text => {
        this.setState({ email: text })
    }

    passwordOnChange = text => {
        if (text === '') {
            this.setState({
                showPasswordEyeFirst: false
            })
        } else {
            this.setState({
                showPasswordEyeFirst: true,
                password: text
            })
        }
    }

    secondPasswordOnChange = text => {
        if (text === '') {
            this.setState({
                showPasswordEyeSecond: false
            })
        } else {
            this.setState({
                showPasswordEyeSecond: true,
                secondPassword: text
            })
        }
    }

    registerOnPress = () => {
        if (
            this.state.email === '' ||
            this.state.password === '' ||
            this.state.secondPassword === ''
        ) {
            flashMessages.authInfosOrSettingsError(
                'Boş alan hatası',
                'Bütün alanları doldurmalısın',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
        } else if (this.state.password.length < 6) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren en az 6, en fazla 16 karakterden oluşmalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ passwordBorderColor: 'red' })
        } else if (this.state.secondPassword.length < 6) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren en az 6, en fazla 16 karakterden oluşmalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ secondPasswordBorderColor: 'red' })
        } else if (this.state.password.includes(' ')) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren içerisinde boşluk bulunmamalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ passwordBoderColor: 'red' })
        } else if (this.state.secondPassword.includes(' ')) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren içerisinde boşluk bulunmamalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ secondPasswordBoderColor: 'red' })
        } else if (this.state.password !== this.state.secondPassword) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifreler birbiriyle uyuşmamaktadır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({
                passwordBorderColor: 'red',
                secondPasswordBorderColor: 'red'
            })
        } else if (this.state.switchValue === false) {
            flashMessages.authInfosOrSettingsError(
                'Son bir adım',
                'Kullanıcı sözleşmesini onaylamalısın',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
        } else {
            if (!this.props.isNetworkConnected) {
                showMessage({
                    message: 'Lütfen internet bağlantınızı kontrol ediniz',
                    type: 'danger',
                    duration: 2000,
                    titleStyle: styles.networkErrorStyle,
                    icon: 'auto'
                })
                return
            }

            this.props.userSignUp({
                email: this.state.email.replace(/ /g, ''),
                password: this.state.password.replace(/ /g, '')
            })
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    onPressLicenceView = () => {
        this.setState({
            isLicenceModalVisible: true,
            lisenceModalEverOpened: true
        })
    }

    closeLicenceView = () => {
        this.setState({
            isLicenceModalVisible: false
        })
    }

    acceptLicenceOnPress = () => {
        this.setState({
            switchValue: true,
            isLicenceModalVisible: false,
            isAcceptButtonVisible: false
        })
    }

    showAcceptButton = () => {
        this.setState({
            isAcceptButtonVisible: true
        })
    }

    closeAcceptButton = () => {
        this.setState({
            isAcceptButtonVisible: false
        })
    }

    render() {
        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize
        }) => {
            const paddingToBottom = 20
            return (
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
            )
        }

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <KeyboardAvoidingView
                    style={[styles.container]}
                    behavior={'position'}
                >
                    <Modal
                        visible={this.state.isLicenceModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        <TouchableOpacity
                            onPress={this.closeLicenceView}
                            style={styles.shadowView}
                        />
                        <View style={styles.licenceView}>
                            <ScrollView
                                ref={view => {
                                    this.scrollView = view
                                }}
                                style={styles.licenceScrollView}
                                onScroll={({ nativeEvent }) => {
                                    if (isCloseToBottom(nativeEvent)) {
                                        this.showAcceptButton()
                                    } else {
                                        this.closeAcceptButton()
                                    }
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text style={styles.userAgreementText}>
                                    KULLANICI SÖZLEŞMESİ {'\n\n'}1 - TARAFLAR
                                    {'\n\n'}İşbu kullanıcı sözleşmesi, (bundan
                                    böyle kısaca “Sözleşme” olarak anılacaktır),
                                    “Sınavia (Arda Nakışçı ve Hakan Yılmaz)” ile
                                    “kullanıcı” arasında, tarafların sorumluluk
                                    ve yükümlülüklerini belirtmek amacıyla
                                    düzenlenmiştir. Bu uygulama, kullanıcının
                                    işbu sözleşme koşullarını kabul etmesi
                                    halinde kullanımına sunulmuştur. Kullanıcı,
                                    uygulamaya üye olmakla, uygulamanın kullanım
                                    ve sözleşme kurallarını kabul etmiş
                                    bulunmaktadır. Kullanıcı, uygulamaya üye
                                    olmakla, sözleşmenin tamamını okuduğunu,
                                    içeriğini bütünü ile anladığını ve tüm
                                    hükümlerini onayladığını kabul, beyan ve
                                    taahhüt etmektedir. Kullanıcı, sözleşme
                                    hükümlerini kabul etmekle, uygulama içinde
                                    yer alan; kullanıma, üyeliğe ve hizmetlere
                                    ilişkin olarak, şirket tarafından yapılan
                                    bütün beyanları ve bu beyanlara uygun
                                    davranacağını da kabul etmiş bulunmaktadır.
                                    {'\n\n'}2 - TANIMLAR{'\n\n'}Şirket : Sınavia
                                    {'\n'}
                                    Kullanıcı : Uygulamaya üye olan ve/veya
                                    uygulamada sunulan hizmetlerden işbu
                                    sözleşmede belirtilen şartlar dahilinde
                                    yararlanan gerçek veya tüzel kişi.
                                    {'\n'}
                                    Uygulama : Sınavia isimli mobil uygulama,
                                    mobil cihazlarda çalışan mobil uygulama
                                    yazılımı ve bu yazılım ile bağlantılı olarak
                                    oluşturulan ürün ve hizmetlerin sunulduğu
                                    tüm sanal gerçeklik mecralarını ifade
                                    etmektedir.{'\n'}Ürün : Uygulamada satışa
                                    arz edilen her türlü mal ve/veya hizmet.{' '}
                                    {'\n\n'}3 - SÖZLEŞMENİN KONUSU
                                    {'\n\n'}İşbu sözleşmenin konusu, uygulamada
                                    sunulan hizmetlerden yararlanma şartlarının
                                    ve tarafların hak ve yükümlülüklerinin
                                    düzenlenmesidir. Şirket, işbu sözleşmede ve
                                    mobil uygulamada dilediği zaman değişiklik
                                    yapma hakkına sahiptir. Bu değişiklikler,
                                    değiştirilmiş sözleşmenin uygulamaya
                                    konulmasıyla derhal yürürlük kazanır.
                                    Kullanıcının uygulamaya devam eden erişimi
                                    veya devam eden uygulama kullanımı,
                                    değiştirilmiş sözleşmeyi kesin olarak kabul
                                    ettiği anlamına gelmektedir. {'\n\n'}4 -
                                    TELİF HAKLARI{'\n\n'}
                                    Sınavia isimli mobil uygulamanın münhasır
                                    hak sahipleri Arda Nakışçı ve Nurettin Hakan
                                    Yılmaz’dır. İşbu uygulama üzerinde her tür
                                    organizasyon, kullanım ve tasarruf yetkisi
                                    bu kişilere ait olup; sözleşme şartları da
                                    dahil olmak üzere, uygulama ve uygulama
                                    uzantılarında mevcut her tür koşulu, bilgiyi
                                    ve içeriği, önceden herhangi bir ihtara
                                    gerek olmaksızın değiştirme hakkını saklı
                                    tutar. Değişiklikler uygulamada yayım anında
                                    yürürlüğe girer. Uygulama içeriğinde bulunan
                                    (sorular ve sorulara ilişkin soru çözümleri
                                    haricinde) tüm yazılım ürünleri ve yazı,
                                    makale, fotoğraf, resim, doküman, animasyon,
                                    video ve bunlarla sınırlı olmamak üzere
                                    bütün ürünlerin her türlü fikri ve sınai
                                    mülkiyet hakları Sınavia’ya aittir ve ürün
                                    ve içeriklerin hiçbiri yazılı izin olmadan
                                    kullanılamaz. Bu ürün ve içeriklerin
                                    herhangi bir amaçla kopya edilmeleri, tekrar
                                    üretilmeleri, habersiz ve izinsiz
                                    kullanımları ve dağıtımları yasaktır.
                                    Uygulamada yayımlanan fotoğraflar, video
                                    görüntüleri, animasyonlar, yazılar ve diğer
                                    yazılı ve görsel materyaller, hak sahipleri
                                    ….. izni alınmadan hiçbir şekilde başka
                                    mobil uygulamada veya başka bir mecrada
                                    kısmen veya tamamen herhangi bir teknolojik
                                    yöntemle yayınlanamaz, kopyalanamaz,
                                    çoğaltılamaz, dağıtılamaz, içeriğinde
                                    ekleme, silme veya diğer herhangi bir
                                    değişiklik yapılamaz. {'\n\n'}5 - ÜYELİK
                                    KULLANIM ŞARTLARI
                                    {'\n\n'}Uygulama üyeliği, kullanıcı olmak
                                    isteyen kişi tarafından uygulamaya üye olmak
                                    için gerekli bilgilerinin gönderilmesi
                                    suretiyle kayıt işleminin yaptırılması ve
                                    şirket tarafından kayıt işleminin
                                    onaylanması ile tamamlanır. Kullanıcı,
                                    uygulamanın kullanımından doğan tüm
                                    sorumluluğu ve riski üstlendiğini kabul
                                    eder. Şirket, uygulamayı ve içeriğine dahil
                                    tüm unsurları olduğu gibi sağlamaktadır ve
                                    uygulama hakkında veya uygulama yoluyla
                                    sağlanan hiçbir servis, bilgi veya uygulama
                                    içeriğine dahil herhangi bir unsur veya
                                    uygulamanın herhangi bir şekilde kullanımı
                                    hakkında açık veya dolaylı garantiler
                                    sağlamamaktadır. Uygulama yoluyla sağlanan
                                    tüm düşünce, tavsiye, hizmet veya diğer
                                    bilgi ve materyalin doğruluk, tamlık ve
                                    kullanılabilirliğini değerlendirmek yalnızca
                                    kullanıcının sorumluluğundadır. Uygulamaya
                                    üye olan ya da ziyaret eden kullanıcıların
                                    bilgileri, şirket tarafından gerekli
                                    görüldüğü takdirde, üçüncü kişilerle
                                    paylaşılabilir. Kişisel bilgiler,
                                    gerektiğinde kullanıcıyla temas kurmak için
                                    de kullanılabilir. Şirket tarafından talep
                                    edilen bilgiler veya kullanıcı tarafından
                                    sağlanan bilgiler veya mobil uygulama
                                    üzerinden yapılan işlemlerle ilgili
                                    bilgiler, şirket ve iş birliği içinde olduğu
                                    kişiler tarafından, şirketin üyeleri ve
                                    müşterileri ile yaptığı sözleşmeler ile
                                    belirlenen amaçlar ve kapsam dışında olsa
                                    dahi, kullanıcının kimliği ifşa edilmemek
                                    kaydıyla, çeşitli istatistiksel
                                    değerlendirmeler yapmak, veri tabanı
                                    oluşturmak, pazar araştırmaları yapmak veya
                                    benzer sebeplerle de kullanılabilir. Şirket,
                                    mobil uygulama dahilinde başka uygulamalara
                                    link verebilir. Şirket, link vasıtasıyla
                                    erişilen uygulamaların gizlilik uygulamaları
                                    ve içeriklerine yönelik herhangi bir
                                    sorumluluk taşımamaktadır. {'\n\n'}6 -
                                    KULLANICININ SORUMLULUKLARI{'\n\n'}
                                    Kullanıcı, şirket servislerinden
                                    yararlandığı sırada, kayıt formunda yer alan
                                    bilgilerin doğru olduğunu ve bu bilgilerin
                                    gerekli olduğu (şifre unutma gibi)
                                    durumlarda bilginin hatalı veya noksan
                                    olmasından doğacak zararlardan dolayı
                                    sorumluluğun kendisine ait olduğunu, bu
                                    hallerde kullanımının sona erebileceğini,
                                    şirket tarafından verilen servislerin ve
                                    yazılımların telif hakkının şirkete ve/veya
                                    şirkete lisans veren veya içerik sağlayan
                                    kişilere ait olduğunu, fikri mülkiyet hukuku
                                    kapsamında korunduğunu ihlali durumunda
                                    hukuki ve cezai olarak sorumlu olacağını bu
                                    yazılımları ya da servisleri hiçbir şekilde
                                    izinsiz çoğaltıp dağıtmayacağını,
                                    yayınlamayacağını, pazarlamayacağını, şirket
                                    servislerini kullandığında ileri sürdüğü
                                    şahsi fikir, düşünce ve ifadelerin, şirket
                                    ortamına eklediği dosyaların sorumluluğunun
                                    kendisine ait olduğunu ve şirketin bu
                                    dosyalardan dolayı hiçbir şekilde sorumlu
                                    tutulamayacağını, şirket ortamında uygulama
                                    geneline zarar verecek veya şirketi başka
                                    uygulamalarla hukuki ihtilafa getirecek
                                    herhangi bir yazılım veya materyal
                                    bulunduramayacağını, paylaşamayacağını ve
                                    cezai bir durum doğarsa tüm cezai
                                    sorumlulukları üstüne aldığını, servislerin
                                    kullanımı sırasında kaybolacak, ve/veya
                                    eksik alınacak, yanlış adrese iletilecek
                                    bilgi, mesaj ve dosyalardan şirketin sorumlu
                                    olmayacağını, şirkette sunulan hizmetlere,
                                    şirket tarafından belirlenen şekil dışında
                                    ve yetkisiz şekilde ulaşmamayı ve yazılım
                                    ile servislerin özelliklerini hiçbir şekilde
                                    değiştirmemeyi, değiştirilmiş olduğu belli
                                    olanları kullanmamayı ve sözü geçen
                                    maddelere uymadığı durumlarda şirketin
                                    uğrayabileceği tüm maddi ve manevi zararları
                                    ödemeyi, kullanıcı verilerinin şirketin
                                    ihmali görülmeden yetkisiz kişilerce
                                    okunmasından (üyenin bilgilerini başka
                                    kişiler ile paylaşması, uygulamadan
                                    ayrılırken çıkış yapmaması, vb. durumlardan)
                                    dolayı gelebilecek zararlardan ötürü
                                    şirketin sorumlu olmayacağını, tehdit edici,
                                    ahlak dışı, ırkçı, ayrımcı, Türkiye
                                    Cumhuriyeti Yasalarına, vatandaşı olduğu
                                    diğer ülkelerin yasalarına ve uluslararası
                                    anlaşmalara aykırı ortama eklenecek
                                    yazışmaların, konu başlıklarının,
                                    rumuzların, profil fotoğrafı ve kapak
                                    fotoğraflarının genel ahlak, görgü ve hukuk
                                    kurallarına uygun olmasını, diğer
                                    kullanıcıları taciz ve tehdit etmemeyi,
                                    diğer kullanıcıların servisi kullanmasını
                                    etkileyecek şekilde davranmamayı, diğer
                                    kullanıcıların bilgisayarındaki bilgilere ya
                                    da yazılıma zarar verecek bilgi veya
                                    programlar göndermemeyi, şirket servislerini
                                    kullanarak elde edilen herhangi bir kayıt
                                    veya elde edilmiş malzemelerin tamamıyla
                                    kullanıcının rızası dahilinde olduğunu,
                                    kullanıcı bilgisayarında yaratacağı
                                    arızalar, bilgi kaybı ve diğer kayıpların
                                    sorumluluğunun tamamıyla kendisine ait
                                    olduğunu, servisin kullanımından dolayı
                                    uğrayabileceği zararlardan dolayı şirketten
                                    tazminat talep etmemeyi, şirket servislerini
                                    ticari ya da reklam amacıyla kullanmamayı,
                                    şirketin dilediği zaman veya sürekli olarak
                                    tüm sistemi izleyebileceğini, kurallara
                                    aykırı davrandığı takdirde şirketin gerekli
                                    müdahalelerde bulunma, kullanıcıyı servis
                                    dışına çıkarma ve kullanıcılığına son verme
                                    hakkına sahip olduğunu, şirketin kendi
                                    sistemini ticari amaçla kullanabileceğini,
                                    kanunlara göre postalanması yasak olan
                                    bilgileri postalamamayı ve zincir posta,
                                    yazılım virüsü vb. gibi gönderilme yetkisi
                                    olmayan postaları dağıtmamayı, başkalarına
                                    ait olan kişisel bilgileri kayıt etmemeyi,
                                    kötüye kullanmamayı, kullanıcı adıyla
                                    yapacağı her türlü işlemden bizzat
                                    kendisinin sorumlu olduğunu, kullanıcılığı
                                    tek taraflı olarak iptal ettirse bile, bu
                                    iptal işleminden önce, üyeliği sırasında
                                    gerçekleştirdiği işlem ve eylemlerden
                                    sorumlu olacağını, tüm bu maddeleri daha
                                    sonra hiçbir itiraza mahal vermeyecek
                                    şekilde okuduğunu, Kabul ve taahhüt
                                    etmiştir. {'\n\n'}7 - ŞİRKETİN HAK VE
                                    YÜKÜMLÜLÜKLERİ{'\n\n'}
                                    Şirket herhangi bir zamanda sistemin
                                    çalışmasını geçici bir süre askıya alabilir
                                    veya tamamen durdurabilir. Sistemin geçici
                                    bir süre askıya alınması veya tamamen
                                    durdurulmasından dolayı şirketin
                                    kullanıcılarına veya üçüncü şahıslara karşı
                                    hiçbir sorumluluğu olmayacaktır. Şirket,
                                    servislerinin her zaman ve her şart altında
                                    zamanında, güvenli ve hatasız olarak
                                    sunulacağını, servis kullanımından elde
                                    edilen sonuçların her zaman doğru ve
                                    güvenilir olacağını, servis kalitesinin
                                    herkesin beklentilerine cevap vereceğini
                                    taahhüt etmez. Şirket kendi uygulaması
                                    üstünden yapılan ve zarar doğurabilecek her
                                    türlü haberleşmeyi, yayını, bilgi aktarımını
                                    istediği zaman kesme hakkını ve gereken
                                    koşullar oluştuğu takdirde kullanıcıyı
                                    servislerden men etme ve kullanıcılığına son
                                    verme hakkını saklı tutar. Şirket,
                                    kullanıcıların dosyalarının saklanması için
                                    uygun göreceği büyüklükte kota tahsisi
                                    yapabilir. İhtiyaca göre kotaları artırma ve
                                    azaltma yetkisini saklı tutar. Şirket,
                                    kullanıcıların servislerden yararlanmaları
                                    sırasında ortamda bulunduracakları
                                    dosyaların, mesajların, bilgilerin
                                    bazılarını veya tamamını uygun göreceği
                                    periyodlarla yedekleme ve silme yetkisine
                                    sahiptir. Yedekleme ve silme işlemlerinden
                                    dolayı şirket sorumlu tutulmayacaktır.
                                    Şirket kullanıcıların ürettiği ve
                                    yayınlanmak üzere kendi iradesiyle sisteme
                                    yüklediği (örneğin panoya eklediği mesaj,
                                    şiir, haber, dosya, web sayfası gibi) bilgi,
                                    belge, yazılım, tasarım, grafik, resim vb.
                                    eserleri tanıtım, duyurum amacı ile
                                    yayınlama ve/veya uygulama içerisinde şirket
                                    tarafından uygun görülecek başka bir adrese
                                    taşıma haklarına sahiptir. Yayınlanan bu
                                    bilgilerin başka kullanıcılar tarafından
                                    kopyalanması ve/veya yayınlanması ihtimal
                                    dahilindedir. Bu hallerde kullanıcı,
                                    Şirketten telif ve benzeri hiçbir ücret
                                    talep etmeyecektir. Kullanıcılar başkalarına
                                    ait fikri ve sınai mülkiyet haklarının
                                    korunması için gerekli özeni göstermekle
                                    yükümlüdür. Kullanıcılar sadece telif
                                    hakları kendisine ait olan içeriği sisteme
                                    yükleyebilir. Eğer kullanıcı fikri ve sınai
                                    mülkiyet hakları başkasına ait olan yazı,
                                    fotoğraf, resim, logo, video ve sair
                                    içeriği, söz konusu eser ve hak sahiplerinin
                                    izni olmaksızın sisteme yüklerse, Şirket,
                                    ihlale konu olan içeriği derhal yayından
                                    kaldırmak ve gerektiğinde bu ihlali
                                    gerçekleştiren kullanıcıların kullanımına
                                    son vermek haklarına sahiptir. Üçüncü
                                    şahısların fikri ve sınai mülkiyet haklarını
                                    ihlal eden kullanıcılar, bu ihlallerden ve
                                    bu ihlallerden doğan her türlü zarardan
                                    üçüncü şahıslar ile kamu kurum ve
                                    kuruluşlarına karşı hukuki ve cezai olarak
                                    bizzat sorumludurlar. Şirket kullanıcının
                                    başka web-uygulamalarına geçişini
                                    sağlayabilir. Bu taktirde kullanıcı geçiş
                                    yapacağı uygulamaların içeriğinden Şirket’in
                                    sorumlu olmadığını kabul eder. Link
                                    verilmesi, link verilen web uygulamalarının
                                    içeriğinin Şirket tarafından onaylandığı
                                    anlamına gelmez. Şirket, ileride doğacak
                                    teknik zaruretler ve mevzuata uyum amacıyla
                                    kullanıcılara haber vermek zorunda olmadan
                                    işbu sözleşmenin uygulamasında değişiklikler
                                    yapabileceği gibi mevcut maddelerini
                                    değiştirebilir, iptal edebilir veya yeni
                                    maddeler ilave edebilir. Servisler ile
                                    ilgili değişiklikler uygulama içerisinde
                                    duyurulacaktır ve gerektiğinde kullanıcının
                                    hizmetlerden yararlanabilmesi için sözleşme
                                    değişikliklerini ilgili butonu tıklamak
                                    suretiyle onaylaması istenecektir. Şirket
                                    üyelik gerektirmeyen servisleri zaman
                                    içerisinde üyelik gerektiren bir duruma
                                    dönüştürülebilir. Şirket ilave servisler
                                    açabilir, bazı servislerini kısmen ya da
                                    tamamen değiştirebilir veya ücretli hale
                                    dönüştürebilir. Şirket uygulama içi satın
                                    alımlarda (ELİT ÖĞRENCİ PAKETİ ve Joker
                                    Paketi Satışları) takdiri kendisinde olmak
                                    suretiyle istediği zaman ücretlendirmede ve
                                    paket içeriğinde değişiklik yapma hakkını
                                    saklı tutar.
                                    {'\n\n'}8 - KULLANICININ YÜKÜMLÜLÜKLERİ
                                    {'\n\n'}
                                    Kullanıcı, üyelik prosedürlerini yerine
                                    getirirken, uygulamadan faydalanırken veya
                                    uygulamayla ilgili herhangi bir işlem
                                    yaparken, sözleşmedeki bütün şartlara,
                                    bulunması halinde uygulamanın ilgili
                                    yerlerinde belirtilen diğer kurallara ve
                                    yürürlükteki tüm mevzuata uygun hareket
                                    edeceğini kabul, beyan ve taahhüt eder.
                                    Kullanıcı, Türkiye Cumhuriyeti Yasalarına ve
                                    uluslararası sözleşmelere aykırı, zararlı,
                                    tehdit, hakaret ve sövme içeren, suiistimal
                                    veya taciz edici, haksız fiil veya iftira
                                    niteliğinde, kaba, müstehcen, kötüleyici
                                    veya başka birinin gizlilik haklarını ihlal
                                    edebilecek şekilde veya diğer herhangi bir
                                    biçimde, hukuki ve cezai sorumluluğunu
                                    gerektiren hiçbir mesaj, kullanıcı adı,
                                    bilgi, veri, metin, yazılım veya imajlar
                                    veya diğer herhangi bir tür materyali
                                    uygulamaya dahil etmeyecektir. Kullanıcı,
                                    yürürlükteki mevzuat hükümleri gereğince
                                    veya diğer kullanıcılar ile üçüncü
                                    şahısların haklarının ihlal edildiğinin
                                    iddia edilmesi durumlarında, şirketin,
                                    kendisine ait her türlü bilgiyi (kişisel
                                    bilgiler de dahil olmak üzere) gerek resmi
                                    makamlara ve gerekse hak sahibi kişilere
                                    açıklamaya yetkili olacağını ve bu sebeple
                                    şirketten her ne nam altında olursa olsun
                                    herhangi bir tazminat talep edilemeyeceğini
                                    kabul, beyan ve taahhüt eder. İnternet
                                    uygulamasına erişim için gerekli bilgilerin
                                    (kullanıcı adı, şifre, vb.) güvenliği,
                                    saklanması, üçüncü kişilerin bilgisinden
                                    uzak tutulması ve kullanılması durumlarıyla
                                    ilgili hususlar tamamen kullanıcının
                                    sorumluluğundadır. Şirketin, bu bilgilerin
                                    güvenliği, saklanması, üçüncü kişilerin
                                    bilgisinden uzak tutulması, kullanılması
                                    gibi hususlarda, kullanıcının ve/veya üçüncü
                                    kişilerin uğradığı veya uğrayabileceği
                                    zararlardan dolayı, doğrudan veya dolaylı,
                                    herhangi bir sorumluluğu yoktur. Kullanıcı,
                                    kendileri tarafından sağlanan bilgi ve
                                    içeriklerin doğru ve hukuka uygun olduğunu
                                    kabul, beyan ve taahhüt eder. Şirketin,
                                    kullanıcı tarafından kendisine iletilen veya
                                    uygulama üzerinden yüklenen, değiştirilen
                                    veya sağlanan bilgi ve içeriklerin
                                    doğruluğunu araştırma, bu bilgi ve
                                    içeriklerin güvenli, doğru ve hukuka uygun
                                    olduğunu taahhüt ve garanti etmek gibi bir
                                    sorumluluğu bulunmadığı gibi; Şirket, söz
                                    konusu bilgi ve içeriklerin yanlış veya
                                    hatalı olmasından dolayı ortaya çıkacak
                                    hiçbir zarardan da sorumlu tutulamaz.
                                    Kullanıcıların birbirleri ya da üçüncü
                                    şahıslarla olan ilişkileri kullanıcıların
                                    sorumluluğundadır. Kullanıcı, şirketin
                                    yazılı onayı olmadan, işbu sözleşmeden doğan
                                    hak ve yükümlülüklerini, kısmen veya tamamen
                                    devredemez. Kullanıcının, uygulama dahilinde
                                    yaptığı her işlem ve eylemdeki hukuki ve
                                    cezai sorumluluk kendisine aittir.
                                    Kullanıcı, şirketin ve/veya üçüncü bir
                                    şahısların haklarına tecavüz teşkil edecek
                                    şekilde, uygulama dahilinde bulunan
                                    resimleri, metinleri, görsel ve işitsel
                                    imgeleri, video kliplerini, dosyaları, veri
                                    tabanlarını, katalogları ve listeleri
                                    çoğaltmayacağını, kopyalamayacağını,
                                    dağıtmayacağını, işlemeyeceğini gerek bu
                                    eylemleri ile gerekse de başka yollarla
                                    Şirket ile doğrudan veya dolaylı olarak
                                    rekabete girmeyeceğini kabul, beyan ve
                                    taahhüt eder. Şirket, kullanıcının, uygulama
                                    üzerinde gerçekleştirdikleri faaliyetler
                                    nedeniyle üçüncü kişilerin uğradıkları veya
                                    uğrayabilecekleri zararlardan doğrudan
                                    ve/veya dolaylı olarak, hiçbir şekilde
                                    sorumlu tutulamaz. Kullanıcının
                                    gerçekleştirdikleri eylemler sebebiyle,
                                    Şirketin sorumluluğuna gidilmesi durumunda,
                                    şirketin zararı, kullanıcı tarafından
                                    karşılanacaktır. Kullanıcı ve/veya üçüncü
                                    kişiler tarafından uygulamada sağlanan
                                    hizmetlerden ve/veya yayınlanan içeriklerden
                                    dolayı şirketin, şirket çalışanlarının veya
                                    yöneticilerinin sorumluluğu bulunmamaktadır.
                                    Herhangi bir üçüncü kişi tarafından sağlanan
                                    ve yayınlanan bilgilerin, içeriklerin,
                                    görsel ve işitsel imgelerin doğruluğu ve
                                    hukuka uygunluğunun taahhüdü, bütünüyle bu
                                    eylemleri gerçekleştiren kişilerin
                                    sorumluluğundadır. Şirket, kullanıcı ve/veya
                                    üçüncü kişiler tarafından uygulamada
                                    sağlanan hizmetlerin ve/veya yayınlanan
                                    içeriklerin güvenliğini, doğruluğunu ve
                                    hukuka uygunluğunu taahhüt ve garanti
                                    etmemektedir. Kullanıcı; şirketin, uygulama
                                    üzerinden gerçekleştireceği her türlü
                                    çekiliş ve hediye kampanyası kapsamında,
                                    çekişlilere katılmaya veya hediyeye hak
                                    kazanan kullanıcıların kullanıcı
                                    bilgilerini, kampanya ve çekiliş ile ilgili
                                    kişi ve kurumlarla paylaşmasına onay
                                    verdiğini ve bu sebeple şirketten herhangi
                                    bir tazminat talebinde bulunmayacağını
                                    kabul, beyan ve taahhüt eder. Kullanıcı,
                                    şirketin sahip olduğu ücretlendirmeler ve
                                    oyun içi satın alım paketleriyle alakalı
                                    değişiklikleri sahip olduğu paketi güncel
                                    haliyle kabul, beyan ve taahhüt eder.
                                    Uygulamanın yayından kaldırıldığı veya
                                    teknik sebepler dolayısıyla askıda olduğu
                                    zaman dilimlerinde kullanıcı yapılan
                                    uygulama içi satın alımları ile alakalı hak
                                    talep edemez.
                                    {'\n\n'}9 - MÜCBİR SEBEPLER{'\n\n'}
                                    Hukuken mücbir sebep sayılan tüm hallerde
                                    şirket, işbu sözleşme ile belirlenen
                                    yükümlülüklerinden herhangi birini geç veya
                                    eksik ifa etme veya ifa etmeme nedeniyle
                                    yükümlü değildir. Bu ve bunun gibi durumlar,
                                    şirket için, gecikme, eksik ifa etme veya
                                    ifa etmeme veya temerrüt olarak
                                    değerlendirilmeyecek ve bu durumlar için
                                    şirketten herhangi bir nam altında tazminat
                                    talep edilemeyecektir. "Mücbir sebep"
                                    terimi, doğal afet, isyan, savaş, grev,
                                    iletişim sorunları, altyapı ve internet
                                    arızaları, elektrik kesintisi ve kötü hava
                                    koşulları da dahil ve fakat bunlarla sınırlı
                                    olmamak kaydıyla, ilgili tarafın makul
                                    kontrolü haricinde ve gerekli özeni
                                    göstermesine rağmen önleyemediği,
                                    kaçınılamayacak olaylar olarak
                                    yorumlanacaktır. Şirket, sözleşmenin ihlali,
                                    haksız fiil, ihmal veya diğer sebepler
                                    neticesinde; işlemin kesintiye uğraması,
                                    hata, ihmal, kesinti, silinme, kayıp,
                                    işlemin veya iletişimin gecikmesi,
                                    bilgisayar virüsü, iletişim hatası,
                                    hırsızlık, imha veya izinsiz olarak
                                    kayıtlara girilmesi, değiştirilmesi veya
                                    kullanılması hususunda herhangi bir
                                    sorumluluk kabul etmez.{'\n\n'}
                                    10 - DELİL SÖZLEŞMESİ{'\n\n'}Kullanıcı, bu
                                    sözleşmeden doğabilecek ihtilaflarda
                                    bilgisayar kayıtlarının, 6100 Sayılı HMK
                                    193. Madde anlamında muteber, bağlayıcı,
                                    kesin ve münhasır delil teşkil edeceğini ve
                                    bu maddenin delil sözleşmesi niteliğinde
                                    olduğunu beyan ve taahhüt eder.{'\n\n'}
                                    11 - SÖZLEŞMENİN FESHİ{'\n\n'}İşbu sözleşme,
                                    kullanıcının uygulamaya üye olduğu ve/veya
                                    uygulamayı kullandığı sürece yürürlükte
                                    kalacak ve taraflar arası hüküm ve
                                    sonuçlarını doğurmaya devam edecektir.
                                    Öncelikle şirket, dilediği zaman, herhangi
                                    bir ihbar ve ihtarda bulunmaksızın, işbu
                                    sözleşmeyi feshedebilir. Şirket,
                                    kullanıcının, işbu sözleşmede belirtilen
                                    yükümlülüklerini ihlal etmesi durumunda
                                    sözleşmeyi tek taraflı olarak
                                    feshedebilecektir. Aşağıda belirtilen
                                    durumlar ayrıca fesih sebebidir. Bu durumda,
                                    kullanıcı, şirketin uğradığı bütün zararları
                                    tazmin etmekle yükümlüdür.{'\n\n'}•
                                    Kullanıcının, herhangi bir yöntem
                                    kullanarak, uygulamanın işleyişini manipüle
                                    edecek davranışlarda bulunması.{'\n\n'}•
                                    Kullanıcının kendisi için oluşturulmuş
                                    kullanıcı profilini başkasına devretmesi
                                    veya kullanıma açması.{'\n\n'}• Kullanıcının
                                    üçüncü kişilerin haklarına tecavüz eden
                                    ve/veya etme tehlikesi bulunan fillerde
                                    bulunması.{'\n\n'}• Kullanıcının, yanlış,
                                    eksik ve yanıltıcı bilgileri, genel ahlak
                                    kurallarına uygun olmayan ifadeleri içeren,
                                    kişilik haklarına saldırı mahiyetinde olan
                                    ve Türkiye Cumhuriyeti yasalarına uygun
                                    olmayan bilgilerin uygulamaya kaydedilmesi.
                                    {'\n\n'}• Uygulamanın genel güvenliğini
                                    tehdit edecek, uygulamanın ve kullanılan
                                    yazılımların çalışmasını engelleyecek
                                    yazılımların kullanılması, faaliyetlerin
                                    yapılması, yapılmaya çalışılması ve
                                    bilgilerin alınması, silinmesi,
                                    değiştirilmesi.{'\n\n'}
                                    12 - UYGULANACAK HUKUK VE YETKİ{'\n\n'}İşbu
                                    sözleşmenin yorum ve uygulanması sebebiyle
                                    doğabilecek ihtilafların çözümünde Türkiye
                                    Cumhuriyeti Kanunları uygulanacaktır. Yine,
                                    her türlü ihtilafın hallinde, İzmir
                                    Mahkemeleri ve İcra Daireleri yetkilidir.
                                    {'\n\n\n'}
                                    AÇIK RIZA BEYANI{'\n\n'}
                                    Tarafıma tebliğ edilen, okuduğumu,
                                    anladığımı kabul ve beyan ettiğim Aydınlatma
                                    Metni ile iş bu açık rıza beyanı kapsamında;
                                    {'\n\n'}Aşağıda yer alan kişisel verilerimin
                                    aramızdaki ilişki kapsamında; yayınladığımız
                                    Sınavia isimli mobil uygulamanın daha
                                    verimli çalışması için, Veri Sorumlusu olan
                                    “Sınavia (Arda Nakışçı ve Nurettin Hakan
                                    Yılmaz)” tarafından,{'\n\n'}6698 sayılı
                                    Kişisel Verilerin Korunması Kanunundaki
                                    esaslar ile aşağıda yer alan amaçlar
                                    çerçevesinde toplanmasına, kaydedilmesine,
                                    saklanmasına, aşağıda yer alan alıcı
                                    grupları ile paylaşılmasına, sınırlı şekilde
                                    işlenmesine
                                    {'\n\n'}Tarafımız ile aramdaki ilişki sona
                                    erdikten sonra kanunda yer alan zamanaşımı
                                    sürelerinin sonuna kadar ve aşağıda açıkça
                                    gösterilen süreler kapsamında saklanmasına
                                    hiçbir baskı altında kalmadan, koşulsuz
                                    olarak açık bir şekilde rıza gösterdiğimi
                                    kabul, beyan ve taahhüt ederim.{'\n\n'}
                                    Tarafımdan Alınan Kişisel Veriler{'\n\n'}
                                    “Uygulamadaki Kullanıcı Adı ve Şifre”, “Ad,
                                    Soyad”, “Doğum Tarihi”, “Yaşanılan Şehir”,
                                    “Fotoğraf (yüklenilmiş ise)”, “Soru-Cevap
                                    İstatistikleri”, “Alışveriş Geçmişi
                                    Bilgileri”
                                    {'\n\n'}Tarafımdan Alınan Kişisel Verilerin
                                    İşlenme Amaçları{'\n\n'}1-) Oyunun daha
                                    verimli çalışması için{'\n'}2-) Oyun içi
                                    istatistiklerin belirlenmesi için{'\n'}3-)
                                    Finansal ve muhasebe işlemlerinin
                                    yürütülmesi{'\n'}4-) Oyun içi sıralamaların
                                    oluşturulması için{'\n\n'}
                                    Tarafımdan Alınan Kişisel Verilerin
                                    Paylaşıldığı Alıcı Grupları{'\n\n'}1-)
                                    Gerektiğinde Yetkili Kamu Kurum ve
                                    Kuruluşları{'\n'}2-) Özel Hukuk Gerçek veya
                                    Tüzel Kişileri Alınan Verilerin Saklama
                                    Süreleri{'\n\n'}“Uygulamadaki Kullanıcı Adı
                                    ve Şifre” = 6 Ay{'\n'}“Ad, Soyad” - 6 Ay
                                    {'\n'}
                                    “Doğum Tarihi” - 6 Ay{'\n'}“Yaşanılan Şehir”
                                    - 6 Ay{'\n'}“Fotoğraf (yüklenilmiş ise)” - 6
                                    Ay
                                    {'\n'}
                                    “Alışveriş Geçmişi Bilgileri” - 6 Ay
                                    {'\n\n\n'}
                                    AYDINLATMA METNİ{'\n\n'}1 - Giriş{'\n\n'}
                                    Veri Sorumlusu sıfatıyla “Sınavia (Arda
                                    Nakışçı ve Nurettin Hakan Yılmaz)” olarak
                                    siz üyelerimizin Kişisel Verilerinin
                                    Güvenliği meselesi bizim için çok önemli bir
                                    husustur. Bu aydınlatma metni, 6698 sayılı
                                    Kişisel Verilerin Korunması Kanunun 10.
                                    Maddesi ile Aydınlatma Yükümlülüğünün Yerine
                                    Getirilmesinde Uyulacak Usul ve Esaslar
                                    Hakkında Tebliğ kapsamında hazırlanmıştır.
                                    {'\n\n'}2 - Kişisel Verileriniz Hangi Amaçla
                                    İşleniyor?{'\n\n'}Kişisel verileriniz;
                                    Sınavia ile aranızdaki üye (oyuna kaydolan)
                                    ilişkisi çerçevesinde, 6698 sayılı Kişisel
                                    Verilerin Korunması Kanununun (“KVKK”)
                                    çizdiği sınırlar içerisinde, aşağıda sayılan
                                    amaçlar doğrultusunda işlenmektedir.{'\n\n'}
                                    Bu amaçlar:{'\n'}
                                    a-) Oyunun daha verimli çalışması için{'\n'}
                                    b-) Oyun içi istatistiklerin belirlenmesi
                                    için{'\n'}
                                    c-) Finansal ve muhasebe işlemlerinin
                                    yürütülmesi
                                    {'\n'}d-) Oyun içi sıralamaların
                                    oluşturulması için şeklindedir.{'\n\n'}3 -
                                    Kişisel Verilerinizin Kimlere ve Hangi
                                    Amaçla Aktarılacağı{'\n\n'}
                                    Verileriniz Mevzuatta yer alan istisnai
                                    haller ve kanunlar kapsamı hariç diğer
                                    gerçek veya tüzel kişiler ile
                                    paylaşılmamakta ve yurt dışına
                                    aktarılmamaktadır.{'\n\n'}4 - Kişisel
                                    Verilerinizin Toplamanın Yöntemi ve Hukuki
                                    Sebebi{'\n\n'}Verileriniz her türlü
                                    elektronik ve yazılı yöntemle; yukarıda yer
                                    verilen amaçlar doğrultusunda, üye (oyuna
                                    kaydolan) ilişkisi kapsamında, tarafımızın
                                    sözleşme ve yasadan doğan mesuliyetlerini
                                    eksiksiz ve doğru bir şekilde yerine
                                    getirilebilmesi, veri sorumlusunun meşru
                                    menfaati hukuki sebepleriyle edinilir.
                                    {'\n\n'}5 - Kişisel Verilerin Korunmasına
                                    İlişkin Önlemler{'\n\n'}Sınavia olarak
                                    kişisel verilerin korunması konusunda
                                    kanunun ön gördüğü hukuki, idari ve teknik
                                    tedbirleri uygulamakta ve bu verilerin
                                    işlenmesinde kanunun ilgili tüm Maddeleri
                                    kapsamında gerekli tüm önlemleri almaktayız.
                                    {'\n\n'}6 - Kişisel Veri Sahibinin KVKK’nın
                                    11. Maddesinde Sayılan Hakları{'\n\n'}
                                    Kişisel veri sahipleri olarak, haklarınıza
                                    ilişkin taleplerinizi; aşağıda düzenlenen
                                    yöntemlerle tarafımıza iletmeniz durumunda,
                                    tarafımız talebin niteliğine göre en geç 30
                                    gün içerisinde ücretsiz olarak
                                    sonuçlandıracaktır.{'\n\n'}Bu kapsamda
                                    kişisel veri sahipleri;{'\n'}1-) Kişisel
                                    veri işlenip işlenmediğini öğrenme,
                                    {'\n'}2-) Kişisel veri işlenmişse buna
                                    ilişkin bilgi talep etme,{'\n'}3-) Kişisel
                                    verilerin işlenme amacı ve bunların amacına
                                    uygun kullanılıp kullanılmadığını öğrenme,
                                    {'\n'}4-) Yurt içinde ve yurt dışında
                                    kişisel verilerin aktarıldığı üçüncü
                                    kişileri bilme,{'\n'}5-) Kişisel verilerin
                                    eksik veya yanlış işlenmiş olması halinde
                                    bunların düzeltilmesini isteme,
                                    {'\n'}
                                    6-) KVKK 7. Maddesinde öngörülen şartlar
                                    çerçevesinde kişisel verilerin silinmesi
                                    veya yok edilmesini isteme,{'\n'}7-) (5) ve
                                    (6) numaralı bentler uyarınca yapılan
                                    işlemlerin, kişisel verilerin aktarıldığı
                                    üçüncü kişilere bildirilmesini isteme,{'\n'}
                                    8-) İşlenen verilerin münhasıran otomatik
                                    sistemler vasıtasıyla analiz edilmesi
                                    suretiyle kişinin kendisi aleyhine bir
                                    sonucun ortaya çıkmasına itiraz etme,{'\n'}
                                    9-) Kişisel verilerin kanuna aykırı olarak
                                    işlenmesi sebebiyle zarara uğraması halinde
                                    zararın giderilmesini talep etme haklarına
                                    sahiptir.{'\n\n'}
                                    KVKK’ nın 13. Maddesinin 1. Fıkrası
                                    gereğince, yukarıda belirtilen haklarınızı
                                    kullanmak ile ilgili talebinizi, yazılı
                                    olarak veya kanunda öngörülen şekilde
                                    tarafımıza iletebilirsiniz. Şu an itibarıyla
                                    Kişisel Verilerinizin Korunmasına İlişkin
                                    taleplerinizi; iletisim@sinavia.app mail
                                    adresine e-posta aracılığı ile tarafımıza
                                    iletebilirsiniz. Bu çerçevede tarafımıza
                                    e-posta başvurunuzu sistemde kayıtlı bulunan
                                    e-posta adresiniz üzerinden açık, anlaşır
                                    bir şekilde ve kimlik, telefon numarası,
                                    adres bilgilerini yukarıda gösterdiğimiz
                                    iletişim kanalından tarafımıza
                                    iletebilirsiniz. {'\n\n'}Tarafımıza
                                    iletilmiş olan başvurularınız KVKK’nın 13.
                                    Maddesinin 2. Fıkrası gereğince, talebin
                                    niteliğine göre talebinizin bizlere ulaştığı
                                    tarihten itibaren otuz gün içinde
                                    yanıtlanacaktır. Yanıtlarımız KVKK’nın 13.
                                    Maddesi hükmü gereğince yazılı veya
                                    elektronik ortamdan tarafınıza
                                    ulaştırılacaktır.
                                </Text>
                            </ScrollView>
                            {this.state.isAcceptButtonVisible === false && (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.scrollView.scrollToEnd({
                                            animated: true
                                        })
                                    }}
                                >
                                    <Image
                                        source={BACK_BUTTON}
                                        style={{
                                            height: hp(3.5),
                                            width: hp(3.5),
                                            marginTop: hp(1),
                                            rotation: 270
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {this.state.isAcceptButtonVisible === true && (
                            <TouchableOpacity
                                onPress={() => {
                                    this.acceptLicenceOnPress()
                                }}
                                style={styles.acceptLicenceButton}
                            >
                                <Text style={styles.acceptLicenceText}>
                                    Onaylıyorum
                                </Text>
                            </TouchableOpacity>
                        )}
                    </Modal>
                    <NotchView color={'#fcfcfc'} />
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={BACK_BUTTON}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={SINAVIA_LOGO}
                            style={{
                                height: hp(36),
                                marginBottom: hp(2),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                    <View style={styles.allTextInputsContainer}>
                        <AuthTextInput
                            placeholder="E-Posta"
                            placeholderTextColor="#8A8888"
                            borderColor={'#989696'}
                            onChangeText={this.emailOnChange}
                        />
                        <View
                            style={[
                                styles.textInputContainer,
                                { borderColor: this.state.passwordBorderColor }
                            ]}
                        >
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordFirst}
                                placeholder="Şifre"
                                placeholderTextColor={'#8A8888'}
                                maxLength={16}
                                onChangeText={text =>
                                    this.passwordOnChange(text)
                                }
                            />
                            {this.state.showPasswordEyeFirst &&
                                this.state.showPasswordEyeFirst === true && (
                                    <View style={styles.eyeContainer}>
                                        <TouchableOpacity
                                            onPress={
                                                this.managePasswordVisibility
                                            }
                                        >
                                            {this.state.hidePasswordFirst ===
                                                true && (
                                                <Image
                                                    source={CLOSED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                            {this.state.hidePasswordFirst ===
                                                false && (
                                                <Image
                                                    source={OPENED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                        <View
                            style={[
                                styles.textInputContainer,
                                {
                                    borderColor: this.state
                                        .secondPasswordBorderColor
                                }
                            ]}
                        >
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordSecond}
                                placeholder="Şifre (Tekrar)                                                                     "
                                placeholderTextColor={'#8A8888'}
                                maxLength={16}
                                onChangeText={text =>
                                    this.secondPasswordOnChange(text)
                                }
                            />
                            {this.state.showPasswordEyeSecond &&
                                this.state.showPasswordEyeSecond === true && (
                                    <View style={styles.eyeContainer}>
                                        <TouchableOpacity
                                            onPress={
                                                this.managePasswordVisibility2
                                            }
                                        >
                                            {this.state.hidePasswordSecond ===
                                                true && (
                                                <Image
                                                    source={CLOSED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                            {this.state.hidePasswordSecond ===
                                                false && (
                                                <Image
                                                    source={OPENED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                    </View>
                    <View style={styles.toggleContainer}>
                        <View style={styles.switchView}>
                            <SwitchToggle
                                containerStyle={{
                                    width: wp(12),
                                    height: hp(4),
                                    borderRadius: hp(5),
                                    padding: wp(0.5)
                                }}
                                backgroundColorOn="#a0e1e5"
                                backgroundColorOff="#e5e1e0"
                                circleStyle={{
                                    width: hp(4),
                                    height: hp(4),
                                    borderRadius: hp(5),
                                    backgroundColor: '#00D9EF'
                                }}
                                switchOn={this.state.switchValue}
                                onPress={this.toggleSwitch}
                                circleColorOff="#00D9EF"
                                circleColorOn="#00D9EF"
                                duration={500}
                            />
                        </View>
                        <View style={styles.licenseTextContainer}>
                            <Text style={styles.toggleText}>
                                <Text
                                    onPress={this.onPressLicenceView}
                                    style={{
                                        textDecorationLine: 'underline',
                                        fontFamily: 'Averta-Semibold'
                                    }}
                                >
                                    Kullanıcı Sözleşmesi
                                </Text>
                                'ni okudum ve kabul ediyorum.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.authButtonView}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="#00D9EF"
                            buttonText="Kayıt Ol"
                            borderRadius={hp(1.5)}
                            fontSize={hp(3)}
                            onPress={this.registerOnPress}
                        />
                    </View>
                    <View style={styles.gotoLoginContainer}>
                        <Text style={styles.gotoLoginTextFirst}>
                            Zaten bir hesabın var mı?{' '}
                            <Text
                                onPress={this.goToLoginScreen}
                                style={styles.gotoLoginTextSecond}
                            >
                                Giriş Yap
                            </Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected
})

const mapDispatchToProps = dispatch => ({
    userSignUp: userInformation =>
        dispatch(clientActions.userSignUp(userInformation))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
