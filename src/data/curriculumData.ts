import { Character, LevelInfo, Question, GlossaryItem } from '../types/game';

export const CHARACTERS: Character[] = [
  {
    id: 'pikso',
    name: 'Pikso',
    title: 'Piksel Kedisi',
    avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    textColor: 'text-amber-400',
    accentColor: '#f59e0b',
    personality: 'Meraklı, hızlı ve oyunsever!',
    quote: 'Miyav! Teknolojinin sırlarını piksellerine kadar çözmeye hazır mısın?',
    svgType: 'cat',
  },
  {
    id: 'civciv',
    name: 'Robot Cıv-Cıv',
    title: 'Donanım Uzmanı',
    avatarBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    textColor: 'text-cyan-400',
    accentColor: '#06b6d4',
    personality: 'Mantıklı, sistemli ve donanım aşığı!',
    quote: 'Bip-bip! Anakarttan işlemciye tüm devrelerim senin başarın için hazır!',
    svgType: 'robot',
  },
  {
    id: 'lara',
    name: 'Lara',
    title: 'Siber Muhafız',
    avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    textColor: 'text-emerald-400',
    accentColor: '#10b981',
    personality: 'Güvenilir, dikkatli ve adaletli!',
    quote: 'Güçlü şifreler ve temiz dijital ayak iziyle sanal dünyayı koruyoruz!',
    svgType: 'hero',
  },
  {
    id: 'bilge_arf',
    name: 'Bilge Arf',
    title: 'Zekâ Kuşu',
    avatarBg: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    textColor: 'text-purple-400',
    accentColor: '#a855f7',
    personality: 'Derin düşünür, yapay zekâ ve algoritma rehberi!',
    quote: 'Cahit Arf ve Turing gibi düşün: Makineler düşünebilir mi?',
    svgType: 'owl',
  },
];

export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: '1. Seviye: Teknoloji Kaşifi',
    subtitle: 'Bilişim Teknolojileri ve Geçmişten Günümüze Yolculuk',
    topicTag: 'Bilişim Teknolojilerinin Sınıflandırılması',
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent',
    iconName: 'Compass',
    badgeName: 'Bilişim Kaşifi Rozeti',
    badgeIcon: '🧭',
    requiredStars: 0,
    hasMiniGame: false,
  },
  {
    id: 2,
    title: '2. Seviye: Ergonomi & Sağlık Muhafızı',
    subtitle: 'Dijital Sağlık, Doğru Duruş ve 20-20-20 Kuralı',
    topicTag: 'Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık',
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent',
    iconName: 'HeartPulse',
    badgeName: 'Ergonomi Şampiyonu Rozeti',
    badgeIcon: '🧘',
    requiredStars: 2,
    hasMiniGame: false,
  },
  {
    id: 3,
    title: '3. Seviye: Siber Dedektif',
    subtitle: 'Dijital Vatandaşlık, Ayak İzi ve Güçlü Şifre Kalesi',
    topicTag: 'Dijital Vatandaşlık Uygulamaları',
    color: 'from-blue-500 to-indigo-600',
    bgGradient: 'bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent',
    iconName: 'ShieldCheck',
    badgeName: 'Siber Muhafız Rozeti',
    badgeIcon: '🛡️',
    requiredStars: 4,
    hasMiniGame: true,
    miniGameType: 'password-lab',
    miniGameTitle: 'Güçlü Şifre Laboratuvarı',
  },
  {
    id: 4,
    title: '4. Seviye: Sistem Mühendisi',
    subtitle: 'İç-Dış Donanım, İşletim Sistemleri ve Deve-Cüce Meydanı',
    topicTag: 'Bilgisayar Sistemlerinin Kullanımı',
    color: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent',
    iconName: 'Cpu',
    badgeName: 'Sistem Mühendisi Rozeti',
    badgeIcon: '⚙️',
    requiredStars: 7,
    hasMiniGame: true,
    miniGameType: 'deve-cuce',
    miniGameTitle: 'Giriş-Çıkış: Deve mi Cüce mi?',
  },
  {
    id: 5,
    title: '5. Seviye: Dosya & Veri Mimarı',
    subtitle: 'Dosya Uzantıları, Klasör Düzeni ve Veri Merdiveni',
    topicTag: 'Dosya ve Klasör Yönetimi',
    color: 'from-violet-500 to-purple-600',
    bgGradient: 'bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent',
    iconName: 'FolderTree',
    badgeName: 'Veri Mimarı Rozeti',
    badgeIcon: '📁',
    requiredStars: 10,
    hasMiniGame: true,
    miniGameType: 'data-ladder',
    miniGameTitle: 'Veri Boyutu Merdiveni',
  },
  {
    id: 6,
    title: '6. Seviye: Yapay Zekâ Büyük Ustası',
    subtitle: 'Turing & Arf Akademisi, Doğal Zekâ vs YZ ve Etik İlkeler',
    topicTag: 'Yapay Zekâda Temel Kavram ve Özellikler',
    color: 'from-pink-500 to-rose-600',
    bgGradient: 'bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-transparent',
    iconName: 'Sparkles',
    badgeName: 'Günün BT Uzmanı Büyük Madalyası',
    badgeIcon: '🏆',
    requiredStars: 13,
    hasMiniGame: true,
    miniGameType: 'file-match',
    miniGameTitle: 'Dosya Uzantısı Dedektifi',
  },
];

export const QUESTIONS: Question[] = [
  // --- LEVEL 1: Bilişim Teknolojileri ve Geçmişten Günümüze ---
  {
    id: 'q1_1',
    levelId: 1,
    difficulty: 'kolay',
    topic: 'Temel Kavramlar',
    question: 'Bilginin toplanması, işlenmesi, saklanması ve bir yerden başka bir yere iletilmesini sağlayan araçların tümüne ne ad verilir?',
    options: [
      'Bilişim Teknolojileri (BİT)',
      'Oyun Konsolu',
      'Sosyal Medya Hesabı',
      'Fotoğraf Albümü'
    ],
    correctIndex: 0,
    explanation: 'Bilişim Teknolojileri (BİT); bilginin üretilmesi, işlenmesi, depolanması ve iletilmesini sağlayan donanım ve yazılımların bütünüdür.',
    hint: 'Dersimizin ana adını hatırla: Bilişim ve İletişim...',
  },
  {
    id: 'q1_2',
    levelId: 1,
    difficulty: 'kolay',
    topic: 'Geçmişten Günümüze Teknoloji',
    question: 'Eski dönemlerde yazı yazmak için daktilo kullanılıyordu. Günümüzde ise bu ihtiyacı en çok hangi teknoloji karşılamaktadır?',
    options: [
      'Tüplü Radyo',
      'Bilgisayar ve Kelime İşlemci Programları',
      'Müzik Kaseti',
      'Faks Cihazı'
    ],
    correctIndex: 1,
    explanation: 'Daktilo geçmişte mekanik olarak harfleri basardı; günümüzde bilgisayarlar ve kelime işlemci yazılımları bu görevi çok daha hızlı ve hatasız yapar.',
    hint: 'Yazı yazarken harfleri sildiğin ve düzenlediğin programları düşün!',
  },
  {
    id: 'q1_3',
    levelId: 1,
    difficulty: 'orta',
    topic: 'Kullanım Alanları',
    question: 'Hastanelerde doktorların randevu sistemini yönetmesi, tahlil sonuçlarını incelemesi bilişim teknolojilerinin hangi alandaki kullanımına örnektir?',
    options: [
      'Eğlence ve Oyun',
      'Sağlık Alanı',
      'Bankacılık Alanı',
      'Ulaşım ve Trafik'
    ],
    correctIndex: 1,
    explanation: 'Hastanelerde hasta kayıtları, tahliller ve MHRS gibi sistemler bilişim teknolojilerinin sağlık alanındaki faydalarıdır.',
    hint: 'Doktorlar, hastaneler ve sağlık ocakları hangi kategoriye girer?',
  },
  {
    id: 'q1_4',
    levelId: 1,
    difficulty: 'orta',
    topic: 'Bilişim ve Sinema',
    question: 'Sinemada bir oyuncunun stüdyodan çıkmadan uzayda yürümesini veya ejderha sırtında uçmasını sağlayan bilişim teknolojisi tekniği hangisidir?',
    options: [
      'Yeşil Ekran (Green Screen) Teknolojisi',
      'Daktilo ile Senaryo Yazımı',
      'Hoparlörden Müzik Çalma',
      'Fotokopi Çekme Yöntemi'
    ],
    correctIndex: 0,
    explanation: 'Ders kılavuzumuzda da işlendiği gibi Yeşil Ekran (Chroma Key) teknolojisiyle oyuncunun arkasındaki yeşil renk silinip dijital uzay ya da fantastik arka planlar eklenir.',
    hint: 'Öğretmen kılavuzundaki film sahnesi etkinliğini hatırla: Arka plan hangi renkti?',
  },
  {
    id: 'q1_5',
    levelId: 1,
    difficulty: 'zor',
    topic: 'Teknolojinin Avantajları',
    question: 'Aşağıdakilerden hangisi bilişim teknolojilerinin hayatımıza sağladığı en önemli avantajlardan biri DEĞİLDİR?',
    options: [
      'Bilgiye saniyeler içinde hızlı ve kolay erişim sağlama',
      'İşlemleri hızlandırarak zamandan ve kâğıttan tasarruf etme',
      'İnsanları tüm gün hareketsiz bırakıp ekran bağımlısı yapma',
      'Uzaktaki insanlarla anında sesli ve görüntülü iletişim kurma'
    ],
    correctIndex: 2,
    explanation: 'Hareketsizlik ve ekran bağımlılığı teknolojinin olumsuz bir yan etkisidir; faydası veya amacı değildir.',
    hint: 'Soru kökünde "DEĞİLDİR" ifadesine dikkat et. Hangisi zararlı bir durumdur?',
  },

  // --- LEVEL 2: Ergonomi ve Dijital Sağlık ---
  {
    id: 'q2_1',
    levelId: 2,
    difficulty: 'kolay',
    topic: 'Ergonomi Tanımı',
    question: 'İnsanların sağlığını korumak ve rahat çalışmasını sağlamak için araç-gereçlerin insan vücuduna uygun tasarlanması bilimine ne ad verilir?',
    options: [
      'Ergonomi',
      'Algoritma',
      'Pikselleşme',
      'Veri Tabanı'
    ],
    correctIndex: 0,
    explanation: 'Ergonomi; bilgisayar masası, sandalye ve monitör gibi çalışma ortamlarının beden sağlığına uygun düzenlenmesidir.',
    hint: 'Kılavuzumuzdaki doğru oturuş ve çalışma ortamı biliminin adı nedir?',
  },
  {
    id: 'q2_2',
    levelId: 2,
    difficulty: 'kolay',
    topic: 'Mola Süresi',
    question: 'MEB Bilişim kılavuzundaki "Altın Kurallar"a göre bilgisayar başında çalışan bir öğrenci en geç kaç dakikada bir mola vermelidir?',
    options: [
      'Her 4 saatte bir',
      'Her 30 dakikada bir (kısa esneme molası)',
      'Asla mola vermeden 6 saat',
      'Yalnızca bilgisayar kapanınca'
    ],
    correctIndex: 1,
    explanation: 'Bilişim dersinde belirlenen altın kurala göre her 30 dakikada bir kısa mola verilmeli, ayağa kalkıp esneme hareketleri yapılmalıdır.',
    hint: '30 dakika kuralını ve göz egzersizlerini hatırla!',
  },
  {
    id: 'q2_3',
    levelId: 2,
    difficulty: 'orta',
    topic: '20-20-20 Göz Sağlığı Kuralı',
    question: 'Dijital göz yorgunluğunu önlemek için uzmanların önerdiği "20-20-20" kuralı ne anlama gelir?',
    options: [
      'Günde 20 saat oyun oyna, 20 dakika uyu',
      'Her 20 dakikada bir, 20 saniye boyunca yaklaşık 6 metre (20 feet) uzağa bak',
      '20 kez gözünü kırp ve hemen ekranı kapat',
      'Bilgisayarı 20 derecelik sıcaklıkta çalıştır'
    ],
    correctIndex: 1,
    explanation: '20-20-20 kuralı: Her 20 dakikada bir, en az 20 saniye boyunca uzağa (yaklaşık 20 feet / 6 metre) bakarak göz kaslarını dinlendirmektir.',
    hint: 'Gözlerimizi ekrandan kaldırıp uzaklara bakarak dinlendiririz!',
  },
  {
    id: 'q2_4',
    levelId: 2,
    difficulty: 'orta',
    topic: 'Doğru Oturuş Pozisyonu',
    question: 'Bilgisayar karşısında otururken sırt ve boyun sağlığımızı korumak için hangisi DOĞRU bir duruştur?',
    options: [
      'Ekrana 10 santimetre yaklaşıp kambur durmak',
      'Ayaklar yere tam basmalı, sırt dik olmalı ve monitörün üst kenarı göz hizasında bulunmalıdır',
      'Sandalyede geriye doğru kaykılarak yatay pozisyonda durmak',
      'Karanlık bir odada sadece ekran ışığıyla ders çalışmak'
    ],
    correctIndex: 1,
    explanation: 'Doğru duruşta ayaklar yere tam basmalı veya ayak desteği olmalı, dirsekler 90 derece açıda durmalı, ekran göz hizasında olmalıdır.',
    hint: 'Dik otur, monitörün üstü göz hizanda olsun!',
  },
  {
    id: 'q2_5',
    levelId: 2,
    difficulty: 'zor',
    topic: 'Siber Zorbalık & Ruh Sağlığı',
    question: 'Sosyal medyada veya çevrim içi oyunlarda bir arkadaşınızın sürekli kırıcı sözlere, dışlanmaya veya tehdide maruz kaldığını gördünüz. Ne yapmalısınız?',
    options: [
      'Görmezden gelip sohbete gülerek katılmalıyım.',
      'Durumu derhal güvendiğim bir yetişkine (aile, öğretmen, rehberlik servisi) bildirmeliyim.',
      'Saldırgan kişiye karşı aynı kırıcı sözlerle karşılık vermeliyim.',
      'Arkadaşımın hesap şifresini alıp hesabı silmeliyim.'
    ],
    correctIndex: 1,
    explanation: 'Siber zorbalıkla karşılaşıldığında sessiz kalınmamalı, misilleme yapılmamalı; durum ekran görüntüsü alınıp aileye, öğretmene veya okul rehberlik servisine aktarılmalıdır.',
    hint: 'Güvenilir yetişkinler ve okul rehberlik servisi en doğru destek kaynağıdır.',
  },

  // --- LEVEL 3: Dijital Vatandaşlık ve Güvenlik ---
  {
    id: 'q3_1',
    levelId: 3,
    difficulty: 'kolay',
    topic: 'Dijital Ayak İzi',
    question: 'İnternette yaptığımız aramalar, yüklediğimiz fotoğraflar, beğendiğimiz videolar ve tıkladığımız bağlantıların arkamızda bıraktığı kalıcı izlere ne denir?',
    options: [
      'Dijital Ayak İzi',
      'Bilgisayar Faresi',
      'Yazıcı Kartuşu',
      'Ekran Koruyucu'
    ],
    correctIndex: 0,
    explanation: 'Dijital Ayak İzi; internette gerçekleştirdiğimiz her işlem sonrasında arkamızda bıraktığımız kalıcı dijital izlerdir.',
    hint: 'Kumsalda yürürken arkanda bıraktığın izin internetteki karşılığı!',
  },
  {
    id: 'q3_2',
    levelId: 3,
    difficulty: 'orta',
    topic: 'Güçlü Şifre Kuralları',
    question: 'Aşağıdaki şifrelerden hangisi MEB Bilişim standartlarına göre EN GÜÇLÜ ve güvenli şifredir?',
    options: [
      '12345678',
      'ahmet2014',
      'K@l3m!2026?T',
      'sifre'
    ],
    correctIndex: 2,
    explanation: 'Güçlü bir şifre: En az 8-12 karakter uzunluğunda olmalı; büyük harf, küçük harf, rakam ve özel semboller (@, !, ?) içermelidir.',
    hint: 'Büyük harf, küçük harf, rakam ve özel işaret içeren karmaşık seçeneğe bak.',
  },
  {
    id: 'q3_3',
    levelId: 3,
    difficulty: 'orta',
    topic: 'Kişisel Verilerin Korunması (KVKK)',
    question: 'Çevrim içi bir oyunda tanımadığınız bir oyuncu size mesaj atarak okulunuzun adını, ev adresinizi ve telefon numaranızı istedi. Doğru davranış hangisidir?',
    options: [
      'Dost canlısı görünmek için hemen adresimi yazarım.',
      'Bu bilgilerin kişisel veri olduğunu bilip asla paylaşmam ve gerekirse engellerim.',
      'Yalnızca telefon numaramı veririm.',
      'Şifremi de yanında hediye ederim.'
    ],
    correctIndex: 1,
    explanation: 'Ev adresi, okul adı, telefon numarası ve T.C. kimlik no kritik kişisel verilerdir. Çevrim içi platformlarda asla tanımadığımız kişilerle paylaşılmamalıdır.',
    hint: 'Kişisel verilerimiz mahremdir ve korunmalıdır!',
  },
  {
    id: 'q3_4',
    levelId: 3,
    difficulty: 'zor',
    topic: 'Dijital Kimlik & Gizlilik',
    question: '5. Sınıf öğrencisi Can, çevrim içi bir platformda hesap açarken profil fotoğrafı ve kullanıcı adı belirleyecektir. Güvenlik için en doğru yaklaşım nedir?',
    options: [
      'Kendi açık ev adresini ve gerçek yüzünün net fotoğrafını koymalıdır.',
      'Hayali bir avatar/çizim seçmeli ve ad-soyad-doğum tarihi gibi kişisel detayları içermeyen bir rumuz kullanmalıdır.',
      'Bütün şifrelerini profil açıklamasına yazmalıdır.',
      'Anne ve babasının kredi kartı fotoğrafını profil resmi yapmalıdır.'
    ],
    correctIndex: 1,
    explanation: 'MEB Dijital Kimlik Kartı etkinliğinde de belirtildiği gibi çocukların gizlilik amacıyla anonim ya da avatar tabanlı profil kullanması önerilir.',
    hint: 'Anonim veya avatar tabanlı seçim kişisel gizliliği korur.',
  },
  {
    id: 'q3_5',
    levelId: 3,
    difficulty: 'zor',
    topic: 'Resmi Kurumlar',
    question: 'İnternette yasa dışı, zararlı veya güvenliğimizi tehdit eden bir içerikle karşılaştığımızda Türkiye\'de başvurabileceğimiz resmi kurum hangisidir?',
    options: [
      'Meteoroloji Genel Müdürlüğü',
      'Bilgi Teknolojileri ve İletişim Kurumu (BTK) / İhbar Web',
      'Karayolları Genel Müdürlüğü',
      'Devlet Su İşleri'
    ],
    correctIndex: 1,
    explanation: 'Türkiye\'de internet güvenliği ve siber suç ihbarları için BTK (Bilgi Teknolojileri ve İletişim Kurumu) ve Güvenli Web / İhbar Web hizmet vermektedir.',
    hint: 'Bilişim ve İletişim kelimelerinin kısaltması olan kurumu hatırla!',
  },

  // --- LEVEL 4: Bilgisayar Sistemlerinin Kullanımı ---
  {
    id: 'q4_1',
    levelId: 4,
    difficulty: 'kolay',
    topic: 'Donanım ve Yazılım',
    question: 'Bilgisayarın elle tutulup gözle görülebilen tüm fiziksel parçalarına (fare, ekran, kasa içi kartlar) ne ad verilir?',
    options: [
      'Donanım (Hardware)',
      'Yazılım (Software)',
      'İnternet Tarayıcısı',
      'Web Sitesi'
    ],
    correctIndex: 0,
    explanation: 'Fiziksel parçalara Donanım; bu donanımları çalıştıran ve yönlendiren programlara ise Yazılım denir.',
    hint: 'Elle dokunabildiğin parçaları düşün (Klavye, monitör, kablolar vb.)',
  },
  {
    id: 'q4_2',
    levelId: 4,
    difficulty: 'orta',
    topic: 'İç Donanım Birimleri',
    question: 'Bilgisayarın "Beyni" olarak bilinen, tüm hesaplamaları yapan ve sistemdeki komutları yürüten temel iç donanım parçası hangisidir?',
    options: [
      'İşlemci (CPU)',
      'Hoparlör',
      'Fare (Mouse)',
      'Yazıcı'
    ],
    correctIndex: 0,
    explanation: 'İşlemci (CPU - Central Processing Unit), bilgisayarın beynidir; tüm mantıksal ve aritmetik işlemleri saniyede milyarlarca kez gerçekleştirir.',
    hint: 'Bilgisayarın beyni olarak adlandırılan merkezi parça.',
  },
  {
    id: 'q4_3',
    levelId: 4,
    difficulty: 'orta',
    topic: 'Giriş ve Çıkış Birimleri (Deve-Cüce)',
    question: 'Aşağıdaki donanım birimlerinden hangisi BİLGİ GİRİŞİ (Giriş Birimi) sağlamak için kullanılır?',
    options: [
      'Monitör (Ekran)',
      'Hoparlör',
      'Mikrofon',
      'Yazıcı (Printer)'
    ],
    correctIndex: 2,
    explanation: 'Mikrofon sesimizi bilgisayara aktararak veri GİRİŞİ sağlar. Monitör, hoparlör ve yazıcı ise işlenen veriyi dışarı aktaran ÇIKIŞ birimleridir.',
    hint: 'Biz bilgisayara sesimizi verirken hangi aleti kullanırız?',
  },
  {
    id: 'q4_4',
    levelId: 4,
    difficulty: 'zor',
    topic: 'İşletim Sistemleri',
    question: 'Bilgisayar donanımını yöneten, uygulama yazılımlarının çalışmasını sağlayan ve Türkiye\'de geliştirilen milli işletim sistemi hangisidir?',
    options: [
      'PARDUS',
      'Photoshop',
      'Microsoft Word',
      'Google Chrome'
    ],
    correctIndex: 0,
    explanation: 'TÜBİTAK tarafından geliştirilen PARDUS, açık kaynak kodlu milli işletim sistemimizdir. Diğerleri ise uygulama yazılımlarıdır.',
    hint: 'Anadolu Parsı\'ndan esinlenen milli açık kaynak işletim sistemimiz.',
  },
  {
    id: 'q4_5',
    levelId: 4,
    difficulty: 'zor',
    topic: 'RAM Bellek vs Sabit Disk',
    question: 'Bilgisayar çalışırken o an açık olan programların geçici olarak tutulduğu, bilgisayar kapatıldığında içindeki bilgilerin silindiği bellek hangisidir?',
    options: [
      'RAM (Geçici Bellek)',
      'Sabit Disk (Hard Disk / SSD)',
      'USB Flash Bellek',
      'Optik CD-ROM'
    ],
    correctIndex: 0,
    explanation: 'RAM (Random Access Memory) geçici bellektir. Elektrik kesildiğinde veya bilgisayar kapandığında veriler silinir. Kalıcı veriler ise Sabit Disk/SSD\'de tutulur.',
    hint: 'Geçici çalışma masası benzetmesini hatırla: Elektrik gidince sıfırlanır!',
  },

  // --- LEVEL 5: Dosya ve Klasör Yönetimi ---
  {
    id: 'q5_1',
    levelId: 5,
    difficulty: 'kolay',
    topic: 'Dosya Uzantısı Nedir?',
    question: 'Bir dosyanın adının sonundaki noktadan sonra gelen (örneğin "manzara.jpg") harfler topluluğu bize neyi gösterir?',
    options: [
      'Dosyanın fiyatını',
      'Dosyanın türünü ve hangi programla açılacağını',
      'Bilgisayarın markasını',
      'İnternet hızını'
    ],
    correctIndex: 1,
    explanation: 'Dosya uzantısı (ör. .jpg, .mp3, .docx), o dosyanın türünü (resim, ses, metin vb.) ve hangi yazılımla açılabileceğini işletim sistemine bildirir.',
    hint: 'Noktadan sonra gelen ek dosyanın kimliğini belirler.',
  },
  {
    id: 'q5_2',
    levelId: 5,
    difficulty: 'orta',
    topic: 'Dosya Uzantıları Eşleştirme',
    question: 'Müzik dinlemek için kaydettiğimiz bir ses dosyasının uzantısı genellikle aşağıdakilerden hangisi olur?',
    options: [
      '.mp3',
      '.docx',
      '.exe',
      '.pdf'
    ],
    correctIndex: 0,
    explanation: '.mp3 ve .wav ses/müzik dosyası uzantılarıdır. .docx metin belgesi, .exe çalıştırılabilir program, .pdf taşınabilir belgedir.',
    hint: 'MP3 çaları veya kulaklıkla dinlediğin müzik formatını hatırla!',
  },
  {
    id: 'q5_3',
    levelId: 5,
    difficulty: 'orta',
    topic: 'Veri Boyutu Merdiveni',
    question: 'Veri boyutu merdiveninde birimleri KÜÇÜKTEN BÜYÜĞE doğru sıralarsak hangisi DOĞRUDUR?',
    options: [
      'Terabyte < Gigabyte < Megabyte < Kilobyte < Byte < Bit',
      'Bit < Byte < Kilobyte (KB) < Megabyte (MB) < Gigabyte (GB) < Terabyte (TB)',
      'Byte < Bit < Terabyte < Gigabyte',
      'Megabyte < Byte < Bit < Gigabyte'
    ],
    correctIndex: 1,
    explanation: 'Dijital hafıza birimleri merdiveni: Bit (0 veya 1) -> Byte (8 Bit) -> KB -> MB -> GB -> TB şeklinde küçükten büyüğe sıralanır.',
    hint: 'En küçük birim Bit, 8 Bit birleşince 1 Byte olur!',
  },
  {
    id: 'q5_4',
    levelId: 5,
    difficulty: 'zor',
    topic: 'Dosya Sıkıştırma Mantığı',
    question: 'Öğretmenimiz ders kılavuzundaki "çöp poşetine gazeteleri düzenli yerleştirme" deneyiyle hangi kavramı anlatmıştır?',
    options: [
      'Veri Sıkıştırma (Zip/Rar ile alan tasarrufu sağlama)',
      'Bilgisayarı Fabrika Ayarlarına Döndürme',
      'Ekran Parlaklığını Kısma',
      'Yeni Bir İnternet Kablosu Çekme'
    ],
    correctIndex: 0,
    explanation: 'Kılavuzdaki etkinlikte gazeteleri düzenleyip sıkıştırarak poşette yer açma deneyi, .zip ve .rar gibi yazılımlarla dosyaları sıkıştırıp hafızada yer kazanma mantığını somutlaştırır.',
    hint: 'Dolu bir çantayı düzenleyip yer açmak gibi; dosya içeriği bozulmaz ama boyutu küçülür!',
  },
  {
    id: 'q5_5',
    levelId: 5,
    difficulty: 'zor',
    topic: 'Düzenli Klasör Hiyerarşisi',
    question: 'Masaüstünde 100 farklı dosya karışık şekilde durmaktadır. Bu dosyaları hızlı bulmak için en verimli yöntem hangisidir?',
    options: [
      'Hepsini tek tek Çöp Kutusuna atmak',
      'Konularına göre (Dersler, Resimler, Projeler) klasörler açıp tarih ve isim bilgisiyle düzenlemek',
      'Bilgisayarı kapatıp bir daha hiç açmamak',
      'Tüm dosyaların adını sadece "1" yapmak'
    ],
    correctIndex: 1,
    explanation: 'Klasör yapısı hiyerarşik düzen sağlar; dosyaları mantıklı kategorilere ve tarih bilgisine göre gruplandırmak aradığımızı saniyeler içinde bulmamızı sağlar.',
    hint: 'Defterlerimizi ve kitaplarımızı derslerine göre raflara dizmek gibidir!',
  },

  // --- LEVEL 6: Yapay Zekâda Temel Kavram ve Özellikler ---
  {
    id: 'q6_1',
    levelId: 6,
    difficulty: 'kolay',
    topic: 'Yapay Zekâ Tanımı',
    question: 'Bilgisayarların ve makinelerin; öğrenme, problem çözme ve karar verme gibi insana özgü zihinsel yetenekleri taklit etmesine ne denir?',
    options: [
      'Yapay Zekâ (YZ)',
      'Elektrik Akımı',
      'Monitör Çözünürlüğü',
      'Klavye Düzeni'
    ],
    correctIndex: 0,
    explanation: 'Yapay Zekâ; verilerden öğrenerek çıkarım yapabilen, ses, görüntü veya metinleri analiz edebilen akıllı bilgisayar sistemleridir.',
    hint: 'İnsan zekasını taklit eden akıllı sistemlere ne ad verilir?',
  },
  {
    id: 'q6_2',
    levelId: 6,
    difficulty: 'orta',
    topic: 'Doğal Zekâ vs Yapay Zekâ',
    question: 'İnsan zekâsı (Doğal Zekâ) ile Yapay Zekâ karşılaştırıldığında hangisi SADECE insana ait bir özelliktir?',
    options: [
      'Milyonlarca matematiksel veriyi saniyede hesaplamak',
      'Duygulara, empatiye ve ahlaki vicdana sahip olmak',
      'Önceden verilmiş kural setlerine göre arama yapmak',
      'Kamera görüntüsündeki piksel renklerini sayıya dökmek'
    ],
    correctIndex: 1,
    explanation: 'Makineler hesaplama ve veri işlemede çok hızlı olsa da duygu, empati, şefkat, ahlaki vicdan ve bilinç yalnızca insanlara (doğal zekâya) özgüdür.',
    hint: 'Robotların kalbi veya gerçek duyguları var mıdır?',
  },
  {
    id: 'q6_3',
    levelId: 6,
    difficulty: 'orta',
    topic: 'Tarihsel Öncüler',
    question: '1959 yılında "Makine Düşünebilir mi ve Nasıl Düşünebilir?" adlı tarihi makaleyi kaleme alan ünlü Türk matematikçi kimdir?',
    options: [
      'Cahit Arf',
      'Ali Kuşçu',
      'İbn-i Sina',
      'Harezmi'
    ],
    correctIndex: 0,
    explanation: 'Kılavuzumuzda yer aldığı gibi; 1959 yılında Atatürk Üniversitesi\'nde verdiği konferansta "Makine Düşünebilir mi ve Nasıl Düşünebilir?" sunumunu yapan kişi büyük matematikçimiz Cahit Arf\'tır.',
    hint: '10 TL\'lik banknotun arkasında da resmi bulunan matematik dehamız!',
  },
  {
    id: 'q6_4',
    levelId: 6,
    difficulty: 'zor',
    topic: 'Tarihsel Dönüm Noktaları',
    question: '1950 yılında "Makineler Düşünebilir mi?" sorusunu sorarak bilgisayar bilimi ve yapay zekânın temellerini atan bilim insanı kimdir?',
    options: [
      'Alan Turing',
      'Alexander Graham Bell',
      'Thomas Edison',
      'Isaac Newton'
    ],
    correctIndex: 0,
    explanation: '1950 yılında İngiliz matematikçi ve bilgisayar bilimcisi Alan Turing, "Computing Machinery and Intelligence" makalesini yazarak makinelerin düşünebilirliğini ve ünlü Turing Testi\'ni ortaya atmıştır.',
    hint: 'Enigma şifresini çözen ve Turing Testi ile tanınan öncü bilim insanı.',
  },
  {
    id: 'q6_5',
    levelId: 6,
    difficulty: 'zor',
    topic: 'Yapay Zekâ Örneği Olmayanlar',
    question: 'MEB "Frayer Modeli" etkinliğine göre aşağıdakilerden hangisi bir YAPAY ZEKÂ uygulaması DEĞİLDİR?',
    options: [
      'Sesimizi anlayıp cevap veren dijital akıllı asistan',
      'Akıllı telefonlarda yüzümüzü tanıyarak kilidi açan sistem',
      'Pili bitince çalışan basit bir mekanik kurmalı çalar saat',
      'Otomobillerdeki şerit takip ve otonom sürüş sistemi'
    ],
    correctIndex: 2,
    explanation: 'Mekanik kurmalı çalar saat veya basit bir hesap makinesi yapay zekâ değildir; veriden öğrenmez, sadece sabit mekanik/elektronik kurallarla çalışır.',
    hint: 'Hangisinde veri analizi, öğrenme ya da akıllı tahmin mekanizması YOKTUR?',
  },
  {
    id: 'q6_6',
    levelId: 6,
    difficulty: 'zor',
    topic: 'Yapay Zekâ ve Güvenilir Veri',
    question: 'Öğretmen kılavuzundaki "Meyve Tanıma" etkinliğinde yapay zekâ modeline yanlış etiketli fotoğraflar verilirse ne olur?',
    options: [
      'Yapay zekâ yine de büyülü bir şekilde hep doğru bilir.',
      'Yapay zekâ yanlış veriden öğrendiği için hatalı tahminler yapmaya başlar.',
      'Bilgisayar anında patlar.',
      'Meyveler gerçek hayatta renk değiştirir.'
    ],
    correctIndex: 1,
    explanation: 'Yapay zekâ modelleri kendilerine sağlanan verilerle öğrenir. Kalitesiz, taraflı veya hatalı veri verilirse model hatalı ve yanıltıcı kararlar üretir.',
    hint: 'Bir robota elmanın fotoğrafını gösterip "bu armuttur" derseniz ne öğrenir?',
  },
];

export const GLOSSARY: GlossaryItem[] = [
  {
    term: 'Bilişim Teknolojileri (BİT)',
    definition: 'Bilginin toplanması, işlenmesi, saklanması ve ağlar aracılığıyla iletilmesini sağlayan araçların ve yöntemlerin bütünü.',
    category: 'Temel Kavramlar',
    example: 'Bilgisayarlar, akıllı telefonlar, bulut depolama.'
  },
  {
    term: 'Donanım (Hardware)',
    definition: 'Bilgisayar sistemini oluşturan, elle tutulup gözle görülebilen tüm mekanik ve elektronik fiziksel parçalar.',
    category: 'Sistem',
    example: 'İşlemci, RAM, klavye, fare, monitör, yazıcı.'
  },
  {
    term: 'Yazılım (Software)',
    definition: 'Bilgisayar donanımının belirli görevleri yapması için yazılmış komutlar, programlar ve işletim sistemleri topluluğu.',
    category: 'Sistem',
    example: 'Pardus, Windows, kelime işlemci, çizim programı.'
  },
  {
    term: 'Ergonomi',
    definition: 'İnsanların fiziksel ve ruhsal sağlığını korumak, yorulmadan verimli çalışmasını sağlamak için ortamın ve araçların insana uygun tasarlanması bilimi.',
    category: 'Dijital Sağlık',
    example: 'Doğru sandalye yüksekliği, dik oturuş, monitörün göz hizasında olması.'
  },
  {
    term: '20-20-20 Kuralı',
    definition: 'Ekran başında çalışan kişilerin göz yorgunluğunu azaltmak için her 20 dakikada bir, 20 saniye boyunca en az 20 feet (yaklaşık 6 metre) uzağa bakması kuralı.',
    category: 'Dijital Sağlık',
    example: 'Göz kaslarını dinlendirerek baş ağrısını ve göz kuruluğunu önler.'
  },
  {
    term: 'Dijital Ayak İzi',
    definition: 'İnternet kullanırken arkamızda bıraktığımız tüm veri kalıntıları: arama geçmişi, paylaşımlar, beğeniler ve ziyaret edilen siteler.',
    category: 'Dijital Vatandaşlık',
    example: 'İnternette paylaşılan bir fotoğraf silinse bile başka sunucularda kalıcı olabilir.'
  },
  {
    term: 'İşlemci (CPU)',
    definition: 'Bilgisayarın tüm hesaplamalarını ve mantıksal kararlarını yürüten, sistemin beyni sayılan temel iç donanım bileşeni.',
    category: 'Donanım',
    example: 'Saniyede milyarlarca komut işler.'
  },
  {
    term: 'RAM (Geçici Bellek)',
    definition: 'Bilgisayar açıkken çalışan programların verilerini geçici süreyle tutan yüksek hızlı bellek. Kapatılınca silinir.',
    category: 'Donanım',
    example: 'Aynı anda birden fazla programı hızlı çalıştırmayı sağlar.'
  },
  {
    term: 'Giriş Birimi (Deve)',
    definition: 'Kullanıcıdan veya dış ortamdan bilgisayara veri ve komut aktaran donanım parçaları.',
    category: 'Donanım',
    example: 'Klavye, fare, mikrofon, kamera, tarayıcı.'
  },
  {
    term: 'Çıkış Birimi (Cüce)',
    definition: 'Bilgisayarda işlenen veriyi kullanıcıya görüntü, ses veya basılı belge olarak aktaran parçalar.',
    category: 'Donanım',
    example: 'Monitör, hoparlör, kulaklık, yazıcı.'
  },
  {
    term: 'Veri Boyutu Merdiveni',
    definition: 'Dijital bilginin depolanma kapasitesini belirten birimlerin küçükten büyüğe sıralanışı: Bit < Byte < KB < MB < GB < TB.',
    category: 'Veri Yönetimi',
    example: '1 Byte = 8 Bit. 1 MP3 şarkı ≈ 4-5 Megabyte (MB).'
  },
  {
    term: 'Dosya Uzantısı',
    definition: 'Dosya adının sonundaki noktadan sonra gelen ve dosyanın türünü belirten harf grubu.',
    category: 'Veri Yönetimi',
    example: '.docx (Metin), .jpg (Resim), .mp3 (Müzik), .mp4 (Video), .zip (Sıkıştırılmış).'
  },
  {
    term: 'Veri Sıkıştırma',
    definition: 'Dosyaların içindeki yinelenen verileri akıllı algoritmalarla düzenleyerek kapladığı disk alanını küçültme işlemi.',
    category: 'Veri Yönetimi',
    example: '.zip dosyaları; e-posta ile dosya gönderirken zaman ve alan tasarrufu sağlar.'
  },
  {
    term: 'Yapay Zekâ (AI)',
    definition: 'Bilgisayarların verilerden öğrenme, problem çözme ve nesneleri tanıma gibi insan zihnine özgü becerileri taklit edebilmesi.',
    category: 'Yapay Zekâ',
    example: 'Otonom araçlar, sesli asistanlar, öneri sistemleri, yüz tanıma.'
  },
  {
    term: 'Alan Turing (1912-1954)',
    definition: 'Modern bilgisayar biliminin kurucusu kabul edilen, 1950\'de "Makineler Düşünebilir mi?" makalesiyle Turing Testi\'ni geliştiren matematikçi.',
    category: 'Yapay Zekâ Tarihi',
    example: 'Yapay zekânın doğuşunun öncüsüdür.'
  },
  {
    term: 'Cahit Arf (1910-1997)',
    definition: '1959 yılında "Makine Düşünebilir mi ve Nasıl Düşünebilir?" adlı ilk Türkçe yapay zekâ makalesini yayımlayan dünyaca ünlü Türk matematik dehası.',
    category: 'Yapay Zekâ Tarihi',
    example: '10 TL banknotumuzun üzerindeki bilim insanımızdır.'
  },
];
