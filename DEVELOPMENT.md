# Pediatrik Doz — Geliştirme Rehberi

## Mimari
- `index.html`: arayüz işaretlemesi ve son servis çalışanı kaydı.
- `styles.css`: açık/koyu tema dahil stiller (önceki inline CSS ile aynı).
- `app.js`: oral, IV/IM, antibiyotik, zehirlenme ve diğer hesaplamalar dahil mevcut uygulama kodu (önceki inline JavaScript ile aynı).
- `sw.js`: çevrimdışı önbellek ve sürüm yönetimi.
- `manifest.json`: PWA yapılandırması.

Bu refaktör ilaç verilerini, doz formüllerini, yuvarlama kurallarını veya klinik eşikleri **değiştirmez**. CSS ve JavaScript metni doğrudan orijinal `index.html` içinden taşınmıştır.

## Katkı kuralları
1. Klinik verileri ve hesaplama mantığını görünüm kodundan aşamalı olarak ayırın; doğrulanmamış doz değişikliği yapmayın.
2. Her ilaç için endikasyon, yaş/kilo sınırı, birim, mg/kg/doz veya mg/kg/gün ayrımı, uygulama yolu, maksimum doz, kaynak bağlantısı ve erişim tarihi belirtin.
3. Her hesaplama değişikliğine sınır değer, maksimum doz, eksik veri, sıfır/negatif kilo ve yuvarlama testleri ekleyin.
4. Özellikle IV/IM ve zehirlenme çıktıları için bağımsız klinik gözden geçirme olmadan yayımlamayın.
5. Geliştirmeleri dalda yapın; test ve incelemeden sonra `main` dalına alın.
6. PWA dosyaları değiştiğinde `sw.js` önbellek sürümünü artırıp çevrimdışı ve güncelleme davranışını test edin.

## Manuel regresyon kontrol listesi
- [ ] Oral ilaç seçimleri, endikasyon ve sıklık seçenekleri aynı
- [ ] Kilo/yaş girişleri, geçersiz veriler, maksimum doz uyarıları aynı
- [ ] IV/IM ampul ve doz hesaplamaları aynı
- [ ] Antibiyotik ve zehirlenme hesaplamaları aynı
- [ ] Diğer hesaplayıcılar ve özet alanları aynı
- [ ] Açık/koyu tema, seçim kalıcılığı ve telefon görünümü aynı
- [ ] Ana ekrana ekleme, çevrimdışı açılış ve PWA güncellemesi çalışıyor

**Durum:** Kodun dosyalara ayrılması yapıldı; klinik doğrulama ve tarayıcı regresyon testleri henüz tamamlanmadı.
