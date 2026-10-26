'use strict';
// Clinical approval isolation: real research candidates must NEVER return a dose.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {calculateReviewedDose}=require('../clinical-review/reviewed-dose-core.cjs');
const {candidates}=JSON.parse(fs.readFileSync('clinical-review/candidates.json','utf8'));
assert.equal(candidates.length,10);
const dummyRule={basis:'mg/kg/day',mgPerKg:1,dosesPerDay:2,maxSingleMg:10,maxDailyMg:20,
  sourceUrl:'https://example.org/synthetic-only',reviewedAt:'2026-10-26',
  indication:'SYNTHETIC TEST - NOT FOR USE',route:'oral'};
let checked=0;
for(const candidate of candidates){
 assert.equal(candidate.clinicalValidated,false,candidate.id+' unexpectedly validated');
 assert.equal(candidate.calculatorEnabled,false,candidate.id+' unexpectedly enabled');
 const suitableProduct=candidate.products.find(p=>Number.isFinite(p.mg)&&Number.isFinite(p.ml)
     && p.route==='oral'&&!p.ingredients) || {mg:100,ml:5,route:'oral'};
 assert.throws(()=>calculateReviewedDose({rule:{...dummyRule,
   clinicalValidated:candidate.clinicalValidated,
   calculatorEnabled:candidate.calculatorEnabled},weightKg:10,product:suitableProduct}),
   /Clinical rule is not approved/,candidate.id+' should fail closed');
 checked++;
}
console.log('PASS: all '+checked+' real drug candidates rejected by research dosing engine.');
