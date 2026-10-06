PEDİATRİK DOZ HESAPLAYICI
==========================

Pediatrik Doz Hesaplayıcı, çocuk hastalarda sık kullanılan ilaçların kilo ve yaş bilgilerine göre doz hesaplamalarını kolaylaştırmak amacıyla geliştirilmiş bir web uygulamasıdır.

Uygulama özellikle tıp öğrencileri, intörn doktorlar, hekimler ve sağlık profesyonellerinin pediatrik ilaç dozlarını hızlı bir şekilde kontrol edebilmesine yardımcı olmak üzere tasarlanmıştır.


UYGULAMANIN ÖZELLİKLERİ
-----------------------

• Çocuğun kilosuna göre pediatrik doz hesaplama
• Yaşa göre dozlanan ilaçlarda yaşa göre otomatik hesaplama
• Günlük toplam doz ve tek doz hesaplama
• Şurup/süspansiyon konsantrasyonuna göre mL cinsinden doz hesaplama
• Günde kaç kez kullanılacağının gösterilmesi
• İlaçların minimum yaş ve kilo sınırlarının kontrol edilmesi
• Kilo ve yaş arasında belirgin uyumsuzluk olduğunda uyarı verilmesi
• İlaç ve konsantrasyona göre ürün bilgilerinin gösterilmesi
• Türkiye'deki ürünlerin KÜB/KT bilgileriyle ilişkilendirilmiş kaynaklar
• Acil pediatrik IV/IM/IO ilaçlar için ayrı doz hesaplama bölümü
• Ampul/flakon konsantrasyonuna göre uygulanacak hacmin hesaplanması
• İlaçların hazırlanması, seyreltilmesi ve uygulanma şekliyle ilgili uyarılar
• İnternet bağlantısı olmadığında daha önce yüklenmiş uygulamanın kullanılabilmesi
• iPhone, iPad, Android ve masaüstü cihazlarda PWA olarak kullanılabilmesi
• Uygulamanın telefona uygulama gibi ana ekrana eklenebilmesi


İLAÇLAR
--------

Uygulamada pediatrik kullanımda sık karşılaşılan farklı ilaç grupları bulunmaktadır.

Oral bölümde örnek olarak:

• Parasetamol
• İbuprofen
• Amoksisilin-klavulanat
• Azitromisin
• Klaritromisin
• Sefiksim
• Sefuroksim
• Setirizin
• Desloratadin
• Ondansetron
• Metronidazol

ve diğer pediatrik ilaçlar yer almaktadır.

Acil IV bölümünde ise örnek olarak:

• Adrenalin
• Atropin
• Amiodaron
• Adenozin
• Sodyum bikarbonat
• Dekstroz
• Magnezyum sülfat
• Adrenalin IM
• Deksametazon
• Metilprednizolon
• Midazolam
• Diazepam
• Fenitoin
• Levetirasetam
• IV parasetamol
• Ondansetron IV
• Morfin
• Fentanil
• Ketamin

gibi acil durumda kullanılabilen ilaçlar bulunmaktadır.


KULLANIM
--------

1. Kullanılacak ilaç seçilir.
2. Çocuğun kilosu girilir/seçilir.
3. Gerekiyorsa yaş bilgisi girilir.
4. Kullanılacak şurup, süspansiyon veya ampul konsantrasyonu seçilir.
5. İlaç için uygun doz hesaplanır.
6. Sonuç mg ve uygun olduğunda mL cinsinden gösterilir.
7. Günlük toplam doz, doz sıklığı ve ilgili uyarılar görüntülenir.

Acil IV bölümünde ilaç seçildikten sonra uygun ampul/flakon konsantrasyonu seçilir ve çocuğun kilosuna göre uygulanacak doz ve hacim hesaplanır.


KAYNAKLAR VE DOĞRULAMA
----------------------

Uygulamadaki ilaç ve ürün bilgileri mümkün olduğunca Türkiye'deki KÜB (Kısa Ürün Bilgisi) ve KT (Kullanma Talimatı) belgeleriyle ilişkilendirilmiştir.

Bazı pediatrik dozlar için uluslararası pediatrik kılavuzlar, protokoller, SmPC belgeleri veya literatür kaynakları kullanılmıştır.

Uygulama içerisindeki her ilacın sonuç ekranında mümkün olduğunda ilgili kaynak bağlantısı gösterilmektedir.

Doz bilgileri zaman içerisinde değişebileceğinden, uygulamanın güncel kaynaklarla düzenli olarak kontrol edilmesi gerekir.


ÖNEMLİ TIBBİ UYARI
------------------

Bu uygulama bir eğitim ve doz kontrol aracıdır.

Uygulama tarafından hesaplanan sonuçlar tek başına tıbbi karar vermek amacıyla kullanılmamalıdır.

Pediatrik ilaç dozları; yaş, kilo, endikasyon, böbrek ve karaciğer fonksiyonları, eşlik eden hastalıklar, kullanılan diğer ilaçlar, maksimum günlük dozlar ve ilgili ürünün KÜB/KT bilgileri gibi birçok faktöre bağlı olabilir.

Özellikle acil IV/IM/IO ilaçlarda ampul konsantrasyonu, seyreltme oranı, uygulama yolu, uygulama hızı ve maksimum doz uygulama öncesinde mutlaka kontrol edilmelidir.

Bir ilacın uygulanmasından önce ilgili güncel KÜB/KT, hastane protokolü veya yetkili pediatrik kaynak kontrol edilmelidir.

Son klinik karar sağlık profesyoneline aittir.


PWA ÖZELLİĞİ
------------

Uygulama Progressive Web App (PWA) olarak hazırlanmıştır.

PWA sayesinde uygulama:

• Safari veya Chrome üzerinden açılabilir.
• Telefonun ana ekranına eklenebilir.
• Uygulama benzeri bağımsız pencerede çalışabilir.
• Daha önce önbelleğe alınmış içerikleri internet bağlantısı olmadan açabilir.
• GitHub Pages gibi ücretsiz statik hosting servisleri üzerinden yayınlanabilir.

Uygulama güncellendiğinde Service Worker yeni sürümü algılayarak önbelleği günceller.


GELİŞTİRME
----------

Bu proje geliştirmeye açıktır.

İlerleyen sürümlerde:

• Daha fazla ilaç eklenmesi
• Daha fazla pediatrik acil ilaç protokolü
• Böbrek/karaciğer yetmezliği için doz uyarıları
• Yaşa özel maksimum doz kontrolleri
• Endikasyona göre daha ayrıntılı doz seçenekleri
• Daha kapsamlı kaynak sistemi
• Kullanıcı arayüzü geliştirmeleri
• Yeni ilaç konsantrasyonlarının eklenmesi

gibi özellikler eklenebilir.


SÜRÜM
-----

Pediatrik Doz Hesaplayıcı
PWA sürümü

Bu uygulama eğitim ve klinik karar destek amacıyla geliştirilmiştir. Güncel tıbbi kaynakların yerine geçmez.
