# Klinik hesaplama test senaryoları — taslak (26.10.2026)

**DURUM: KÜB ve uzman incelemesi bekleniyor; üretim hesaplayıcısına uygulanmaz.**

Bu dosya otomatik testlerde kullanılacak beklenen davranışların kapsamını tanımlar. Burada doz reçetesi veya test edilmiş klinik algoritma bulunmaz.

## Sefaleksin
- 0, negatif, sayı olmayan, ölçülmemiş veya aşırı uç kilo: sonuç üretme.
- Endikasyon belirtilmeden doz aralığı gösterme; onaylanmış endikasyonların dozları birbirine karıştırılmasın.
- Tedavi yolu oral ile sınırlı. KÜB'ü doğrulanmayan konsantrasyon seçeneği kapalı.
- Yaş sınırları, renal kısıtlamalar, maksimum tek/günlük doz ve doz aralığı ürün KÜB ve bağımsız pediatri kaynağıyla doğrulanmadan hesaplama devreye alınmaz.
- Sefalosporin alerjisi için belirgin uyarı gerekir.

## TMP/SMX
- TMP miktarı ve SMZ miktarı ayrı mg değerleri olarak tutulmalı; kombine ürün için toplam etkin madde mg üzerinden doz hesaplanmamalı.
- 5 mL = 40 mg TMP + 200 mg SMZ ürünleri için bileşen oranı 1:5 olmalı.
- Endikasyona özgü şema olmadan hesaplama yapılmamalı; PJP profilaksisi/tedavisi ile sıradan bakteriyel enfeksiyon şemaları karıştırılmamalı.
- Böbrek fonksiyon bozukluğu ve KÜB kapsamı dışında kalan yaşlar için otomatik öneri üretilmemeli.
- Sülfonamid alerjisi, yaş sınırı ve ciddi deri reaksiyonları için uyarılar değerlendirilmeli.
- mL dönüşümü yapılırken doza esas etken maddenin TMP olduğu açıkça belirtilmeli.
- Ürün karşılaştırması sadece aynı etken maddeler, farmasötik form, yol ve **iki** konsantrasyon doğrulandığında gösterilmeli; otomatik ikame tavsiyesi oluşturulmamalı.

## Yayın öncesi kapı
- Klinik KÜB doz doğrulama çizelgesi ve bağımsız klinisyen onayı
- Test senaryolarının güvenilir referans çıktılarla sayısal doğrulanması
- Sınır koşulları, maksimum doz, birim dönüşümü ve PWA/telefon regresyon testlerinin geçmesi
- Kaynak URL, yayın tarihi ve erişim tarihinin her hesaplama kuralına bağlanması

Kaynak inceleme notu: [Sefaleksin ve TMP/SMX](../clinical-review/sefaleksin-tmpsmx-source-review-2026-10-26.md)
