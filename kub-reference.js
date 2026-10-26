/* Limited, source-transcribed KÜB reference display.
 * This is separate from the research-only candidate registry and existing dose engine.
 * Sources checked 2026-10-26. Clinical independent signoff is still pending.
 */
(function (root) {
  'use strict';
  const SOURCES = Object.freeze({
    sef: 'https://cdn.ilacrehberi.com/sef-250-mg5-ml-oral-suspansiyon-cffb-kub.pdf',
    bactrim: 'https://devacomtr.s3.eu-west-2.amazonaws.com/urunler/kub/bactrim-200-mg-40-mg5-ml-suspansiyon-kub-19-09-2025.pdf'
  });
  const required = ['allergyChecked', 'renalChecked', 'indicationChecked', 'packageChecked'];
  function calculate(input) {
    if (!input || !required.every(k => input[k] === true)) {
      throw new Error('Alerji, böbrek, endikasyon/duyarlılık ve ürün doğrulaması gerekli.');
    }
    const { id, ageMonths, weightKg } = input;
    if (!Number.isInteger(ageMonths) || !Number.isFinite(weightKg) ||
        weightKg < 5 || weightKg > 40 || ageMonths < 0) {
      throw new Error('Yaş (tam ay) ve gerçek ağırlık (5–40 kg) gerekli.');
    }
    if (id === 'sef') {
      // Narrow indication: uncomplicated skin/soft-tissue infection, 1–11 y.
      // SEF KÜB 4.2: pediatric 25–50 mg/kg/day; skin infections divided q12h.
      if (ageMonths < 12 || ageMonths >= 144) {
        throw new Error('Bu kontrollü SEF hesabı yalnızca 1–11 yaş aralığı içindir.');
      }
      const low = weightKg * 25 / 2;
      const high = weightKg * 50 / 2;
      // Original product: 250 mg / 5 mL = 50 mg/mL.
      return Object.freeze({
        id, name: 'SEF 250 mg/5 mL', indication: 'Deri ve yumuşak doku enfeksiyonu',
        dosingBasis: '25–50 mg/kg/gün, iki eşit doz (12 saatte bir)',
        perDoseMg: [low, high], perDoseMl: [low / 50, high / 50],
        dailyMg: [low * 2, high * 2], dosesPerDay: 2,
        note: 'Sadece seçilen SEF 250 mg/5 mL için. Ağır enfeksiyon, otit ve diğer endikasyonlar bu hesapta yer almaz.',
        source: SOURCES.sef
      });
    }
    if (id === 'bactrim') {
      // BACTRIM KÜB 4.2 pediatric age-banded standard schedule, not PJP treatment.
      // Conservative product scope excludes 6 weeks–5 months in this application.
      if (ageMonths < 6 || ageMonths >= 156) {
        throw new Error('Bu kontrollü Bactrim tablosu 6 ay–12 yaş için sınırlıdır.');
      }
      const ml = ageMonths < 72 ? 5 : 10;
      const tmp = ml * 8;  // 40 mg TMP / 5 mL
      const smx = ml * 40; // 200 mg SMX / 5 mL
      return Object.freeze({
        id, name: 'BACTRİM 200/40 mg / 5 mL',
        indication: 'Akut komplike olmayan alt üriner sistem enfeksiyonu; duyarlılık doğrulanmış',
        dosingBasis: 'KÜB 4.2 yaş tablosu, 12 saatte bir (bireyselleştirilmiş mg/kg doz değildir)',
        perDoseMg: [tmp, tmp], perDoseMl: [ml, ml],
        additionalPerDoseMg: Object.freeze({sulfametoksazol: smx}),
        dailyMg: [tmp * 2, tmp * 2], dosesPerDay: 2,
        note: 'Yaş tablosu standart dozdur; yaklaşık 6 mg TMP + 30 mg SMZ/kg/gün ifadesiyle bire bir örtüşmeyebilir. PJP tedavi/profilaksi rejimi değildir. Klinik bireyselleştirme gerekir.',
        source: SOURCES.bactrim
      });
    }
    throw new Error('Bu endikasyon için doğrulanmış ürün kaydı bulunmuyor.');
  }
  const api = Object.freeze({ calculate, sources: SOURCES, verification: 'KÜB metni karşılaştırıldı; bağımsız klinik onay bekliyor' });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PediatricKUBReference = api;
})(typeof window === 'undefined' ? globalThis : window);
