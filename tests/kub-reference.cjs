'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const api = require('../kub-reference.js');
const approved = {
  allergyChecked:true, renalChecked:true, indicationChecked:true, packageChecked:true
};
const calc = (id, ageMonths, weightKg, o={}) =>
  api.calculate({id,ageMonths,weightKg,...approved,...o});
const cef = calc('sef',36,20);
assert.deepEqual(cef.perDoseMg,[250,500]);
assert.deepEqual(cef.perDoseMl,[5,10]);
assert.deepEqual(cef.dailyMg,[500,1000]);
assert.equal(cef.dosesPerDay,2);
assert.equal(calc('sef',12,5).perDoseMl[0],1.25);
for(const age of [0,11,144,180]) assert.throws(()=>calc('sef',age,15),/1–11 yaş/);
const bc1=calc('bactrim',6,10);
assert.deepEqual(bc1.perDoseMl,[5,5]);
assert.deepEqual(bc1.perDoseMg,[40,40]);
assert.deepEqual(bc1.dailyMg,[80,80]);
assert.equal(bc1.additionalPerDoseMg.sulfametoksazol,200);
const bc2=calc('bactrim',72,25);
assert.deepEqual(bc2.perDoseMl,[10,10]);
assert.deepEqual(bc2.perDoseMg,[80,80]);
assert.equal(bc2.additionalPerDoseMg.sulfametoksazol,400);
for(const age of [0,5,156,180]) assert.throws(()=>calc('bactrim',age,15),/6 ay–12 yaş/);
for(const weight of [0,4.9,40.1,-2,NaN,Infinity]) {
  assert.throws(()=>calc('sef',36,weight),/gerçek ağırlık/);
  assert.throws(()=>calc('bactrim',36,weight),/gerçek ağırlık/);
}
assert.throws(()=>calc('sef',36.5,20),/Yaş/);
for(const key of Object.keys(approved)) {
  assert.throws(()=>calc('sef',36,20,{[key]:false}),/doğrulaması gerekli/);
  assert.throws(()=>calc('bactrim',36,20,{[key]:false}),/doğrulaması gerekli/);
}
assert.throws(()=>calc('unapproved',36,20),/doğrulanmış ürün kaydı/);
const research=JSON.parse(fs.readFileSync('clinical-review/candidates.json','utf8'));
assert.ok(research.candidates.every(x=>x.calculatorEnabled===false && x.clinicalValidated===false));
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.indexOf('src="./kub-reference.js"') < html.indexOf('src="./kub-ui.js"'));
assert.ok(html.includes('id="kubPanel"') && html.includes('id="kubResult"'));
const cache=fs.readFileSync('sw.js','utf8');
assert.ok(cache.includes('"./kub-reference.js"') && cache.includes('"./kub-ui.js"'));
console.log('PASS: narrow KÜB reference arithmetic, 6/12-year boundaries, fail-closed confirmations, PWA assets.');
