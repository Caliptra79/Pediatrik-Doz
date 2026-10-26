#!/usr/bin/env node
'use strict';
// Structural regression only. Does not validate clinical dose correctness.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const expected=[
 'parasetamol','ibuprofen','amoksisilin','azitromisin','klaritromisin',
 'sefiksim','sefuroksim','setirizin','desloratadin','ondansetron',
 'penisilinv','nistatin','flukonazol','montelukast','salbutamol',
 'prednizolon','dvit','demir','metronidazol'
];
const source=fs.readFileSync('drugs.js','utf8');
const loaded=vm.runInNewContext(source+'\n;ILACLAR;', Object.create(null),{timeout:2000});
assert.deepEqual(Object.keys(loaded).sort(),expected.slice().sort(),
 'The existing 19 active drug keys must not change without review');
for (const [id,drug] of Object.entries(loaded)) {
 assert.equal(typeof drug.ad,'string',id+': no drug display name');
 assert.ok(drug.ad.length>0,id+': empty drug display name');
 assert.ok(Array.isArray(drug.konc)&&drug.konc.length>0,id+': missing formulation');
 for(const formulation of drug.konc){
   assert.ok(Number.isFinite(formulation.mg)&&formulation.mg>0,id+': invalid concentration mg');
   assert.ok(typeof formulation.urun==='string'&&formulation.urun.trim(),id+': missing product name');
 }
}
const researched=JSON.parse(fs.readFileSync('clinical-review/candidates.json','utf8'));
assert.ok(researched.candidates.every(c=>!Object.prototype.hasOwnProperty.call(loaded,c.id)),
 'Research-only candidate accidentally promoted to the active oral registry');
const html=fs.readFileSync('index.html','utf8');
assert.ok(!html.includes('clinical-review/candidates.json'),
 'Research-only candidates unexpectedly loaded by the browser');
const app=fs.readFileSync('app.js','utf8');
assert.ok(!app.includes('clinical-review/candidates.json'),
 'Research-only candidates unexpectedly loaded by the dose engine');
console.log('PASS: 19 existing drug identities and formulations retained; candidates remain isolated.');
