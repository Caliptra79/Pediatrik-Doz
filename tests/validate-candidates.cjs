#!/usr/bin/env node
// Güvenlik kontrolü: yalnızca araştırma kayıtları; klinik doz hesaplaması üretmez.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const file = JSON.parse(fs.readFileSync('clinical-review/candidates.json','utf8'));
const expected = ['sefaleksin','klindamisin','trimetoprim-sulfametoksazol','oseltamivir','budesonid-nebul','levosetirizin','ipratropium-bromur','laktuloz','makrogol-peg','adrenalin-otoenjektor'];
assert.equal(file.schemaVersion,1);
assert.equal(file.usage,'research-only');
assert.ok(Array.isArray(file.candidates));
assert.deepEqual(file.candidates.map(c=>c.id), expected, 'Aday listesi/sırası beklenmedik biçimde değişti');
assert.equal(new Set(file.candidates.map(c=>c.id)).size,file.candidates.length);
const validRoutes=new Set(['oral','inhalation','intramuscular-device']);
for(const c of file.candidates){
  assert.equal(typeof c.name,'string');
  assert.ok(c.name.trim().length>1);
  assert.ok(validRoutes.has(c.route),c.id+': geçersiz uygulama yolu');
  assert.equal(c.clinicalValidated,false,c.id+': klinik onay denetimsiz açılmış');
  assert.equal(c.calculatorEnabled,false,c.id+': doz hesaplayıcı güvenlik kilidi açık');
  assert.equal(c.reviewedAt,null,c.id+': inceleme tarihi manuel doğrulama gerektirir');
  assert.ok(Array.isArray(c.products));
  for(const p of c.products){
    assert.ok(typeof p.name==='string' && p.name.trim());
    assert.ok(typeof p.source==='string' && /^https:\/\//.test(p.source),c.id+': ürün kaynağı eksik');
    assert.equal(p.status,'formulation-confirmed',c.id+': beklenmeyen onay durumu');
    assert.ok(Number.isFinite(p.ml)&&p.ml>0,c.id+': hacim pozitif olmalı');
    if(p.ingredients){
      assert.ok(!('mg' in p),c.id+': kombine ilaç için tek mg alanı yasak');
      assert.equal(p.ingredients.length,2);
      assert.ok(p.ingredients.every(x=>x.name && Number.isFinite(x.mg) && x.mg>0));
    } else assert.ok(Number.isFinite(p.mg) && p.mg>0,c.id+': ürün mg değeri hatalı');
  }
}
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.includes('src="./drugs.js"'));
assert.ok(html.indexOf('src="./drugs.js"')<html.indexOf('src="./app.js"'));
const app=fs.readFileSync('app.js','utf8');
assert.ok(!app.includes('clinical-review/candidates.json'),'Araştırma verileri doz motoruna bağlanmış');
const sw=fs.readFileSync('sw.js','utf8');
assert.ok(sw.includes('"./drugs.js"') && sw.includes('"./app.js"'));
console.log('PASS: 10 aday kilitli; bileşen, kaynak, yol ve mevcut veri yükleme denetimleri.');
