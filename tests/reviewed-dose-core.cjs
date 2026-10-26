'use strict';
const assert=require('node:assert/strict');
const {calculateReviewedDose}=require('../clinical-review/reviewed-dose-core.cjs');
const base={clinicalValidated:true,calculatorEnabled:true,sourceUrl:'https://example.org/fixture',
 reviewedAt:'2026-10-26',indication:'SYNTHETIC TEST ONLY',route:'oral',
 mgPerKg:2,dosesPerDay:2,maxSingleMg:100,maxDailyMg:150};
const product={mg:100,ml:5,route:'oral'};
const calc=(rule,weightKg=10,p=product)=>calculateReviewedDose({rule,weightKg,product:p});
assert.deepEqual(calc({...base,basis:'mg/kg/dose'}),{singleMg:20,dailyMg:40,volumeMl:1,capped:false});
assert.deepEqual(calc({...base,basis:'mg/kg/day'}),{singleMg:10,dailyMg:20,volumeMl:0.5,capped:false});
assert.deepEqual(calc({...base,basis:'mg/kg/dose'},100),{singleMg:75,dailyMg:150,volumeMl:3.75,capped:true});
for(const weight of [0,-1,NaN,Infinity,301])assert.throws(()=>calc({...base,basis:'mg/kg/dose'},weight),/Invalid weight/);
for(const prop of ['clinicalValidated','calculatorEnabled','sourceUrl','reviewedAt','indication']){
 const rule={...base,basis:'mg/kg/dose'};rule[prop]=prop.endsWith('Enabled')||prop==='clinicalValidated'?false:'';
 assert.throws(()=>calc(rule),/not approved/);
}
assert.throws(()=>calc({...base,basis:'mg/kg/dose'},10,{...product,route:'inhalation'}),/Formulation/);
assert.throws(()=>calc({...base,basis:'mg/kg/dose'},10,{...product,ingredients:[{name:'a',mg:100}]}),/Formulation/);
assert.throws(()=>calc({...base,basis:'mg/kg/dose',maxDailyMg:null}),/Maximum doses/);
assert.throws(()=>calc({...base,basis:'mg/kg/dose',dosesPerDay:0}),/Invalid frequency/);
console.log('PASS: synthetic dosing arithmetic, dose caps, product route and fail-closed gates.');
