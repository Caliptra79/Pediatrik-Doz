# SEF ve BACTRİM — dar kapsamlı KÜB hesapları (26.10.2026)

**Durum:** Ürün KÜB bilgileri kontrol edildi. Bağımsız pediatri/klinik eczacılık uzmanı incelemesi ve gerçek cihaz üzerindeki manuel regresyon testi henüz tamamlanmadı. Bu sürüm hekim için kaynak karşılığı gösterir, tedavi seçimi yapmaz.

## SEF 250 mg/5 mL — sefaleksin
Kaynak: https://cdn.ilacrehberi.com/sef-250-mg5-ml-oral-suspansiyon-cffb-kub.pdf
Üretici KT: https://www.eczacibasiilac.com.tr/EIP/media/EIP_Media/PDF/e-KT/Sef250mgSusp-kt.pdf

KÜB 4.2: Çocuklarda 25–50 mg/kg/gün eşit bölünmüş doz; cilt ve yumuşak doku enfeksiyonlarında günlük toplam 12 saat ara ile bölünür. Derişim 250 mg/5 mL sefaleksin baz eşdeğeri.

**Uygulamanın sınırlı kapsamı:** Oral, 1–11 yaş, 5–40 kg, yalnızca deri ve yumuşak doku endikasyonu; olağan 25–50 mg/kg/gün iki doza bölünür. Otitis media, diğer endikasyonlar ve ağır enfeksiyon şemaları bu bölümde yok. Böbrek fonksiyon bozukluğu / kontrendikasyon varsa sonuç kapalı tutulur. Klinik formül doğrulama bağımsız uzman imzası yerine geçmez.

## BACTRİM 200 mg SMZ + 40 mg TMP / 5 mL
Güncel üretici KÜB: https://devacomtr.s3.eu-west-2.amazonaws.com/urunler/kub/bactrim-200-mg-40-mg5-ml-suspansiyon-kub-19-09-2025.pdf

KÜB 4.1/4.2: Yalnızca koşulları karşılayan duyarlı akut enfeksiyonlarda; standart pediatrik yaş tablosu: 6 ay–5 yaş 5 mL / 12 saat, 6–12 yaş 10 mL / 12 saat. Standart doz yaklaşık 6 mg/kg/gün TMP + 30 mg/kg/gün SMZ olarak da tanımlanır. Yaş tablosu ile mg/kg yaklaşık değeri her kiloda bire bir örtüşmeyebilir.

**Uygulamanın sınırlı kapsamı:** Oral, 6 ay–12 yaş, 5–40 kg, duyarlılık değerlendirmesi yapılmış akut komplike olmayan alt idrar yolu enfeksiyonu. Yalnızca KÜB yaş tablosu gösterilir; kilo başına otomatik bireyselleştirilmiş reçete oluşturulmaz. PJP tedavisi/profilaksisi, toksoplazmozis, nokardiyozis ve diğer tablolar kapsam dışıdır. KÜB'e göre 12 yaş ve altı böbrek yetmezliği olan çocuklarda doz bilgisi bulunmadığından kullanıcı böbrek durumu onayı olmadan hesap yapılamaz. Sulfonamid/TMP aşırı duyarlılığı, ciddi karaciğer bozukluğu, G6PD ve etkileşimler ayrıca klinik olarak değerlendirilmelidir.

## Güvenlik ve yayınlama
- Etken madde, ticari preparat, uygulama yolu ve konsantrasyon ürün özelinde sabit tutulur. Muadil otomatik kullanılmaz.
- Hasta kilosu *tartılmış* olmalıdır. Yaş, kilo, klinik endikasyon/duyarlılık, alerji, böbrek fonksiyonu, diğer riskler ve ürün onayı zorunludur.
- İlaç, kilo veya yaş değiştiğinde tüm kullanıcı doğrulamaları sıfırlanır.
- Hatalı veya eksik bilgilerde hesap fail-closed davranır.
- Tüm mevcut 19 oral hesap ve araştırma adayı 10 ilaç kayıtları korunur; genel araştırma `calculatorEnabled:false` kilitleri değiştirilmez.
- GitHub CI ile otomatik aritmetik ve yaş sınırı testleri; ayrıca telefon ekranında tema/sekme/PWA testleri gerekir.
- **Bağımsız klinik uzman incelemesi hâlâ yapılmadığından bu bir ürün KÜB referansıdır, klinik doğruluk sertifikası değildir.**
